"use server";

import { auth } from "../utilis/auth";

type Blog = {
  
  id: string;
 
};
export const fetchblog = async (): Promise<Blog[]> => {
    const session =await auth()
   console.log(session)
  try {
    const response = await fetch("http://bloggingai.vercel.app/api/analysis/getblogs", {
      method: "POST",
      body: JSON.stringify({ id: session?.user?.id }),
      headers: { 
        "Content-Type": "application/json"
      },
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