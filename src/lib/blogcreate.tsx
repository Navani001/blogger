'use server';
import { neon } from '@neondatabase/serverless';
import { auth } from './auth';
import { google } from "@ai-sdk/google";
import { embed } from 'ai';
//commit
const calculateReadTime = (content:any, options = {}) => {
    // Default options
    const defaults = {
      wordsPerMinute: 200,        // Average reading speed
      imageReadTime: 12,          // Seconds per image
      codeBlockMultiplier: 1.5    // Code takes longer to read
    };
  
    const settings = { ...defaults, ...options };
  
    // Count words (excluding code blocks)
    const stripCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
    const wordCount = stripCodeBlocks.trim().split(/\s+/).length;
  
    // Count images
    const imageCount = (content.match(/!\[.*?\]\(.*?\)/g) || []).length;
  
    // Count code blocks
    const codeBlockCount = (content.match(/```[\s\S]*?```/g) || []).length;
    const codeBlockWords = content
      .match(/```[\s\S]*?```/g)?.join(' ')
      .split(/\s+/).length || 0;
  
    // Calculate total read time in minutes
    let totalMinutes = 
      // Regular words
      wordCount / settings.wordsPerMinute +
      // Images
      (imageCount * settings.imageReadTime) / 60 +
      // Code blocks (applying multiplier)
      (codeBlockWords / settings.wordsPerMinute * settings.codeBlockMultiplier);
  
    // Round to nearest minute, with a minimum of 1 minute
    const minutes = Math.max(1, Math.round(totalMinutes));
  
    return {
      minutes,
      words: wordCount + codeBlockWords,
      images: imageCount,
      codeBlocks: codeBlockCount,
      detailed: {
        totalMinutes,
        wordCount,
        codeBlockWords,
        imageCount,
        codeBlockCount
      }
    };
  };
export default async function create_database(formData: any, title: string, url: any, desc: any, value: any) {
    const session = await auth();
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData;
    
    const text = `${title} ${comment}`;
    const model = google.textEmbeddingModel('text-embedding-004', {
        outputDimensionality: 384
    });
    
    const { embedding } = await embed({
        model: model,
        value: text,
    });

    // Convert embedding array to Postgres vector format
    const readTime = await calculateReadTime(comment);
    console.log(readTime)
    const vectorString = `[${embedding.join(',')}]`;
 
    const result: any = await sql('INSERT INTO blogss (title, content, url, author_id, status, content_embedding,descs,read_time) VALUES ($1, $2, $3, $4, $5, $6,$7,$8) RETURNING id', 
        [title, comment, url, session?.user?.id, "published", vectorString,desc,readTime.minutes]);
        // const r:any=await sql("INSERT INTO login (username, password, email, avatar_url, role,preference_embedding) VALUES ('ram', '234', 'ram@gmail.com', 'www.google.com', 'user',$1)",[vectorString])
    const result2: any = await sql('INSERT INTO blog_metrics (blog_id) VALUES ($1)', [result[0].id]);
    return result;
}