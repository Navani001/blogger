'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/utilis/auth'; 
import { NextResponse } from "next/server";
export async function POST(request: Request, res:any) {
    const session =await auth()
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { comment,blogid} = await request.json();
    console.log(blogid,session?.user?.id)
   
    const result = await sql("insert into comments (blog_id,user_id,content) values ($1,$2,$3)", [blogid,session?.user?.id,comment]);
    const result1 = await sql("INSERT INTO user_interaction (user_id, blog_id, interaction_type) VALUES ($1, $2, $3) ON CONFLICT ON CONSTRAINT unique_user_interaction DO nothing RETURNING id", [session?.user?.id,blogid,"comment"]);
    // console.log(result)
    return NextResponse.json({message:"success"})
}