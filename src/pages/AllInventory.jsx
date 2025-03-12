import React, { useEffect, useState } from "react";
import { API, useMyInventories } from "../api/api";
import { Image, Table, Spin, Button, message, Select } from "antd";
import { AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";

function AllInventory() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    start_date: "",
    end_date: "",
  });

  const { myInventories, pagination, isLoading, isError, error, refetch } =
    useMyInventories(filters);

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

  const handleUpload = async (record) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("pdf", file);

        try {
          const response = await API.put(
            `/inventory/shipping-pdf/${record.id}`,
            formData
          );
          message.success("PDF uploaded successfully!");
          refetch(); // Refetch data to update the table
        } catch (error) {
          message.error("Failed to upload PDF.");
          console.error("Error uploading PDF:", error);
        }
      }
    };
    fileInput.click();
  };

  const handleDownload = async (pdf) => {
    try {
      const pdfUrl = `https://prep-service.onrender.com${pdf}`;
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "inventory.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      message.success("PDF downloaded successfully!");
    } catch (error) {
      message.error("Failed to download PDF.");
      console.error("Error downloading PDF:", error);
    }
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          src={`https://prep-service.onrender.com${image}`}
          alt="img"
          width={50}
          height={50}
        />
      ),
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
      title: "Box",
      dataIndex: "box",
      key: "box",
    },
    {
      title: "Dimension",
      dataIndex: "dimension",
      key: "dimension",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "PDF",
      key: "pdf",
      render: (_, record) =>
        record.pdf === "" ? (
          <p>No PDF</p>
        ) : (
          <div>
            <Button
              icon={<AiOutlineDownload />}
              onClick={() => handleDownload(record.pdf)}
              size="small"
            >
              Download
            </Button>
          </div>
        ),
    },
    {
      title: "PDF Upload",
      key: "is_box_di",
      render: (_, record) =>
        record.is_box_di === 1 ? (
          <Button
            icon={<UploadOutlined />}
            onClick={() => handleUpload(record)}
            size="small"
          >
            Upload
          </Button>
        ) : (
          <Button icon={<UploadOutlined />} disabled size="small">
            Upload
          </Button>
        ),
    },
    {
      title: "Print",
      key: "print",
      render: () => (
        <AiFillPrinter className="text-orange-500 text-lg cursor-pointer hover:scale-110" />
      ),
    },
  ];

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold mb-4">Deals Details</h3>

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

        {isLoading ? (
          <Spin size="large" className="block mx-auto my-10" />
        ) : (
          <Table
            scroll={{ x: "max-content" }}
            columns={columns}
            dataSource={myInventories.map((item, index) => ({
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
    </div>
  );
}

export default AllInventory;
