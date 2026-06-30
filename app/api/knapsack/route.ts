import { NextResponse } from "next/server";
import { solveKnapsack } from "../../lib/knapsack";

export async function POST() {
  const result = solveKnapsack();
  return NextResponse.json(result);
}
