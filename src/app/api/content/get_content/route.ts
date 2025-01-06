"use server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function POST(request: Request, res: any) {
  const session = await auth();
  const sql = neon(`${process.env.DATABASE_URL}`);

  const { url } = await request.json();

  const result = await sql("SELECT * FROM blogss WHERE url = $1", [url]);

  return NextResponse.json({ data: result[0], message: "success" });
}
// export default async function get_article(formData: any) {
//   // Connect to the Neon database
//   const sql = neon(`${process.env.DATABASE_URL}`);
//   const url = formData;
//   console.log("backend", url);
//   console.log("SELECT * FROM blogss WHERE url = '$1'", [url])
//   // Insert the comment from the form into the Postgres database
//   const result = await sql("SELECT * FROM blogss WHERE url = $1", [url]);
//   return result;
// }
