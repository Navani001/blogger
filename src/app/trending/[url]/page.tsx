"use client";


import { format, parseISO } from "date-fns";
import { redirect } from "next/navigation";
import React, { use, useEffect, useState } from "react";


const BlogPost = ({ params }: { params: any }) => {
 
  const unwrappedParams = use(params);
  const { url } = unwrappedParams as { url: string };
  const [loading,setLoading]=useState(true)

const [
data,setdata
]=useState([])

  useEffect(() => {
    const fetchcontent = async () => {
      fetch("/api/trendingtag", {
        method: "POST",
        body: JSON.stringify({ tag:url }),
        headers: { "Content-type": "application/json" },
        next: { revalidate: 3600 },
    // Cache for 1 hour
        cache: "force-cache",
     
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {

          setdata(data.result);
        });
     
    };
    fetchcontent();
    setLoading(false)
  }, [url]);

useEffect(()=>{console.log(data)},[data])


    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Trending Blogs in {url}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.length>0 && data.map((post:any, index) => (
            <div
              key={index}
              onClick={() => redirect(`/blogs/${post.url}`)}
              className="bg-white shadow-light-xlll rounded-lg hover:shadow-light-xlll transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                    {post.category || "Development"}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    {/* <ClockIcon className="w-4 h-4 mr-1" /> */}
                    {post.read_time || "5"} min read
                  </div>
                </div>
  
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                  {post.title}
                </h3>
  
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.descs || "No description available"}
                </p>
  
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  
                        <img
                          src={post.avatar_url}
                          alt={`${post.username}'s avatar`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                          }}
                        />
                   
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{post.username}</p>
                      <p className="text-xs text-gray-500">
                        {format(parseISO(post.created_at), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read more
                    {/* <ArrowRightIcon className="w-4 h-4 ml-1" /> */}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {
            data?.length==0 && loading!=true &&<div>Not Data is Found</div>
          }
        </div>
      </div>
    );
  
};

export default BlogPost;
