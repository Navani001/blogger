'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/auth'; 
import { NextResponse } from "next/server";
export async function GET() {

    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const result1 = await sql("select * from tags");
console.log(result1);
    return NextResponse.json({data:result1,message:"success"})
}