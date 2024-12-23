'use server'
import {google} from "@ai-sdk/google"
import {streamText } from "ai"

export async function POST(request:Request){
console.log("request called")
    const {messages} =await request.json()
    const context =``
   console.log(messages[messages.length - 1])
    const result = await streamText({
        system:`you are a ai assisant for blogger wedsite you help people in creating their blogs and remember to give the content in heml tag emclose because editor you html for editing if not it only consider it as p tag\n and also remember to give the data only`,   
        model: google("gemini-1.5-flash-exp-0827"),
        prompt:messages[messages.length - 1].content+""
      
    })
    console.log("Result", result.toDataStreamResponse())
   return result.toDataStreamResponse()

    }

