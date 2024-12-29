import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeBill, setSelectedCategory } from "../store/billSlice";
import { Edit, Trash2, Filter } from "lucide-react";
import { Bill } from "../types/bill";

interface BillListProps {
  onEdit: (bill: Bill) => void;
}

export default function BillList({ onEdit }: BillListProps) {
  const dispatch = useDispatch();
  const { bills, selectedCategory, monthlyBudget } = useSelector(
    (state: RootState) => state.bills
  );

  const categories = Array.from(new Set(bills.map((bill) => bill.category)));

  const filteredBills = selectedCategory
    ? bills.filter((bill) => bill.category === selectedCategory)
    : bills;

  const totalAmount = filteredBills.reduce(
    (sum, bill) => sum + parseFloat(bill.amount),
    0
  );

  // Level 2: Find optimal bills to pay within budget
  const findOptimalBills = () => {
    const sortedBills = [...bills].sort(
      (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
    );
    const optimal: number[] = [];
    let currentSum = 0;

    for (const bill of sortedBills) {
      if (currentSum + parseFloat(bill.amount) <= monthlyBudget) {
        optimal.push(bill.id);
        currentSum += parseFloat(bill.amount);
      }
    }

    return optimal;
  };

  const optimalBillIds = findOptimalBills();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-500" />
          <select
            value={selectedCategory || ""}
            onChange={(e) =>
              dispatch(setSelectedCategory(e.target.value || null))
            }
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="text-lg font-semibold">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBills.map((bill) => (
              <tr
                key={bill.id}
                className={
                  optimalBillIds.includes(bill.id) ? "bg-green-50" : ""
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {bill.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{bill.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{parseFloat(bill.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{bill.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(bill)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => dispatch(removeBill(bill.id))}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
