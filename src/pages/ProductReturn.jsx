import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Select } from "antd";
import { useState } from "react";

const ProductReturn = () => {
  const [rows, setRows] = useState([
    { date: "", item: "", asin: "", expiry: "", qty: "", type: "" },
  ]);
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        date: "",
        item: "",
        asin: "",
        expiry: "",
        qty: "",
        type: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const product = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "tom",
      label: "Tom",
    },
  ];
  //   delete
  const handleDeleteRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, i) => i !== index); // Remove the row at the given index
      setRows(updatedRows);
    } else {
      alert("You must have at least one row."); // Notify the user
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-5 justify-around gap-4 items-center bg-white p-4 rounded-lg shadow-md"
          >
            {/* Items  */}
            <div className="grid items-center">
              <h4 className="text-lg">Items</h4>
              <Select
                showSearch
                placeholder="T-shart"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={product}
              />
            </div>

            {/* Quentity  */}
            <div className="grid items-center">
              <h4 className="text-lg">Quentity</h4>
              <Input
                placeholder="Qty"
                value={row.qty}
                onChange={(e) =>
                  handleInputChange(index, "qty", e.target.value)
                }
                className="col-span-1"
              />
            </div>

            {/* Resone  */}
            <div className="grid items-center">
              <h4 className="text-lg">Resone</h4>
              <Input
                placeholder="Type Resone"
                value={row.item}
                onChange={(e) =>
                  handleInputChange(index, "item", e.target.value)
                }
                className="col-span-1"
              />
            </div>

            <div className="grid items-center w-full">
              <h4 className="text-lg">Product Conditions</h4>
              <Select
                placeholder="Conditions"
                value={row.type || undefined}
                onChange={(value) => handleInputChange(index, "type", value)}
                className="col-span-1"
                options={[
                  { value: "new", label: "New" },
                  { value: "used", label: "Used" },
                ]}
              />
            </div>
            {/* button add and delete  */}
            <div className="mt-7 flex gap-5">
              <Button
                type="dashed"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={handleAddRow}
                className="col-span-1 text-white bg-yellow-600"
              />
              <Button
                type="dashed"
                shape="circle"
                icon={<MinusOutlined />}
                onClick={() => handleDeleteRow(rows.length - 1)} // Deletes the last row
                className="col-span-1 text-white bg-red-600"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-6">
        <Button
          size="large"
          className="text-white bg-orange-500 hover:bg-orange-600 w-[20%]"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ProductReturn;
