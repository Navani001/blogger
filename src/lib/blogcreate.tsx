'use server';
import { neon } from '@neondatabase/serverless';

export default async function create_database(formData: any) {
    
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData;
    // Insert the comment from the form into the Postgres database
    await sql('INSERT INTO blogs (username,article,url) VALUES ($1,$2,$3)', ["raj",comment,"merosa"]);
  }