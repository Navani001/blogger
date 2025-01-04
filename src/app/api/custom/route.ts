'use server'
import {google} from "@ai-sdk/google"
import {streamText } from "ai"

export async function POST(request:Request){
console.log("request called")
    const {messages} =await request.json()
    const context =``
console.log(messages)
    const result = await streamText({
        system:`you are a assistence for user your job it is full fill users request and also you want to produce the content in html tag without html inclosed start you work`,   
        model: google("gemini-1.5-flash-exp-0827"),
        prompt:messages[messages.length - 1].content+""
      
    })

   return result.toDataStreamResponse()

    }

