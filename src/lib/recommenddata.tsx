"use client";
import { format, parseISO } from "date-fns";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const RecommendMap = (props:any) => {
 const {data} = props;


  return (
    <div className="flex gap-6 overflow-x-auto scrollbar-hide">
      {data.length > 0 ? (
        data.map((post: any, index:any) => (
          <div
            key={index}
            onClick={() => {
              redirect(`/blogs/${post.url}` || "/login");
            }}
            className="flex-none w-[350px] snap-start bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-blue-600 font-medium">
                  {post.category || "Development"}
                </span>
                <span className="text-sm text-gray-500">{post.read_time || "5"}min</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.descs || "placeholder"}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                    {post.avatar_url ? (
                      <img
                        src={post.avatar_url}
                        alt={`${post.username}'s avatar`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
                        {post.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {post.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      {" "}
                      {format(parseISO(post.created_at), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Loading </div>
      )}
      
    </div>
  );
};

export default RecommendMap;
