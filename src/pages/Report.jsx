
import { useState } from "react";
import { Table, Button, Select, DatePicker, Pagination } from "antd";
import { DownloadOutlined, FilterOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample Data for the Table
  const data = Array(25)
    .fill(null)
    .map((_, index) => ({
      key: index,
      date: "2024-12-20",
      transactionId: `TXN-${index + 1001}`,
      type: "Sales",
      status: index % 2 === 0 ? "Completed" : "Pending",
      amount: `$${(Math.random() * 1000).toFixed(2)}`,
    }));

  // Columns for the Table
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full ${
            status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  // Paginated Data
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          className="bg-blue-600"
        >
          Download Report
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Select Type</label>
            <Select
              placeholder="Select a type"
              className="w-full"
              options={[
                { value: "sales", label: "Sales" },
                { value: "refund", label: "Refund" },
                { value: "expense", label: "Expense" },
              ]}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Select Date Range</label>
            <RangePicker className="w-full" />
          </div>
          <div className="flex items-end">
            <Button
              type="primary"
              icon={<FilterOutlined />}
              className="w-full bg-green-600"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg">
        <Table
          dataSource={paginatedData}
          columns={columns}
          pagination={false}
          bordered
          className="custom-table"
        />
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={data.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            className="py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Report;
