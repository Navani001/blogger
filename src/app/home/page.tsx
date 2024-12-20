'use client'
import Tiptap from "../../lib/TextEditor";


import create_database from "@/lib/blogcreate";
import { useState } from "react";
const contentmain = `

`
export default function Home() {
    const [content,setcontent]=useState<string>(contentmain)
  return (
    <div>
      <Tiptap content={content} setcontent={setcontent}/>
      <button type="submit" onClick={()=>{
        create_database(content)
      }}>Submit</button>
     
    </div>
  );
}
