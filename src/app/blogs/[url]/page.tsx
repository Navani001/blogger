'use client'

import get_article from "@/lib/blogfetch";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}



export default function Home({ params }: { params: any }) {
  const { url } = params;
  const [content, setcontent] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const data: any = await get_article(url);
      console.log(data);
      setcontent(data[0]?.content);
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log(content);
  }, [content]);

  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar maxWidth="full" className="bg-white shadow-sm h-12" >
        <NavbarBrand>
          <Link href="/" className="font-bold text-2xl text-black">
            Blogger
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="#" color="foreground">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              Categories
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" color="foreground">
              About
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="primary" href="#" variant="flat">
              Subscribe
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Main Content */}
      <div className="  py-3">
        {/* Article Content */}
        <article className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none overflow-auto scrollbar-hide">
          <div 
            dangerouslySetInnerHTML={{ __html: content }}
            className="article-content"
          />
        </article>

        {/* AdSense - Same position as original */}
        <div className="mt-8">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8518220968118950"
            data-ad-slot="9429426200"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </div>
  );
}