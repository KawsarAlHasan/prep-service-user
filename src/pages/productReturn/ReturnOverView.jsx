import React, { useEffect, useState } from "react";
import { Image, Table, Spin, Button, message, Select } from "antd";
import { useMyReturnProducts } from "../../api/api";
import { AiFillPrinter } from "react-icons/ai";

function ReturnOverView() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    start_date: "",
    end_date: "",
  });

  const { myReturnProducts, pagination, isLoading, isError, error, refetch } =
    useMyReturnProducts(filters);

  const handleTableChange = (pagination) => {
    const { current: page, pageSize: limit } = pagination;

    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
      limit,
    }));
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      start_date: startDate,
      end_date: endDate,
    }));
  }, [startDate, endDate]);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const handleChange = (value) => {
    let start, end;
    const today = new Date();

    switch (value) {
      case "today":
        start = end = today.toISOString().split("T")[0];
        break;
      case "yesterday":
        let yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        start = end = yesterday.toISOString().split("T")[0];
        break;
      case "thisMonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        end = today.toISOString().split("T")[0];
        break;
      case "previousMonth":
        let firstDayPrevMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        let lastDayPrevMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        start = firstDayPrevMonth.toISOString().split("T")[0];
        end = lastDayPrevMonth.toISOString().split("T")[0];
        break;
      default:
        start = "";
        end = "";
    }

    setStartDate(start);
    setEndDate(end);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <p>{new Date(record.date).toLocaleDateString()}</p>
      ),
    },
    {
      title: "Transaction No.",
      dataIndex: "transaction_no",
      key: "transaction_no",
    },

    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: "Rate Type",
      dataIndex: "rate_type_name",
      key: "rate_type_name",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span>$ {amount}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Print",
      key: "print",
      render: () => (
        <AiFillPrinter className="text-orange-500 text-lg cursor-pointer hover:scale-110" />
      ),
    },
  ];

  console.log("myReturnProducts", myReturnProducts);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold mb-4">My Return Products</h3>

          <Select
            placeholder="Select a date"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              { value: "", label: "All" },
              { value: "today", label: "Today" },
              { value: "yesterday", label: "Yesterday" },
              { value: "thisMonth", label: "This Month" },
              { value: "previousMonth", label: "Previous Month" },
            ]}
          />
        </div>
      </div>

      {isLoading ? (
        <Spin size="large" className="block mx-auto my-10" />
      ) : (
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          dataSource={myReturnProducts.map((item, index) => ({
            key: index,
            ...item,
          }))}
          pagination={{
            current: filters.page,
            pageSize: filters.limit,
            total: pagination.total,
          }}
          onChange={handleTableChange}
          bordered
        />
      )}

      {isError && <p className="text-red-600">Error: {error.message}</p>}
    </div>
  );
}

export default ReturnOverView;
