import { parse, format } from "date-fns";

export const parseDate = (dateStr: string): Date => {
  try {
    return parse(dateStr, "MM-dd-yyyy", new Date());
  } catch (error) {
    console.error("Error parsing date:", dateStr, error);
    return new Date(); // Fallback to current date
  }
};

export const formatChartDate = (date: Date): string => {
  try {
    return format(date, "MMM dd");
  } catch (error) {
    console.error("Error formatting date:", date, error);
    return "Invalid Date";
  }
};
