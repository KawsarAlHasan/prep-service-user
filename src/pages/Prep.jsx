import { useState } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Prep = () => {
  const [rows, setRows] = useState([
    { date: "", item: "", asin: "", expiry: "", image: "", qty: "", type: "" },
  ]);
  const [fileList, setFileList] = useState([]);
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        date: "",
        item: "",
        asin: "",
        expiry: "",
        image: "",
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

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const updatedFiles = Array.from(files).map((file) => ({
        uid: file.name,
        name: file.name,
        status: "done",
        url: URL.createObjectURL(file),
      }));
      setFileList([...fileList, ...updatedFiles]);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6">Dynamic Form</h1>
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-8 gap-4 items-center bg-white p-4 rounded-lg shadow-md"
          >
            {/* Date  */}
            <div className="grid items-center">
              <h4 className="text-lg">Date</h4>
              <DatePicker
                onChange={(e) =>
                  handleInputChange(index, "date", e.target.value)
                }
                placeholder="Date"
                className="col-span-1"
              />
            </div>
            {/* Items  */}
            <div className="grid items-center">
              <h4 className="text-lg">Item</h4>
              <Input
                placeholder="Item"
                value={row.item}
                onChange={(e) =>
                  handleInputChange(index, "item", e.target.value)
                }
                className="col-span-1"
              />
            </div>
            {/* ASIN  */}
            <div className="grid items-center">
              <h4 className="text-lg">ASIN</h4>
              <Input
                placeholder="ASIN"
                value={row.asin}
                onChange={(e) =>
                  handleInputChange(index, "asin", e.target.value)
                }
                className="col-span-1"
              />
            </div>
            <div className="grid items-center">
              <h4 className="text-lg">Date of Expiry</h4>
              <DatePicker
                onChange={(e) =>
                  handleInputChange(index, "date", e.target.value)
                }
                placeholder="Date of Expiry"
                className="col-span-1"
              />
            </div>
            {/* image upload  */}
            <div className="text-center">
              <h4 className="text-lg">Image</h4>
              <Button
                icon={<PlusOutlined />}
                className=""
                onClick={() =>
                  document.getElementById("image-upload-input").click()
                }
              />
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
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
            <div className="grid items-center w-full">
              <h4 className="text-lg">Date of Expiry</h4>
              <Select
                placeholder="Type"
                value={row.type || undefined}
                onChange={(value) => handleInputChange(index, "type", value)}
                className="col-span-1"
                options={[
                  { value: "Type 1", label: "Type 1" },
                  { value: "Type 2", label: "Type 2" },
                ]}
              />
            </div>
            <div className="mt-7">
              <Button
                type="dashed"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={handleAddRow}
                className="col-span-1 text-white bg-yellow-600"
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

export default Prep;
