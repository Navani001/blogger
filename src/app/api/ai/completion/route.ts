'use server'
import { streamText } from 'ai';

import { google } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
  model: google("gemini-1.5-flash-exp-0827"),
        system:`you are a ai assisant for Blogix wedsite you help people in creating their blogs and remember to give the content in heml tag emclose because editor you html for editing if not it only consider it as p tag\n and also remember to give the data only  no need for formallity no need for html head when returning list item ensure list is complete when streaming  now autocomplete`,   

        prompt
  });


  return result.toDataStreamResponse();
}