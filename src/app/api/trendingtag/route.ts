'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/lib/utilis/auth'; 
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const session =await auth()
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { tag } = await request.json();
 
    const result = await sql(`
        WITH weighted_scores AS (
    SELECT 
        b.id,
        b.title,
        b.descs,
        b.url,
        b.read_time,
        b.created_at,
         b.author_id ,
        t.name as tag_name,
        bm.views_count,
        bm.comments_count,
        bm.likes_count,
        bm.share_count,
        (bm.views_count * 1 + 
         bm.comments_count * 3 + 
         bm.likes_count * 2 + 
         bm.share_count * 4) AS calculated_trending_score,
        EXTRACT(EPOCH FROM (NOW() - b.created_at))/3600 AS hours_old
    FROM 
        blogss b
    JOIN 
        blog_metrics bm ON b.id = bm.blog_id
    JOIN 
        tag_blogs tb ON b.id = tb.blog_id
    JOIN 
        tags t ON tb.tag_id = t.id
    WHERE 
        b.status = 'published'
        AND t.name = '${tag}'
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

    return NextResponse.json({result:result,message:"success"})
}