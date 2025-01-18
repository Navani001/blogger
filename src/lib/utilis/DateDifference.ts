import { differenceInDays, parseISO } from "date-fns";

 export const calculateDateDifference = (startDate: string, endDate: string) => {
    const start = parseISO(startDate);

    const end = parseISO(endDate);
    return differenceInDays(end, start);
  };