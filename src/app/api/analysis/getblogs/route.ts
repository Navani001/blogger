"use server";

import { neon } from "@neondatabase/serverless";
import { auth } from "@/lib/utilis/auth";
import { NextResponse } from "next/server";

// Define types for blog data
type Blog = {
  id: string;
  title: string;
  content: string;
  author_id: string;
  // Add other blog fields as needed
};

export async function POST(request: Request) {
  try {
    // Check authentication
    const session =await auth()
 console.log(session?.user?.id)

    // Initialize database connection
    const sql = neon(process.env.DATABASE_URL ?? '');
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    // Parse and validate request body
    const body = await request.json();
    const { id } = body;
console.log(id)
    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    // Query database with type safety

    const result = await sql(
      "SELECT  ROW_NUMBER() OVER (ORDER BY id) AS sno,id, title,url,status, (SELECT count(*) FROM user_interaction WHERE user_interaction.interaction_type='comment' AND blog_id = CAST(blogss.id AS varchar)) as comment,(SELECT count(*) FROM user_interaction WHERE user_interaction.interaction_type='view' AND blog_id = CAST(blogss.id AS varchar)) as view, (SELECT count(*) FROM user_interaction WHERE user_interaction.interaction_type='like' and user_interaction.status=true AND blog_id = CAST(blogss.id AS varchar)) as like FROM blogss WHERE author_id=$1",
      [id]
    );
    console.log(result)
    // Return success response
    return NextResponse.json({
      data: result,
      message: "success"
    }, { status: 200 });

  } catch (error) {
    console.error("Error in blog API route:", error);
    
    // Return appropriate error response
 
    return NextResponse.json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}