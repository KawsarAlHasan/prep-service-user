import { Card, Select, Table } from "antd";
import {
  BoxPlotOutlined,
  ClockCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { AiFillPrinter } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

const BillOverview = () => {
  const stats = [
    { title: "Units in Storage", value: "40,689", icon: <FaUserAlt /> },
    { title: "No. of SKU's", value: "10,293", icon: <BoxPlotOutlined /> },
    { title: "In Process", value: "$89,000", icon: <CheckOutlined /> },
    { title: "Prepped", value: "2040", icon: <ClockCircleOutlined /> },
    { title: "Waiting for Label", value: "40,689", icon: <FaUserAlt /> },
    { title: "On Hold", value: "10,293", icon: <BoxPlotOutlined /> },
    { title: "Shipped", value: "$89,000", icon: <CheckOutlined /> },
  ];

  const dataSource = Array(50) // Increased to demonstrate pagination
    .fill(null)
    .map((_, index) => ({
      key: index,
      date: "01/01/2024",
      transaction: `101-00${979 + index}`,
      type: "FBM",
      quantity: 1,
      status: "Out for Delivery",
      amount: "$34,295",
    }));

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Transaction No.",
      dataIndex: "transaction",
      key: "transaction",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Qty.",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">
          {status}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Print",
      key: "print",
      render: () => (
        <AiFillPrinter className="text-orange-500 text-lg cursor-pointer hover:scale-110" />
      ),
    },
  ];
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
        <h3 className="text-2xl font-semibold">BillOverview</h3>
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
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 5, // Items per page
            showSizeChanger: true, // Allow user to change page size
            pageSizeOptions: ["5", "10", "20"], // Options for page size
          }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default BillOverview;
