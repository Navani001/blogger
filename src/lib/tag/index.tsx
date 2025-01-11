"use client";
import { redirect } from "next/navigation";
import React from "react";

export default function Tags() {
  const [tags, settags] = React.useState([]);
  React.useEffect(() => {
    fetch(`/api/tags/get_tags`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      cache: "force-cache",
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => settags(data.data));
  }, []);
  React.useEffect(() => {
    console.log(tags);
  }, [tags]);
  return (
    <div className="flex gap-3 scrollbar-default overflow-x-scroll">
      {tags.length != 0 ? (
        tags.map((tags: any,index) => (
          <button
        
            key={index}
            onClick={() => {
              redirect(`/trending/${tags.name}`);
            }}
            className="px-6 py-3 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors text-gray-700 font-medium"
          >
            {tags.name}
          </button>
        ))
      ) : (
        <div>Loaging</div>
      )}
    </div>
  );
}
