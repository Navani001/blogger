'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from './auth';
import { format } from 'date-fns';
export default async function create_database(formData: any,title: string,url:any,desc:any,value:any) {
     const session =await auth()
      console.log()
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData;
    console.log("comment",comment);
    console.log("title",title)
    
    // Insert the comment from the form into the Postgres database
    const result:any =await sql('INSERT INTO blogss (title,content,url,author_id,status) VALUES ($1,$2,$3,$4,$5) RETURNING id', [title,comment,url,session?.user?.id,"published"]);
    const result2:any =await sql('INSERT INTO blog_metrics (blog_id) VALUES ($1)', [result[0].id]);
    return result;

   
}