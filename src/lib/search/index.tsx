"use client";

import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SelectInputField } from "../autocomplete";
import SingleAutocomplet from "../singleautocomplete";

const Search = () => {
  const [rec, setRec] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    // Fetch data from API when the component mounts
    fetch("/api/allblog", {
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
      .then((data) => setRec(data.data)) // Update state with the fetched data
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run this effect once on mount

  // Example data to display when there's no API response or to show featured content

  return (
    <div className="w-[250px] h-full bg-gray-50">
      <SingleAutocomplet
        autocompleteelement={rec}
        onclick={(url: any) => {
          console.log("Search", url);
          redirect(`/blogs/${url}`);
        }}
        setvalue={setvalue}
        value={value}
      />

      {/* <SelectInputField title="Search.." islabel={false}   varient="" autocompleteelement={rec} value={value} multiple={true} searchfield="title" onclick={(url:any)=>{
          console.log('Search', url);
          redirect(`/blogs/${url}`)}} setValue={setvalue}></SelectInputField> */}
    </div>
  );
};

export default Search;
