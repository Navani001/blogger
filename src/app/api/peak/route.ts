'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/utilis/auth'; 
import { NextResponse } from "next/server";
export async function GET(request: Request, res:any) {

    const sql = neon(`${process.env.DATABASE_URL}`);
    const url = new URL(request?.url); // Full URL of the incoming request
    const blogId = url.searchParams.get('blogid');
 
    const result = await sql("SELECT DATE(created_at) as interaction_date,COUNT(*) as interaction_count FROM user_interaction WHERE blog_id = $1 AND status = true group by created_at order by interaction_count desc limit 1", [blogId]);
   
    return NextResponse.json({data:result,message:"success"})
}