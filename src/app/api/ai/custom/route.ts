'use server'
import {google} from "@ai-sdk/google"
import {streamText } from "ai"

export async function POST(request:Request){
console.log("request called")
    const {messages} =await request.json()
    const context =``
console.log(messages)
    const result = await streamText({
        system:`you are a assistence for user your job it is full fill users request and also you want to produce the content in html tag without html inclosed start you work no eed for formalities no need for html,head tag now do`,   
        model: google("gemini-2.0-flash"),
        prompt:messages[messages.length - 1].content+""
      
    })
    console.log(result)
   return result.toDataStreamResponse()

    }

