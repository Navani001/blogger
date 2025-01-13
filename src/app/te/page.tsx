"use client"

import BasicPopover from "@/lib/popover";
import { Button } from "@nextui-org/button";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SingleAutocomplet from "@/lib/singleautocomplete";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
export default function Home() {
    const [rec, setRec] = useState([]);
    const [value,setvalue] = useState([])
    useEffect(() => {
      // Fetch data from API when the component mounts
      fetch('/api/allblog',{    next: { revalidate: 3600 }, // Cache for 1 hour
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
    }, []); // Empty dependency array to run this effect once on mount
    
 
  return (
    <div className="min-h-screen  bg-gray-50 flex justify-center items-center">
      <div className="gap-2 flex">
        <SingleAutocomplet autocompleteelement={rec} onclick={(url:any)=>{
                  console.log('Search', url);
                  redirect(`/blogs/${url}`)}} setvalue={setvalue} value={value}/>
      </div>
    </div>
  );
}
