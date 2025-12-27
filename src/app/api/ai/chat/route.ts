'use server'
import {google} from "@ai-sdk/google"
import {streamText } from "ai"

export async function POST(request:Request){
console.log("request called")
    const {messages} =await request.json()
    const context =``

    const result = await streamText({
        system:`you are a ai assisant for Blogix wedsite you help people in creating their blogs and remember to give the content in heml tag emclose because editor you html for editing if not it only consider it as p tag\n and also remember to give the data only  no need for formallity no need for html head`,   
        model: google("gemini-2.5-flash"),
        prompt:messages[messages.length - 1].content+""
      
    })

   return result.toDataStreamResponse()

    }

