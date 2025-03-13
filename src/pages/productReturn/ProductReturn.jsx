import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Input, Select, DatePicker } from "antd";
import { useState } from "react";
import { API, useMyInventories, useRateType } from "../../api/api";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ProductReturn = () => {
  const { rateType, isLoading: rateTypeLoading } = useRateType();
  const navigate = useNavigate();
  const { myInventories, isLoading } = useMyInventories();
  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([
    {
      id: Date.now(),
      inventory_id: "",
      quantity: "",
      reason: "",
      product_conditions: "",
      date: null,
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      inventory_id: "",
      quantity: "",
      reason: "",
      product_conditions: "",
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } else {
      alert("You must have at least one row.");
    }
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        let updatedRow = { ...row, [field]: value };

        if (field === "inventory_id") {
          const selectedInventory = myInventories.find(
            (inv) => inv.id === value
          );
          if (selectedInventory) {
            updatedRow.rate_type = selectedInventory.rate_type;
          }
        }

        if (updatedRow.rate_type && updatedRow.quantity) {
          const selectedRateType = rateType?.data.find(
            (rate) => rate.id === updatedRow.rate_type
          );

          if (selectedRateType && selectedRateType.rate.length > 0) {
            const matchedRate = selectedRateType.rate.find(
              (r) =>
                updatedRow.quantity >= r.start_unit &&
                updatedRow.quantity <= r.end_unit
            );

            if (matchedRate) {
              updatedRow.amount = matchedRate.rate * updatedRow.quantity;
            } else {
              updatedRow.amount = 0;
            }
          }
        }

        return updatedRow;
      }
      return row;
    });

    setRows(updatedRows);
  };

  const handleSubmit = async () => {
    const returnInventories = JSON.stringify(rows);

    try {
      setLoading(true);
      const response = await API.post("/return/create", {
        returnInventories: returnInventories,
      });
      if (response.status == 200) {
        message.success("Inventory added Successfully");
        navigate("/productReturn/overview");
      }
    } catch (error) {
      console.log("error", error);
      message.error(`Error: ${error.message}` || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-7 gap-4 items-center bg-white p-4 rounded-lg shadow-md"
          >
            {/* Return Date */}
            <div className="grid items-center">
              <h4 className="text-lg">Return Date</h4>
              <DatePicker
                placeholder="Select Date"
                value={row.date ? dayjs(row.date) : null}
                onChange={(date, dateString) =>
                  handleInputChange(row.id, "date", dateString)
                }
                format="YYYY-MM-DD"
              />
            </div>

            {/* Items */}
            <div className="grid items-center">
              <h4 className="text-lg">Items</h4>
              <Select
                placeholder="Select Item"
                onChange={(value) =>
                  handleInputChange(row.id, "inventory_id", value)
                }
                options={myInventories?.map((item) => ({
                  value: item.id,
                  label: item.item_name,
                }))}
              />
            </div>

            {/* Quantity */}
            <div className="grid items-center">
              <h4 className="text-lg">Quantity</h4>
              <Input
                placeholder="Quantity"
                value={row.quantity}
                onChange={(e) =>
                  handleInputChange(row.id, "quantity", e.target.value)
                }
              />
            </div>

            {/* Amount Field */}
            <div className="grid items-center">
              <h4 className="text-lg">Amount</h4>
              <Input placeholder="Amount" value={row.amount || 0} disabled />
            </div>

            {/* Reason */}
            <div className="grid items-center">
              <h4 className="text-lg">Reason</h4>
              <Input
                placeholder="Enter Reason"
                value={row.reason}
                onChange={(e) =>
                  handleInputChange(row.id, "reason", e.target.value)
                }
              />
            </div>

            {/* Product Condition */}
            <div className="grid items-center w-full">
              <h4 className="text-lg">Product Condition</h4>
              <Select
                placeholder="Product Condition"
                // value={row.product_conditions}
                onChange={(value) =>
                  handleInputChange(row.id, "product_conditions", value)
                }
                options={[
                  { value: "new", label: "New" },
                  { value: "used", label: "Used" },
                ]}
              />
            </div>

            {/* Add & Delete Buttons */}
            <div className="mt-7 flex gap-5">
              <Button
                type="dashed"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={handleAddRow}
                className="bg-yellow-600 text-white"
              />
              <Button
                type="dashed"
                shape="circle"
                icon={<MinusOutlined />}
                onClick={() => handleDeleteRow(row.id)}
                className="bg-red-600 text-white"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex mt-6">
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
          size="large"
          className="bg-orange-500 text-white w-[20%]"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ProductReturn;
