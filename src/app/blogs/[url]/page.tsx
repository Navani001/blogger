'use client'
import get_article from "@/lib/blogfetch";
import Image from "next/image";
import { useEffect, useState } from "react";


declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdSenseProps {
  slot: string
}
export default function Home({ params }: { params: any }) {
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
    useEffect(() => {
      var ads = document.getElementsByClassName('adsbygoogle').length;
      for (var i = 0; i < ads; i++) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        } catch (e) {}
      }
    }, []);
  return (
    <div >
       <div dangerouslySetInnerHTML={{ __html: content }} />
     
       <ins className="adsbygoogle"
     style={{display:"block"}}
     data-ad-client="ca-pub-8518220968118950"
     data-ad-slot="9429426200"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

    </div>
  );
}
