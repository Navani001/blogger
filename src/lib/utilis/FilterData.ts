import { calculateDateDifference } from "./DateDifference";

export const getFilteredData = (data: any[], timeRange: string) => {
    const series: { [key: string]: number } = {};
    const today = new Date();
    let days = 7;

    switch (timeRange) {
      case "week":
        days = 7;
        break;
      case "month":
        days = 30;
        break;
      default:
        days = 7;
    }

    // Initialize series object
    for (let i = 1; i <= days; i++) {
      series[i] = 0;
    }

    // Filter and count data
    data.forEach((item: any) => {
      const diffDays = calculateDateDifference(
        item.created_at,
        today.toISOString()
      );
      if (diffDays <= days) {
        series[diffDays] = (series[diffDays] || 0) + 1;
      }
    });

    return {
      seriesData: Object.values(series),
      categories: Object.keys(series),
      timeRange,
    };
  };