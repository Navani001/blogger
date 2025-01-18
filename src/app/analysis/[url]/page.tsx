"use client";
import {  parseISO, format } from "date-fns";
import React, { use, useEffect, useState } from "react";

import { MetricCard } from "@/ui/components/metriccard";
import { GraphFormat } from "@/ui/components";
import {  getFilteredData } from "@/lib/utilis";

// Dynamically import ApexCharts with SSR disabled
const BlogPost = ({ params }: { params: any }) => {
  const unwrappedParams = use(params);
  const [data, setData] = useState([]);
// Change to:
const [peak, setPeak] = useState("2024-12-31T18:30:00.000Z");
console.log(peak)
  const [commentdata, setcommentdata] = useState([]);
  const [viewData, setViewData] = useState([]);

  const [likepersondata, setlikepersondata] = useState([]);
  const [commentperson, setcommentperson] = useState([]);
  const [viewpersondata, setviewpersondata] = useState([]);
  const [commentstate, setcommentState] = React.useState({
    series: [
      {
        name: "Desktops",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      toolbar: {
        show: false,
      },
      chart: {
        id: "example-chart",
      },
      xaxis: {
        categories: ["1", "2", "3", "4", "5",'6','7'],
      },
    },
  });
  const [viewState, setViewState] = React.useState({
    series: [
      {
        name: "Desktops",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      toolbar: {
        show: false,
      },
      chart: {
        id: "example-chart",
      },
      xaxis: {
        categories:["1", "2", "3", "4", "5",'6','7'],
      },
    },
  });
  const [state, setState] = React.useState({
    series: [
      {
        name: "Desktops",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      toolbar: {
        show: false,
      },
      chart: {
        id: "example-chart",
      },
      xaxis: {
        categories:["1", "2", "3", "4", "5",'6','7'],
      },
    },
  });
  const [sort, setsort] = useState("month");
  const [commentsort, setcommentsort] = useState("week");
  const [viewsort,setviewsort] = useState("week")

  useEffect(() => {
    if (data.length) {
      const { seriesData, categories } = getFilteredData(data, sort);

      setState((prev) => ({
        ...prev,
        series: [
          {
            name: sort.charAt(0).toUpperCase() + sort.slice(1),
            data: seriesData,
          },
        ],
        options: {
          ...prev.options,
          xaxis: { categories },
        },
      }));
    }
  }, [data, sort]);
  useEffect(() => {
    if (viewData.length) {
      const { seriesData, categories } = getFilteredData(
        viewData,
        viewsort
      );

      setViewState((prev) => ({
        ...prev,
        series: [
          {
            name: viewsort.charAt(0).toUpperCase() + viewsort.slice(1),
            data: seriesData,
          },
        ],
        options: {
          ...prev.options,
          xaxis: { categories },
        },
      }));
    }
  }, [viewData, viewsort]);
  useEffect(() => {
    if (commentdata.length) {
      const { seriesData, categories } = getFilteredData(
        commentdata,
        commentsort
      );

    setcommentState((prev) => ({
        ...prev,
        series: [
          {
            name: commentsort.charAt(0).toUpperCase() + commentsort.slice(1),
            data: seriesData,
          },
        ],
        options: {
          ...prev.options,
          xaxis: { categories },
        },
      }));
    }
  }, [commentdata, commentsort]);
  const { url } = unwrappedParams as { url: string };
  useEffect(() => {
    const fetch_place = async () => {
      const params = new URLSearchParams({
        blogid: url,
      });
      fetch(`/api/analysis/peak?${params.toString()}`, {
        next: { revalidate: 3600 },
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=3600",
        },
      })
        .then((response) => response.json())
        .then((data) => setPeak(data.data[0].interaction_date));
      fetch(`/api/analysis/likeline?${params.toString()}`, {
        next: { revalidate: 3600 },
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=3600",
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data.data));
        fetch(`/api/analysis/viewline?${params.toString()}`, {
          next: { revalidate: 3600 },
          cache: "force-cache",
          headers: {
            "Cache-Control": "max-age=3600",
          },
        })
          .then((response) => response.json())
          .then((data) => setViewData(data.data));
      fetch(`/api/analysis/commentline?${params.toString()}`, {
        next: { revalidate: 3600 },
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=3600",
        },
      })
        .then((response) => response.json())
        .then((data) => setcommentdata(data.data));
      fetch(`/api/analysis/likeperson?${params.toString()}`, {
        next: { revalidate: 3600 },
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=3600",
        },
      })
        .then((response) => response.json())
        .then((data) => setlikepersondata(data.data));
      fetch(`/api/analysis/commentperson?${params.toString()}`, {
        next: { revalidate: 3600 },
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=3600",
        },
      })
        .then((response) => response.json())
        .then((data) => setcommentperson(data.data));
        fetch(`/api/analysis/viewperson?${params.toString()}`, {
          next: { revalidate: 3600 },
          cache: "force-cache",
          headers: {
            "Cache-Control": "max-age=3600",
          },
        })
          .then((response) => response.json())
          .then((data) => setviewpersondata(data.data));
    };

    fetch_place();
  }, [url]);
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Blog Analytics
        </h1>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Engagement"
            value={`${data.length + commentdata.length}`}
            subtitle="Combined likes & comments"
            icon="📊"
          />
          <MetricCard
            title="Avg. Daily Likes"
            value={`${(data.length / 30).toFixed(1)}`}
            subtitle="Last 30 days"
            icon="👍"
          />
          <MetricCard
            title="Comment Rate"
            value={viewData.length > 0 ? 
              `${((commentdata.length / viewData.length) * 100).toFixed(1)}%` : 
              '0%'
            }
            subtitle="Comments per view"
            icon="💭"
          />
          <MetricCard
            title="Peak Engagement"
            value={"2020-12-31T18:30:00.000Z"!==peak?format(parseISO(peak), "MM/dd/yyyy"):"00:00"}
            subtitle="Most active day"
            icon="⭐"
          />
        </div>

        {/* Charts Grid */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center">

  {/* Like Trends Chart */}
  <div className="bg-white rounded-lg shadow-lg p-6">
<GraphFormat setsort={setsort} title={"Like"} state={state} comments={likepersondata}/>

  
    {/* Recent Likes List */}

  </div>

  {/* Comment Activity Chart */}
  <div className="bg-white rounded-lg shadow-lg p-6">
    <GraphFormat setsort={setcommentsort} title={"Comment"} state={commentstate} comments={commentperson}/>
   
  </div>
  <div className="lg:col-span-2 lg:max-w-[700px] lg:mx-auto w-full bg-white rounded-lg shadow-lg p-6 justify-self-center ">
  <GraphFormat setsort={setviewsort} title={"View"} state={viewState} comments={viewpersondata}/>
  </div>
</div>

      </div>
    </div>
  );
};

export default BlogPost;
