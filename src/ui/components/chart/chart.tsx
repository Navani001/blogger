"use client"

import dynamic from "next/dynamic";

export const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <div>Loading Chart...</div>,
  });