import { Select } from "antd";
import { FaUserAlt, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import AllInventory from "./AllInventory";

const DashBoard = () => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const timeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "thisMonth", label: "This Month" },
    { value: "previousMonth", label: "Previous Month" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* DashBoard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
          <div>
            <h4 className="text-gray-500">Total User</h4>
            <h2 className="text-2xl font-bold">40,689</h2>
          </div>
          <FaUserAlt className="text-3xl text-blue-400" />
        </div>
        <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
          <div>
            <h4 className="text-gray-500">Total Order</h4>
            <h2 className="text-2xl font-bold">10,293</h2>
          </div>
          <FaBoxOpen className="text-3xl text-yellow-400" />
        </div>
        <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
          <div>
            <h4 className="text-gray-500">Total Sales</h4>
            <h2 className="text-2xl font-bold">$89,000</h2>
          </div>
          <FaDollarSign className="text-3xl text-green-400" />
        </div>
        <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
          <div>
            <h4 className="text-gray-500">Total Pending</h4>
            <h2 className="text-2xl font-bold">2,040</h2>
          </div>
          <BiTimeFive className="text-3xl text-red-400" />
        </div>
      </div>

      {/* Deals Details */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold mb-4">Deals Details</h3>
          <Select
            showSearch
            placeholder="Select a month"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={timeOptions}
          />
        </div>
        <AllInventory />
      </div>
    </div>
  );
};

export default DashBoard;
