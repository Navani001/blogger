"use client";
import { format, parseISO } from "date-fns";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RecommendMap } from "./recommenddata";


const Recommend = () => {

  const [rec, setRec] = useState([]);
const [trending,settrending]=useState([])
  useEffect(() => {
    // Fetch data from API when the component mounts
    fetch("/api/recommend",{    next: { revalidate: 3600 }, // Cache for 1 hour
      cache: "force-cache",
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },})
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
      fetch("/api/trending",{    next: { revalidate: 3600 }, // Cache for 1 hour
        cache: "force-cache",
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => settrending(data.data)) // Update state with the fetched data
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    
  }, []); // Empty dependency array to run this effect once on mount
 
  // Example data to display when there's no API response or to show featured content
 

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          For You
        </h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <RecommendMap data={rec} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Trending Today
        </h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <RecommendMap data={trending}/>
        </div>
      </div>
      </>
  );
};

export default Recommend;
