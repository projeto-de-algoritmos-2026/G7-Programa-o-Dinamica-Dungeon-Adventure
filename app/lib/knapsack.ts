import { getRelicsSortedByRatio } from "./relics";
import {
  KnapsackResponse,
  RelicAllocation,
  KnapsackStep,
  Relic,
} from "./types";

export const BACKPACK_CAPACITY = 74;

interface FlatItem {
  relic: Relic;
  flatIndex: number;
}

export function solveKnapsack(): KnapsackResponse {
  const allRelics = getRelicsSortedByRatio();

  // Achata as relíquias por unidade — cada unidade é um item 0/1 independente
  const flatItems: FlatItem[] = [];
  allRelics.forEach((relic) => {
    for (let i = 0; i < relic.quantity; i++) {
      flatItems.push({ relic, flatIndex: flatItems.length });
    }
  });

  const n = flatItems.length;
  const W = BACKPACK_CAPACITY;

  // === Programação Dinâmica Top-Down (recursiva com memoização) ===
  // rec(i, cap) = valor máximo possível considerando os itens [i..n-1] com capacidade cap
  const memo = new Map<string, number>();

  function rec(i: number, cap: number): number {
    // Caso base: sem itens ou sem capacidade
    if (i >= n || cap <= 0) return 0;

    const key = `${i},${cap}`;
    if (memo.has(key)) return memo.get(key)!; // subproblema já resolvido

    const { relic } = flatItems[i];

    // Opção 1: excluir o item i → problema reduz para [i+1..n-1] com mesma capacidade
    const valueWithout = rec(i + 1, cap);

    // Opção 2: incluir o item i (se caber) → problema reduz para [i+1..n-1] com cap - peso
    const valueWith =
      relic.weight <= cap ? relic.value + rec(i + 1, cap - relic.weight) : 0;

    const best = Math.max(valueWith, valueWithout);
    memo.set(key, best);
    return best;
  }

  // Resolve o problema completo, preenchendo a tabela memo
  rec(0, W);

  // === Backtracking: reconstrói quais itens foram selecionados ===
  let backtrackCap = W;
  const selectedFlatIndices = new Set<number>();

  for (let i = 0; i < n; i++) {
    const { relic } = flatItems[i];
    const valueWith =
      relic.weight <= backtrackCap
        ? relic.value + rec(i + 1, backtrackCap - relic.weight)
        : 0;
    const valueWithout = rec(i + 1, backtrackCap);

    if (valueWith > valueWithout && relic.weight <= backtrackCap) {
      selectedFlatIndices.add(i);
      backtrackCap -= relic.weight;
    }
  }

  // === Agrega resultados por tipo de relíquia e gera os passos ===
  const selectedRelics: RelicAllocation[] = [];
  const skippedRelics: RelicAllocation[] = [];
  const steps: KnapsackStep[] = [];
  let stepOrder = 1;
  let remainingCapacity = W;
  let totalValue = 0;
  let totalWeight = 0;

  // Rastreia a capacidade antes de cada relíquia para os passos de avaliação
  let evalCap = W;

  for (const relic of allRelics) {
    const indices = flatItems
      .filter((f) => f.relic.id === relic.id)
      .map((f) => f.flatIndex);

    const quantityTaken = indices.filter((i) => selectedFlatIndices.has(i)).length;
    const weightTaken = quantityTaken * relic.weight;
    const valueTaken = quantityTaken * relic.value;

    // Calcula os valores recursivos para mostrar no passo de avaliação
    // Usa o índice do primeiro flat item deste tipo e a capacidade antes de decidir
    const firstFlatIdx = indices[0];
    // Valor obtido se incluirmos a 1ª unidade deste tipo (e resolvermos o resto de forma ótima)
    const valueIncluding =
      relic.weight <= evalCap
        ? relic.value + rec(firstFlatIdx + 1, evalCap - relic.weight)
        : 0;
    // Valor obtido se excluirmos todas as unidades deste tipo
    const valueExcluding = rec(firstFlatIdx + 1, evalCap);

    const allocation: RelicAllocation = {
      relicId: relic.id,
      name: relic.name,
      icon: relic.icon,
      unitWeight: relic.weight,
      unitValue: relic.value,
      ratio: relic.ratio,
      quantityAvailable: relic.quantity,
      quantityTaken,
      fractionTaken: 0,
      totalWeight: weightTaken,
      totalValue: valueTaken,
    };

    // ── Passo 1: Avaliação recursiva ──────────────────────────────────────────
    // A recursão testa as combinações incluindo e excluindo este item
    steps.push({
      order: stepOrder++,
      relicId: relic.id,
      name: relic.name,
      ratio: relic.ratio,
      unitWeight: relic.weight,
      unitValue: relic.value,
      quantityTaken: 0,
      fractionTaken: 0,
      totalValueAdded: 0,
      remainingCapacity: evalCap,
      isEvaluating: true,
      valueWith: valueIncluding,
      valueWithout: valueExcluding,
      description: `🔍 Recursão avalia "${relic.name}" (${relic.weight}kg, ${relic.value}gp/un) — ${relic.quantity} unidade(s). Melhor incluindo: ${valueIncluding}gp | Melhor excluindo: ${valueExcluding}gp.`,
    });

    // ── Passo 2: Decisão ──────────────────────────────────────────────────────
    if (quantityTaken > 0) {
      selectedRelics.push(allocation);
      remainingCapacity -= weightTaken;
      totalValue += valueTaken;
      totalWeight += weightTaken;
      evalCap -= weightTaken;

      steps.push({
        order: stepOrder++,
        relicId: relic.id,
        name: relic.name,
        ratio: relic.ratio,
        unitWeight: relic.weight,
        unitValue: relic.value,
        quantityTaken,
        fractionTaken: 0,
        totalValueAdded: valueTaken,
        remainingCapacity,
        isEvaluating: false,
        description: `✓ Decisão: incluir ${quantityTaken}x "${relic.name}" maximiza o valor total. Ganho: +${valueTaken}gp. Capacidade restante: ${remainingCapacity}kg.`,
      });
    } else {
      skippedRelics.push(allocation);

      steps.push({
        order: stepOrder++,
        relicId: relic.id,
        name: relic.name,
        ratio: relic.ratio,
        unitWeight: relic.weight,
        unitValue: relic.value,
        quantityTaken: 0,
        fractionTaken: 0,
        totalValueAdded: 0,
        remainingCapacity,
        isEvaluating: false,
        description: `✗ Decisão: excluir "${relic.name}". A recursão determinou que incluí-lo não maximiza o valor total com ${evalCap}kg disponíveis.`,
      });
    }
  }

  return {
    capacity: W,
    selectedRelics,
    skippedRelics,
    totalValue,
    totalWeight,
    steps,
  };
}
