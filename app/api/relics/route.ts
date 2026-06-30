import { NextResponse } from "next/server";
import { getAllRelics } from "../../lib/relics";

export async function GET() {
  return NextResponse.json({ relics: getAllRelics() });
}
