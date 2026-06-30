import { Relic } from "./types";

// cada reliquia reflete exatamente os dados apresentados na tela de itens (components/items.tsx)
export const RELICS: Record<string, Relic> = {
  excalibur: {
    id: "excalibur",
    name: "Excalibur",
    weight: 15,
    value: 1500,
    quantity: 1,
    ratio: Math.round(1500 / 15), // 100 gp/kg
    icon: "1-Excalibur.png",
  },
  grimorio_vazio: {
    id: "grimorio_vazio",
    name: "Grimorio do Vazio",
    weight: 12,
    value: 980,
    quantity: 2,
    ratio: Math.round(980 / 12), // 82 gp/kg
    icon: "2-Grimorio-do-Vazio.png",
  },
  lanterna_eltar: {
    id: "lanterna_eltar",
    name: "Lanterna de Eltar",
    weight: 12,
    value: 640,
    quantity: 4,
    ratio: Math.round(640 / 12), // 53 gp/kg
    icon: "3-Lanterna-de-Eltar.png",
  },
  coroa_rei: {
    id: "coroa_rei",
    name: "Coroa do Rei Afogado",
    weight: 8,
    value: 1200,
    quantity: 1,
    ratio: Math.round(1200 / 8), // 150 gp/kg
    icon: "4-Coroa-do-Rei-Afogado.png",
  },
  adaga_eclipse: {
    id: "adaga_eclipse",
    name: "Adaga Eclipse",
    weight: 6,
    value: 750,
    quantity: 3,
    ratio: Math.round(750 / 6), // 125 gp/kg
    icon: "5-Adaga-Eclipse.png",
  },
  relogio_chronos: {
    id: "relogio_chronos",
    name: "Relogio de Chronos",
    weight: 5,
    value: 2000,
    quantity: 1,
    ratio: Math.round(2000 / 5), // 400 gp/kg
    icon: "6-Relogio-de-Chronos.png",
  },
  mascara_cervo: {
    id: "mascara_cervo",
    name: "Mascara do Deus Cervo",
    weight: 8,
    value: 890,
    quantity: 2,
    ratio: Math.round(890 / 8), // 111 gp/kg
    icon: "7-Mascara-do-Deus-Cervo.png",
  },
  manopla_tita: {
    id: "manopla_tita",
    name: "Manopla do Tita",
    weight: 18,
    value: 1750,
    quantity: 1,
    ratio: Math.round(1750 / 18), // 97 gp/kg
    icon: "8-Manopla-do-Tita.png",
  },
  coracao_dragao: {
    id: "coracao_dragao",
    name: "Coracao do Dragao Rubro",
    weight: 12,
    value: 2400,
    quantity: 1,
    ratio: Math.round(2400 / 12), // 200 gp/kg
    icon: "9-Coracao-do-Dragao-Rubro.png",
  },
};

export function getRelicsSortedByRatio(): Relic[] {
  return Object.values(RELICS).sort((a, b) => b.ratio - a.ratio);
}

export function getAllRelics(): Relic[] {
  return Object.values(RELICS);
}
