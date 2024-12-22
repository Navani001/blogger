'use server'
import {google} from "@ai-sdk/google"
import {streamText } from "ai"

export async function POST(request:Request){
console.log("request called")
    const {messages} =await request.json()
   
    const result = await streamText({
        model: google("gemini-1.5-flash-exp-0827"),
        prompt:messages+""
      
    })
    console.log("Result", result.toDataStreamResponse())
   return result.toDataStreamResponse()

    }

