'use server';
import { neon } from '@neondatabase/serverless';

export default async function get_article(formData: any) {
    
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const url = formData;
    console.log("backend",url)
    // Insert the comment from the form into the Postgres database
    const result = await sql("SELECT * FROM blogs WHERE url = $1", [url]);
return result
  }