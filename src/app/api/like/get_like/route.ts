'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/utilis/auth'; 
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    const session =await auth()
    const sql = neon(`${process.env.DATABASE_URL}`);
    const url = new URL(request?.url); // Full URL of the incoming request
    const blogId = url.searchParams.get('blogid');
   
    const result1 = await sql("select * from user_interaction where user_id=$1 and blog_id=$2 and interaction_type=$3", [session?.user?.id,blogId,"like"]);
 

    return NextResponse.json({data:result1[0]?.status,message:"success"})
}