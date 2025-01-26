'use server';
import { neon } from '@neondatabase/serverless';
import { google } from "@ai-sdk/google";
import { embed } from 'ai';
import { calculateReadTime } from './calculateReadTime';
import { auth } from './auth';

//commit

export async function CreateBlog(formData: any, title: string, url: any, desc: any, value: any) {
    const session = await auth();
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData;
    const check=await sql(`select url from blogss where url='${url}'`)
    console.log(check)
    if(check.length!==0){
        return {message:"Blog already exist with same URL",status:400}
    }
    const text = `${title} ${comment}`;
    const model = google.textEmbeddingModel('text-embedding-004', {
        outputDimensionality: 384
    });
    
    const { embedding } = await embed({
        model: model,
        value: text,
    });

    // Convert embedding array to Postgres vector format
    const readTime = await calculateReadTime(comment);
    console.log(readTime)
    const vectorString = `[${embedding.join(',')}]`;
 
    const result: any = await sql('INSERT INTO blogss (title, content, url, author_id, status, content_embedding,descs,read_time) VALUES ($1, $2, $3, $4, $5, $6,$7,$8) RETURNING id', 
        [title, comment, url, session?.user?.id, "published", vectorString,desc,readTime.minutes]);
      
    await sql('INSERT INTO blog_metrics (blog_id) VALUES ($1)', [result[0].id]);
    return {message:"success",data:result};
}