'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/utilis/auth'; 
import { NextResponse } from "next/server";
export async function GET(request: Request) {

    const sql = neon(`${process.env.DATABASE_URL}`);
    const url = new URL(request?.url); // Full URL of the incoming request
    const blogId = url.searchParams.get('blogid');
 
    const result = await sql("SELECT * FROM comments c JOIN login l ON c.user_id = l.id WHERE c.blog_id = $1", [blogId]);
   
    return NextResponse.json({data:result,message:"success"})
}