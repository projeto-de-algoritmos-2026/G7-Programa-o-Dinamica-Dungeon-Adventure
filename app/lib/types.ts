export interface Relic {
  id: string;
  name: string;
  weight: number;
  value: number;
  quantity: number;
  ratio: number;
  icon: string;
}

export interface RelicAllocation {
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

export interface KnapsackStep {
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

export interface KnapsackResponse {
  capacity: number;
  selectedRelics: RelicAllocation[];
  skippedRelics: RelicAllocation[];
  totalValue: number;
  totalWeight: number;
  steps: KnapsackStep[];
}
