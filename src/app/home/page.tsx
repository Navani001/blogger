'use client'
import { useEffect, useState } from "react";
import Tiptap from "../../lib/TextEditor";
import create_database from "@/lib/blogcreate";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  Button,
  useDisclosure 
} from "@nextui-org/react";
import BlogModal from "@/lib/model";
import Publish from "@/lib/model";

import { useChat } from 'ai/react'

export default function Home() {
  const [content, setContent] = useState<string>("");
const [title,settitle] = useState<string>("")
  const handleSubmitblog = async () => {
   console.log("title",title)
   console.log("content",content)
    await create_database(content,title);
  };
useEffect(()=>{
  console.log(title)
},[title])
useEffect(()=>{
  console.log(content)
},[content])


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        maxWidth="full"
        position="sticky"
        className="bg-white shadow-sm"
      >
        <NavbarBrand>
          <p className="font-bold text-2xl">Blogger</p>
        </NavbarBrand>
        <NavbarContent justify="end">

       
          <Publish handleSumbit={handleSubmitblog} settitle={settitle} title={title}/> 
        
      
        </NavbarContent>
      </Navbar>

      <div className="mx-auto py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Tiptap content={content} setcontent={setContent} />
          {/* <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mb-8 border border-gray-300 rounded shadow-xl"
      >
        <input
          className="w-full p-2"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div> */}

        </div>
      </div>
      
    
    </div>
  );
}


