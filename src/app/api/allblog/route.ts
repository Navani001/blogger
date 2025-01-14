'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/utilis/auth'; 
import { NextResponse } from "next/server";
export async function GET(request: Request, res:any) {
    const session =await auth()
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result1 = await sql("select id,title,url from blogss");
    return NextResponse.json({data:result1,message:"success"})
}