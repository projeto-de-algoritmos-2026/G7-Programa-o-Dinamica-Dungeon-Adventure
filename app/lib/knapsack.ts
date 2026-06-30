import { getRelicsSortedByRatio } from "./relics";
import {
  KnapsackResponse,
  RelicAllocation,
  KnapsackStep,
} from "./types";

export const BACKPACK_CAPACITY = 74;

export function solveKnapsack(): KnapsackResponse {
  const allRelics = getRelicsSortedByRatio();

  // Achata as reliquias baseadas na quantidade para o DP 0/1 Knapsack
  const flatItems: { relic: any; index: number }[] = [];
  allRelics.forEach((relic) => {
    for (let i = 0; i < relic.quantity; i++) {
      flatItems.push({ relic, index: flatItems.length });
    }
  });

  const n = flatItems.length;
  const W = BACKPACK_CAPACITY;
  // Tabela DP: dp[i][w] armazena o valor máximo com i itens e capacidade w
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const item = flatItems[i - 1].relic;
    for (let w = 0; w <= W; w++) {
      if (item.weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - item.weight] + item.value);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Backtracking para descobrir quais itens foram selecionados
  let w = W;
  const selectedFlatIndices = new Set<number>();
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedFlatIndices.add(i - 1);
      w -= flatItems[i - 1].relic.weight;
    }
  }

  const selectedRelics: RelicAllocation[] = [];
  const skippedRelics: RelicAllocation[] = [];
  const steps: KnapsackStep[] = [];
  let stepOrder = 1;

  let remainingCapacity = BACKPACK_CAPACITY;
  let totalValue = 0;
  let totalWeight = 0;

  // Analisa cada tipo de relíquia e constrói a resposta mostrando as escolhas do DP
  for (const relic of allRelics) {
    // Conta quantas dessa reliquia foram selecionadas na solucao otima do DP
    const indicesForRelic = flatItems.filter(f => f.relic.id === relic.id).map(f => f.index);
    let quantityTaken = 0;
    for (const idx of indicesForRelic) {
      if (selectedFlatIndices.has(idx)) {
        quantityTaken++;
      }
    }

    const weightTaken = quantityTaken * relic.weight;
    const valueTaken = quantityTaken * relic.value;

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

    if (quantityTaken > 0) {
      selectedRelics.push(allocation);
      remainingCapacity -= weightTaken;
      totalValue += valueTaken;
      totalWeight += weightTaken;

      steps.push({
        order: stepOrder++,
        relicId: relic.id,
        name: relic.name,
        ratio: relic.ratio,
        quantityTaken,
        fractionTaken: 0,
        totalValueAdded: valueTaken,
        remainingCapacity,
        description: `O algoritmo DP determinou levar ${quantityTaken}x unidade(s) inteira(s) (${weightTaken}kg) valendo ${valueTaken} gp. Resta ${remainingCapacity}kg na mochila.`,
      });
    }

    const quantitySkipped = relic.quantity - quantityTaken;
    if (quantitySkipped > 0) {
      if (quantityTaken === 0) {
        skippedRelics.push(allocation);
      }
      
      const skippedWeight = quantitySkipped * relic.weight;
      steps.push({
        order: stepOrder++,
        relicId: relic.id,
        name: relic.name,
        ratio: relic.ratio,
        quantityTaken: 0,
        fractionTaken: 0,
        totalValueAdded: 0,
        remainingCapacity,
        description: `O algoritmo DP decidiu deixar ${quantitySkipped}x unidade(s) (${skippedWeight}kg) para trás para otimizar o valor total na capacidade restante.`,
      });
    }
  }

  return {
    capacity: BACKPACK_CAPACITY,
    selectedRelics,
    skippedRelics,
    totalValue,
    totalWeight,
    steps,
  };
}
