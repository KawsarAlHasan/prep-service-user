import { useState } from "react";
import { Card, Select } from "antd";
import {
  BoxPlotOutlined,
  ClockCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { FaUserAlt } from "react-icons/fa";
import AllInventory from "../AllInventory";

const Overview = () => {
  const stats = [
    { title: "Units in Storage", value: "40,689", icon: <FaUserAlt /> },
    { title: "No. of SKU's", value: "10,293", icon: <BoxPlotOutlined /> },
    { title: "In Process", value: "$89,000", icon: <CheckOutlined /> },
    { title: "Prepped", value: "2040", icon: <ClockCircleOutlined /> },
    { title: "Waiting for Label", value: "40,689", icon: <FaUserAlt /> },
    { title: "On Hold", value: "10,293", icon: <BoxPlotOutlined /> },
    { title: "Shipped", value: "$89,000", icon: <CheckOutlined /> },
  ];

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const monthData = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-3 flex justify-between">
        <h3 className="text-2xl font-semibold">Overview</h3>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={monthData}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="flex flex-col bg-white hover:shadow-md">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="text-lg font-semibold text-gray-700">
                {stat.title}
                <h1 className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </h1>
              </div>
              <div className="text-3xl text-blue-500 bg-green-100 p-2 rounded-xl">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Deals Details */}
      <AllInventory />
    </div>
  );
};

export default Overview;
