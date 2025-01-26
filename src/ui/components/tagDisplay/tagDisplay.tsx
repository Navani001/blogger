"use client";
import { redirect } from "next/navigation";
import React from "react";
import axios from "axios";
interface Tag {
  name: string;
  id?: number;
  [key: string]: any;
}
export function Tags() {
  const [tags, settags] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/tags/get_tags", {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      })
      .then((response) => {
        settags(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);

  return (
    <div className="flex gap-3 scrollbar-default overflow-x-scroll">
      {tags.length != 0 ? (
        tags.map((tags: Tag, index:number) => (
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
        <div>Loading</div>
      )}
    </div>
  );
}
