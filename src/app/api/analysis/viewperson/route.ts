'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/auth'; 
import { NextResponse } from "next/server";
export async function GET(request: Request, res:any) {

    const sql = neon(`${process.env.DATABASE_URL}`);
    const url = new URL(request?.url); // Full URL of the incoming request
    console.log(url)
    const blogId = url.searchParams.get('blogid');
 console.log(blogId)
    const result = await sql("SELECT l.username,u.created_at FROM user_interaction u JOIN login l ON CAST(u.user_id AS INTEGER) = l.id WHERE blog_id = $1 and interaction_type='view'", [blogId]);
   console.log(result)
    return NextResponse.json({data:result,message:"success"})
}