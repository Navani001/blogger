"use client";

import get_article from "@/lib/blogfetch";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Textarea,
  Card,
  CardBody,
  Divider,
} from "@nextui-org/react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function Home({ params }: { params: any }) {
  const unwrappedParams = use(params);
  const { url } = unwrappedParams as { url: string };
  const [blogid, setblogid] = useState("");
  const [liked,setliked]=useState(false)
  const [comment, setcomment] = useState([]);
  const [individualcomment, setindividualcomment] = useState("");
  const [content, setcontent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handlelike = () => {
    setliked(!liked)
    const params = new URLSearchParams({
      blogid: blogid,
    });
    fetch(`/api/like/set_like?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) =>console.log(data));
  };
  useEffect(() => {
    const fetchcontent = async () => {
      const data: any = await get_article(url);
      setblogid(data[0].id);
      setcontent(data[0]?.content);
      const params = new URLSearchParams({
        blogid: data[0].id,
      });
      fetch(`/api/comment/get_comment?${params.toString()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setcomment(data.data));
        fetch(`/api/like/get_like?${params.toString()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setliked(data.data));
    };
    fetchcontent();
  }, []);

  const handlecommentsumbit = async () => {
    if (!individualcomment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comment/post_comment", {
        method: "POST",
        body: JSON.stringify({
          blogid: blogid,
          comment: individualcomment,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Refresh comments after posting
        const params = new URLSearchParams({ blogid });
        const newComments = await fetch(
          `/api/comment/get_comment?${params.toString()}`
        ).then((res) => res.json());
        setcomment(newComments.data);
        setindividualcomment(""); // Clear input after successful post
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Previous Navbar code remains the same */}
      <Navbar maxWidth="full" className="bg-white shadow-sm h-12">
        {/* ... existing navbar content ... */}
      </Navbar>

      <div className="py-3">
        <article className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none overflow-auto scrollbar-hide">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="article-content"
          />
        </article>

        {/* AdSense section remains the same */}
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

        {/* Enhanced Comments Section */}
        <button onClick={handlelike} className={liked?"bg-slate-700":""}>like</button>
        <div className="mt-8 max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardBody>
              <h3 className="text-xl font-semibold mb-4">Comments</h3>
              <Textarea
                label="Add a comment"
                placeholder="Share your thoughts..."
                value={individualcomment}
                onChange={(e) => setindividualcomment(e.target.value)}
                minRows={3}
                className="mb-4"
              />
              <Button
                color="primary"
                onClick={handlecommentsumbit}
                isLoading={isSubmitting}
                className="w-full sm:w-auto"
              >
                Post Comment
              </Button>
            </CardBody>
          </Card>

          <div className="space-y-4">
            {comment &&
              comment.map((item: any, index: number) => (
                <Card key={index} className="w-full">
                  <CardBody>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 text-sm">
                          {item.username?.substring(0, 2) || "A"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">
                            {item.username || "Anonymous"}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{item.content}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
