"use client";

import React, { use, useEffect, useState } from "react";
import Chart from "react-apexcharts";
const BlogPost = ({ params }: { params: any }) => {
  const unwrappedParams = use(params);
  const [state, setState] = React.useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        id: "example-chart",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      },
    },
  });
  const { url } = unwrappedParams as { url: string };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* {url} */}
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width="500"
      />
    </div>
  );
};

export default BlogPost;
