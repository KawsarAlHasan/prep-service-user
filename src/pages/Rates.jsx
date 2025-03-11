import { useState } from "react";
import { Table, Pagination } from "antd";

const Rates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const data = Array(15)
    .fill(null)
    .map((_, index) => ({
      key: index,
      range: "1-10 units",
      rate: "$1.50/unit",
    }));

  const columns = [
   {
      title: "FBA",
      dataIndex: "range",
      key: "range",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (text) => <span>{text}</span>,
    },
  ];

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-xl font-semibold mb-4">Rates</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={false}
            bordered
            className="custom-table"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={false}
            bordered
            className="custom-table"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Table
            dataSource={paginatedData}
            columns={columns}
            pagination={false}
            bordered
            className="custom-table"
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={data.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Rates;
