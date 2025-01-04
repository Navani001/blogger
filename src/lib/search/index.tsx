"use client";

import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SelectInputField } from '../autocomplet';


const Search = () => {
  const [rec, setRec] = useState([]);
  const [value,setvalue] = useState([])
  useEffect(() => {
    // Fetch data from API when the component mounts
    fetch('/api/allblog')
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
    <div className="w-[160px] h-full bg-gray-50">
 
         <SelectInputField varient="" autocompleteelement={rec} value={value} searchfield="title" onclick={(url:any)=>{redirect(`/blogs/${url}`)}} setValue={setvalue}></SelectInputField>
         </div>
  );
};

export default Search;
