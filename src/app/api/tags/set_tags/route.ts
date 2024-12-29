'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/auth'; 
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const session =await auth()
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { tags,blogid} = await request.json();
    console.log(blogid,session?.user?.id)
   console.log(tags)
   const values = tags.map((tag:any) => `(${parseInt(tag.id)},${blogid})`).join(', ');
   console.log(values)
    const result = await sql(`INSERT INTO tag_blogs (tag_id,blog_id) VALUES ${values};`);
    // const result1 = await sql("INSERT INTO user_interaction (user_id, blog_id, interaction_type) VALUES ($1, $2, $3) ON CONFLICT ON CONSTRAINT unique_user_interaction DO nothing RETURNING id", [session?.user?.id,blogid,"comment"]);
    // // console.log(result)
    return NextResponse.json({message:"success"})
}