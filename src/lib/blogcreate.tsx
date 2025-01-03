'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from './auth';
import { google } from "@ai-sdk/google";
import { embed } from 'ai';

export default async function create_database(formData: any, title: string, url: any, desc: any, value: any) {
    const session = await auth();
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData;
    
    const text = `${title} ${comment}`;
    const model = google.textEmbeddingModel('text-embedding-004', {
        outputDimensionality: 384
    });
    
    const { embedding } = await embed({
        model: model,
        value: text,
    });

    // Convert embedding array to Postgres vector format
   
    const vectorString = `[${embedding.join(',')}]`;
 
    const result: any = await sql('INSERT INTO blogss (title, content, url, author_id, status, content_embedding) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', 
        [title, comment, url, session?.user?.id, "published", vectorString]);
        // const r:any=await sql("INSERT INTO login (username, password, email, avatar_url, role,preference_embedding) VALUES ('ram', '234', 'ram@gmail.com', 'www.google.com', 'user',$1)",[vectorString])
    const result2: any = await sql('INSERT INTO blog_metrics (blog_id) VALUES ($1)', [result[0].id]);
    return result;
}