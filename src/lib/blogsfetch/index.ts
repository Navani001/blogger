"use server";

import { auth } from "../auth";

type Blog = {
  
  id: string;
 
};
export const fetchblog = async (): Promise<Blog[]> => {
    const session =await auth()
   console.log(session)
  try {
    const response = await fetch("http://localhost:3000/api/getblogs", {
      method: "POST",
      body: JSON.stringify({ id: session?.user?.id }),
      headers: { 
        "Content-Type": "application/json"
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error; // Re-throw to handle in the component
  }
};