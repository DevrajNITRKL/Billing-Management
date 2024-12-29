import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { parseDate, formatChartDate } from "../utils/dateUtils";

export default function BillChart() {
  const { bills } = useSelector((state: RootState) => state.bills);

  const chartData = [...bills]
    .sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateA.getTime() - dateB.getTime();
    })
    .map((bill) => ({
      date: formatChartDate(parseDate(bill.date)),
      amount: parseFloat(bill.amount),
    }));

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Billing Cycle</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
