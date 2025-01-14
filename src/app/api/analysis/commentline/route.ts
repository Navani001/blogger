'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/utilis/auth'; 
import { NextResponse } from "next/server";
export async function GET(request: Request, res:any) {

    const sql = neon(`${process.env.DATABASE_URL}`);
    const url = new URL(request?.url); // Full URL of the incoming request
    console.log(url)
    const blogId = url.searchParams.get('blogid');
 console.log(blogId)
    const result = await sql("SELECT * FROM user_interaction WHERE blog_id=$1  and interaction_type='comment' order by created_at", [blogId]);
   console.log(result)
    return NextResponse.json({data:result,message:"success"})
}