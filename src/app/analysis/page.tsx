"use client";
import { redirect } from "next/navigation";
import CustomPaginationActionsTable from "@/lib/table";
import { useEffect, useState } from "react";
import { fetchblog } from "@/lib/blogsfetch";

interface RowData {
  title: string;
  url: string;
  status: string;
  desc: string;
}
export default function Home() {
  const [blogs, setblogs] = useState([]);
  const [loading,setloading]=useState(true)
  useEffect(() => {
    const fetch = async () => {
      const data: any = await fetchblog();
      setblogs(data.data);
      setloading(false)
    };
    fetch();
  }, []);
  const handleView = (row: RowData) => {
    console.log("Viewing:", row);
    redirect(`analysis/${row.url}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Blog Analysis Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Analyze your blog posts with AI-powered insights
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading blog posts...</p>
              </div>
            ) : (
            blogs.length!=0 ? 
              <CustomPaginationActionsTable
                rows={blogs}
                handleView={handleView}
                isview={true}
              />:<div>No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
