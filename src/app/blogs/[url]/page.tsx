'use client'
import get_article from "@/lib/blogfetch";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { url: string } }) {
    const { url } = params;
    console.log(url)
    const[content,setcontent]=useState("")
    useEffect(()=>{
      const fetch=async ()=>{
         const data:any=await get_article(url)
        console.log(data)
        setcontent(data[0]?.article)
      }
      fetch()
      
    },[])
    useEffect(()=>{
console.log(content)
    },[content])
  return (
    <div >
      
       <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
