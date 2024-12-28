"use server";
import { neon } from "@neondatabase/serverless";

export default async function get_article(formData: any) {
  // Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);
  const id = formData;
  console.log("backend", id);
  // Insert the comment from the form into the Postgres database
  const result = await sql("SELECT * FROM comments WHERE blog_id = $1", [id]);
  return result;
}
