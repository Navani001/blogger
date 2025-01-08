"use client";
import { format, parseISO } from 'date-fns';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Recommend = () => {
  const [rec, setRec] = useState([]);
  
  useEffect(() => {
    // Fetch data from API when the component mounts
    fetch('/api/recommend')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRec(data.data)) // Update state with the fetched data
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run this effect once on mount
  useEffect(()=>{console.log(rec)},[rec])
  // Example data to display when there's no API response or to show featured content
  const featuredPosts = [
    {
      title: "Getting Started with Next.js and TypeScript",
      excerpt: "Learn how to build modern web applications with Next.js and TypeScript",
      author: "Jane Smith",
      date: "Dec 18, 2024",
      category: "Development",
      readTime: "5 min read"
    },
    {
      title: "Mastering Tailwind CSS",
      excerpt: "A comprehensive guide to using Tailwind CSS in your projects",
      author: "John Doe",
      date: "Dec 17, 2024",
      category: "Design",
      readTime: "8 min read"
    }
  ];

  return (
    <div className="flex gap-6 overflow-x-auto scrollbar-hide">
      {rec.length > 0 ?(rec).map((post:any, index) => (
        <div 
          key={index} 
          onClick={()=>{redirect(`/blogs/${post.url}` || "/login")}}
          className="flex-none w-[350px] snap-start bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-blue-600 font-medium">
                {post.category || "Development"}
              </span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{post.descs}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200"  style={{ backgroundImage: `url('${post.avatar_url}')`, backgroundPosition: 'center',
    backgroundSize: 'cover' }} />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{post.username
}</p>
                  <p className="text-sm text-gray-500"> {format(parseISO(post.created_at), 'MMM dd, yyyy')}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Read more
              </button>
            </div>
          </div>
        </div>
      )):<div>Loading </div>}
    </div>
  );
};

export default Recommend;
