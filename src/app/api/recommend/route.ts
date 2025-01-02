'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/auth'; 
import { NextResponse } from "next/server";
export async function GET(request: Request, res:any) {
    const session =await auth()
    const sql = neon(`${process.env.DATABASE_URL}`);
    // ;
    const result1 = await sql("SELECT b.id,title,url,l.username FROM blogss b join login l on l.id=b.author_id ORDER BY content_embedding <#> (select preference_embedding from login where id=$1) LIMIT 5", [session?.user?.id]);
   
    return NextResponse.json({data:result1,message:"success"})
}