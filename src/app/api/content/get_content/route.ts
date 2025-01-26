"use server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@/lib/utilis/auth";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const session = await auth();
  const sql = neon(`${process.env.DATABASE_URL}`);

  const { url } = await request.json();

  const result = await sql("SELECT * FROM blogss WHERE url = $1", [url]);

  return NextResponse.json({ data: result[0], message: "success" });
}

