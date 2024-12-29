import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import BillList from "./components/BillList";
import BillForm from "./components/BillForm";
import BillChart from "./components/BillChart";
import { Bill } from "./types/bill";
import { Plus } from "lucide-react";

function BillManager() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | undefined>();

  const handleEdit = (bill: Bill) => {
    setEditingBill(bill);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBill(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Bill Manager</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Bill
            </button>
          </div>

          <div className="space-y-6">
            <BillList onEdit={handleEdit} />
            <BillChart />
          </div>

          {isFormOpen && (
            <BillForm onClose={handleCloseForm} initialData={editingBill} />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BillManager />
    </Provider>
  );
}

export default App;
