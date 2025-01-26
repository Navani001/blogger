"use client";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Navbar, NavbarBrand, Button, Textarea } from "@nextui-org/react";

import { Heart, Share2, MessageCircle } from "lucide-react";

import { Toast } from "@/ui/components/toast";
import { Share } from "@/ui/components/model";


const BlogPost = ({ params }: any) => {
  const unwrappedParams = use(params);
  const { url } = unwrappedParams as { url: string };
  const [open, setOpen] = React.useState(false);
  const [blogid, setblogid] = useState("");
  const [liked, setliked] = useState(false);
  const [comment, setcomment] = useState([]);
  const [individualcomment, setindividualcomment] = useState("");
  const [content, setcontent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Existing functionality remains the same
  const handlelike = () => {
    const params = new URLSearchParams({ blogid });
    try {
      fetch(`/api/like/set_like?${params.toString()}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
        cache: "force-cache",
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }).then((response) => {
        console.log(response.status);
        if (response?.status !== 200) {
          setOpen(true);
          return new Error("Network response was not ok");
        }
        setliked(!liked);
        if (!response.ok) throw new Error("Network response was not ok");

        return response.json();
      });
    } catch (error) {
      setOpen(true);
    }
  };

  useEffect(() => {
    const fetchcontent = async () => {
      fetch("/api/content/get_content", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-type": "application/json" },
        next: { revalidate: 3600 }, // Cache for 1 hour
        cache: "force-cache",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          setcontent(data.data.content);
          setblogid(data.data.id);
          const params = new URLSearchParams({ blogid: data.data.id });

          // Fetch comments
          try {
            fetch(`/api/getview?${params.toString()}`, {
              next: { revalidate: 3600 }, // Cache for 1 hour
              cache: "force-cache",
              headers: {
                "Cache-Control":
                  "public, s-maxage=3600, stale-while-revalidate=86400",
              },
            }).then((response) => {
              console.log(response.status);
              if (response?.status !== 200) {
                setOpen(true);
                return new Error("Network response was not ok");
              }
              setliked(!liked);
              if (!response.ok) throw new Error("Network response was not ok");

              return response.json();
            });
          } catch (error) {
            setOpen(true);
          }
          fetch(`/api/comment/get_comment?${params.toString()}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            cache: "force-cache",
            headers: {
              "Cache-Control":
                "public, s-maxage=3600, stale-while-revalidate=86400",
            },
          })
            .then((response) => response.json())
            .then((data) => setcomment(data.data));

          // Fetch like status
          fetch(`/api/like/get_like?${params.toString()}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            cache: "force-cache",
            headers: {
              "Cache-Control":
                "public, s-maxage=3600, stale-while-revalidate=86400",
            },
          })
            .then((response) => response.json())
            .then((data) => setliked(data.data));
        });
    };
    fetchcontent();
  }, [url]);

  const handlecommentsumbit = async () => {
    if (!individualcomment.trim()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comment/post_comment", {
        method: "POST",
        body: JSON.stringify({
          blogid,
          comment: individualcomment,
        }),
        headers: { "Content-type": "application/json" },
      });

      if (response?.status !== 200) {
        setOpen(true);
      }
      if (response.ok) {
        const params = new URLSearchParams({ blogid });
        const newComments = await fetch(
          `/api/comment/get_comment?${params.toString()}`
        ).then((res) => res.json());
        setcomment(newComments.data);
        setindividualcomment("");
      }
    } catch (error) {
      setOpen(true);
      console.log("hi iam here");
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    // biome-ignore lint/style/noVar: <explanation>
    var ads = document.getElementsByClassName("adsbygoogle").length;
    // biome-ignore lint/style/noVar: <explanation>
    for (var i = 0; i < ads; i++) {
      try {
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast
        setOpen={setOpen}
        open={open}
        content={"User is Not Authorized"}
        type={"error"}
        vertical={"top"}
        horizontal={"right"}
      />
      <Navbar maxWidth="full" className="h-14 bg-white shadow-sm">
        <NavbarBrand>
          <h1 className="text-xl font-bold text-gray-800">Blog Reader</h1>
        </NavbarBrand>
      </Navbar>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white rounded-xl shadow-sm p-8 prose prose-lg max-w-none mb-8">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="article-content"
          />
        </article>

        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex gap-6">
            <button
              onClick={handlelike}
              data-test-id='Like-field'
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${liked ? "fill-red-500 text-red-500" : ""
                  }`}
              />
              <span className="text-sm font-medium">Like</span>
            </button>

            <Share />
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-medium">
              {comment.length} Comments
            </span>
          </div>
        </div>

        <div className="mb-8">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8518220968118950"
            data-ad-slot="9429426200"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Comments</h3>
          <div className="mb-6 ">
            <Textarea
              data-test-id="Commentfield"
              classNames={{
                input: "p-2  rounded-lg bg-[#F4F3FA] bg-clip-border",
                inputWrapper: "p-0",
              }}
              className="w-full rounded-lg"
              minRows={2}
              placeholder="Enter your description"
              value={individualcomment}
              onChange={(e) => setindividualcomment(e.target.value)}
            />
          </div>
          <Button
            color="primary"
            onClick={handlecommentsumbit}
            isLoading={isSubmitting}
            className="w-full sm:w-auto mb-4"
          >
            Post Comment
          </Button>
          <div className="space-y-4">
            {comment?.map((item: any, index: number) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    {item.username?.substring(0, 2) || "A"}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">
                        {item.username || "Anonymous"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
