// app/api/sitemap/route.ts
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";


export async function GET(req: Request) {
  try {
    // Extract host from the request URL
    const host = new URL(req.url).origin;

    // An array with your links
    const links:any = [];
    // Fetch data from API when the component mounts
    await fetch(`${host}/api/allblog`, {
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
      .then(async (data) => await data.data.map((post:any) => {
      links.push({
        url: `/blog/${post.url}`,
        changefreq: "daily",
        priority: 0.9,
      });
    })) // Update state with the fetched data
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
   

    const pages = ["/editor", "/trending", "/analysis"];
    pages.map((url) => {
      links.push({
        url,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: host });

    // Convert links to a readable stream and pipe it to the SitemapStream
    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data: any) => data.toString());

    // Return the XML response
    return new Response(xmlString, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}