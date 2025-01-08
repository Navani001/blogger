"use server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET(request: Request, res: any) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  // ;
  const result1 = await sql(`WITH weighted_scores AS (
    SELECT 
        b.id,
        b.title,
        b.descs,
        b.url,
        b.read_time,
        b.created_at,
       
      b.author_id ,
        (bm.views_count * 1 + 
         bm.comments_count * 3 + 
         bm.likes_count * 2 + 
         bm.share_count * 4) AS calculated_trending_score,
       
        EXTRACT(EPOCH FROM (NOW() - b.created_at))/3600 AS hours_old
    FROM 
        blogss b
    JOIN 
        blog_metrics bm ON b.id = bm.blog_id
    WHERE 
        b.status = 'published'
)
SELECT 
    w.id,
l.avatar_url,
    title,
    descs,
    url,
    read_time,
    w.created_at,
    

    (calculated_trending_score / POW(hours_old + 2, 1.5)) AS final_trending_score
FROM 
    weighted_scores w
    join login l on l.id=w.author_id
ORDER BY 
    final_trending_score DESC
LIMIT 10;`);
  console.log(result1);
  return NextResponse.json({ data: result1, message: "success" });
}
