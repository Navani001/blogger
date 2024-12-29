'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/auth'; 
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const session =await auth()
    const sql = neon(`${process.env.DATABASE_URL}`);
    const url = new URL(request?.url); // Full URL of the incoming request
    const blogId = url.searchParams.get('blogid');
    console.log(blogId)
    const result1 = await sql("INSERT INTO user_interaction (user_id, blog_id, interaction_type) VALUES ($1, $2, $3) ON CONFLICT ON CONSTRAINT unique_user_interaction DO UPDATE SET status=not user_interaction.status RETURNING id", [session?.user?.id,blogId,"like"]);

    return NextResponse.json({message:"success"})
}