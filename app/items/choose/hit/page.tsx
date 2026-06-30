'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

interface RelicAllocation {
  relicId: string;
  name: string;
  icon: string;
  unitWeight: number;
  unitValue: number;
  ratio: number;
  quantityAvailable: number;
  quantityTaken: number;
  fractionTaken: number;
  totalWeight: number;
  totalValue: number;
}

interface KnapsackStep {
  order: number;
  relicId: string;
  name: string;
  ratio: number;
  unitWeight: number;
  unitValue: number;
  quantityTaken: number;
  fractionTaken: number;
  totalValueAdded: number;
  remainingCapacity: number;
  description: string;
}

interface KnapsackResponse {
  capacity: number;
  selectedRelics: RelicAllocation[];
  skippedRelics: RelicAllocation[];
  totalValue: number;
  totalWeight: number;
  steps: KnapsackStep[];
}

function formatQty(taken: number): string {
  if (taken > 0) return `${taken}x`;
  return "0";
}

export default function Page() {
  const [result, setResult] = useState<KnapsackResponse | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [fortunaAcumulada, setFortunaAcumulada] = useState(0);
  const [pesoAcumulado, setPesoAcumulado] = useState(0);
  const [itensDaMochila, setItensDaMochila] = useState<RelicAllocation[]>([]);

  useEffect(() => {
    fetch("/api/knapsack", { method: "POST" })
      .then((res) => res.json())
      .then((data: KnapsackResponse) => {
        setResult(data);
        setLoading(false);
      });
  }, []);

  function avancarPasso() {
    if (!result) return;

    const step = result.steps[currentStep];

    // item foi selecionado
    if (step.quantityTaken > 0) {
      const relic = result.selectedRelics.find((r) => r.relicId === step.relicId);
      if (relic) {
        setItensDaMochila((prev) => [...prev, relic]);
        setFortunaAcumulada((prev) => Math.round((prev + step.totalValueAdded) * 100) / 100);
        setPesoAcumulado((prev) => Math.round((prev + relic.totalWeight) * 100) / 100);
      }
    }

    setCurrentStep(currentStep + 1);
  }

  const terminouSteps = result ? currentStep >= result.steps.length : false;
  const stepAtual = result ? result.steps[currentStep] : null;
  const porcentagemCapacidade = result ? Math.min((pesoAcumulado / result.capacity) * 100, 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center z-10 relative">
        <div className="relative">
          <img src="/items/bg.png" className="absolute inset-0 w-full h-full object-cover z-0" />
          <p className="text-black text-[10px] relative z-10 p-8">Carregando o algoritmo...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start z-10 relative py-8 gap-6 overflow-auto">

      <div className="relative">
        <img src="/items/bg.png" className="absolute inset-0 w-full h-full object-cover z-0" />
        <h1 className="text-black text-[14px] text-center relative z-10 px-12 py-4">
          ✦ MOCHILA DA FORTUNA ✦
        </h1>
      </div>

      <div className="relative w-full max-w-[600px]">
        <img src="/items/bg.png" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="relative z-10 flex flex-col items-center gap-3 p-6">
          <div className="w-full">
            <p className="text-black text-[9px] mb-1">
              ⚖ CAPACIDADE: {pesoAcumulado} / {result.capacity} kg
            </p>
            <div className="w-full h-4 bg-black/30 border-2 border-yellow-900 rounded-sm">
              <div
                className="h-full bg-yellow-500 transition-all duration-500 rounded-sm"
                style={{ width: `${porcentagemCapacidade}%` }}
              />
            </div>
          </div>
          <p className="text-black text-[12px]">
            🪙 FORTUNA: {fortunaAcumulada} gp
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-[600px]">
        <img src="/items/bg.png" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="relative z-10 p-6 min-h-[140px]">
          <p className="text-black text-[8px] mb-3">▶ ITENS NA MOCHILA:</p>
          {itensDaMochila.length === 0 ? (
            <p className="text-gray-700 text-[8px]">[ vazia ]</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {itensDaMochila.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <img
                    src={`/items/${item.icon}`}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                  <span className="text-black text-[6px] text-center w-[64px] leading-tight">
                    {formatQty(item.quantityTaken)} {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!terminouSteps && (
        <div className="relative w-full max-w-[600px]">
          <img src="/items/bg.png" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="relative z-10 p-6">
            {!started ? (
              <p className="text-gray-700 text-[8px] text-center">
                Pressione INICIAR para o algoritmo de programação dinâmica começar a analisar e selecionar os itens.
              </p>
            ) : stepAtual ? (
              <>
                <p className="text-black text-[8px] mb-2">
                  PASSO {stepAtual.order} / {result.steps.length}
                </p>
                <p className="text-black text-[8px] mb-2">
                  Item: <span className="text-yellow-800">{stepAtual.name}</span>
                  {" (peso: "}{stepAtual.unitWeight}{" kg, valor: "}{stepAtual.unitValue}{" gp)"}
                </p>
                <p className="text-gray-800 text-[7px] leading-relaxed">
                  {stepAtual.description}
                </p>
                {stepAtual.quantityTaken > 0 ? (
                  <p className="text-green-800 text-[7px] mt-2">
                    ✔ ADICIONADO À MOCHILA
                  </p>
                ) : (
                  <p className="text-red-800 text-[7px] mt-2">✘ PULADO — não coube</p>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}

      {terminouSteps && (
        <div className="w-full max-w-[600px] flex flex-col items-center gap-6">
          <img
            src="/items/mochila final - Copia.png"
            alt="Mochila da Fortuna"
            width={400}
            height={400}
            className="object-contain"
          />
          <div className="relative w-full">
            <img src="/items/bg.png" className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="relative z-10 p-6 flex flex-col gap-3">
              <p className="text-black text-[11px] text-center">✦ ALGORITMO CONCLUÍDO ✦</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-black text-[8px]">Peso total usado:</p>
                  <p className="text-black text-[10px]">{result.totalWeight} kg / {result.capacity} kg</p>
                </div>
                <div>
                  <p className="text-black text-[8px]">Fortuna total:</p>
                  <p className="text-green-900 text-[10px]">{result.totalValue} gp</p>
                </div>
              </div>
              <div>
                <p className="text-black text-[8px] mb-1">Itens selecionados:</p>
                <ul className="flex flex-col gap-1">
                  {result.selectedRelics.map((r) => (
                    <li key={r.relicId} className="text-black text-[7px]">
                      ✔ {formatQty(r.quantityTaken)} {r.name} — {r.totalWeight}kg / {r.totalValue}gp
                    </li>
                  ))}
                </ul>
              </div>
              {result.skippedRelics.length > 0 && (
                <div>
                  <p className="text-red-900 text-[8px] mb-1">Itens pulados:</p>
                  <ul className="flex flex-col gap-1">
                    {result.skippedRelics.map((r) => (
                      <li key={r.relicId} className="text-gray-600 text-[7px]">
                        ✘ {r.name} — {r.unitWeight}kg (não coube)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link href="/" className="flex justify-center mt-2">
                <img
                  src="/next-button.png"
                  alt="Recomeçar"
                  width={80}
                  height={80}
                  className="cursor-pointer transition hover:scale-110"
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      {!terminouSteps && (
        <div className="flex gap-4">
          {!started ? (
            <button
              onClick={() => setStarted(true)}
              className="bg-yellow-600 text-black text-[8px] px-6 py-3 border-2 border-yellow-300 cursor-pointer transition hover:scale-105 hover:bg-yellow-400"
            >
              INICIAR
            </button>
          ) : (
            <button
              onClick={avancarPasso}
              className="bg-yellow-600 text-black text-[8px] px-6 py-3 border-2 border-yellow-300 cursor-pointer transition hover:scale-105 hover:bg-yellow-400"
            >
              PRÓXIMO PASSO ▶
            </button>
          )}
        </div>
      )}

    </div>
  );
}
