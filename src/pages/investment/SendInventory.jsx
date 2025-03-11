import React, { useState } from "react";
import { Form, message, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { API, useRateType } from "../../api/api";
import { useNavigate } from "react-router-dom";

const SendInventory = () => {
  const navigate = useNavigate();
  const { rateType, isLoading } = useRateType();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [inventories, setInventories] = useState([]);

  const onFinish = async (values) => {
    const formData = new FormData();

    // Convert inventories to JSON string and append
    formData.append("inventories", JSON.stringify(values.inventories));

    values.inventories.forEach((item, index) => {
      if (item.image?.fileList?.[0]) {
        formData.append("images", item.image.fileList[0].originFileObj);
      }
    });

    try {
      setLoading(true);
      const response = await API.post("/inventory/create", formData);
      if (response.status == 200) {
        message.success("Inventory added Successfully");
        navigate("/");
      }
    } catch (error) {
      message.error(`Error: ${error.message}` || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      name: "",
      date: null,
      amount: 0,
      quantity: 0,
      image: null,
    };
    setInventories([...inventories, newRow]);
  };

  const removeRow = (id) => {
    const newInventories = inventories.filter((item) => item.id !== id);
    setInventories(newInventories);
    form.setFieldsValue({
      inventories: newInventories,
    });
  };

  const handleValuesChange = (changedValues, allValues) => {
    const updatedInventories = allValues.inventories.map((item, index) => {
      let updatedItem = { ...inventories[index], ...item };

      if (updatedItem.rate_type && updatedItem.quantity) {
        const selectedRateType = rateType?.data.find(
          (rate) => rate.id === updatedItem.rate_type
        );

        if (selectedRateType && selectedRateType.rate.length > 0) {
          const matchedRate = selectedRateType.rate.find(
            (r) =>
              updatedItem.quantity >= r.start_unit &&
              updatedItem.quantity <= r.end_unit
          );

          if (matchedRate) {
            updatedItem.amount = matchedRate.rate * updatedItem.quantity;
          } else {
            updatedItem.amount = 0;
          }
        }
      }

      return updatedItem;
    });

    setInventories(updatedInventories);
    form.setFieldsValue({ inventories: updatedInventories });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ inventories }}
      onValuesChange={handleValuesChange}
      layout="vertical"
    >
      {inventories?.map((inventory, index) => (
        <div key={inventory.id} className="flex justify-between mb-4">
          {/* name */}
          <Form.Item
            label="Name"
            name={["inventories", index, "name"]}
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          {/* date */}
          <Form.Item
            label="Date"
            name={["inventories", index, "date"]}
            rules={[{ required: true, message: "Date is required" }]}
          >
            <DatePicker placeholder="Select Date" />
          </Form.Item>

          {/* rate_type */}
          <Form.Item
            name={["inventories", index, "rate_type"]}
            label="Rate Type"
          >
            <Select
              placeholder="Select rate_type"
              loading={isLoading}
              options={
                rateType
                  ? rateType?.data?.map((item) => ({
                      value: item.id,
                      label: item.rate_type,
                    }))
                  : []
              }
            />
          </Form.Item>

          {/* quantity */}
          <Form.Item
            label="Quantity"
            name={["inventories", index, "quantity"]}
            rules={[{ required: true, message: "quantity is required" }]}
          >
            <Input placeholder="quantity" />
          </Form.Item>

          {/* amount */}
          <Form.Item label="Amount" name={["inventories", index, "amount"]}>
            <Input placeholder="amount" disabled />
          </Form.Item>

          {/* Image (Only Preview, No File Name) */}
          <Form.Item
            // label="Image"
            name={["inventories", index, "image"]}
            rules={[{ required: true, message: "Image is required" }]}
          >
            <Upload
              style={{
                width: "100px",
              }}
              beforeUpload={() => false}
              listType="picture-card"
              maxCount={1}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Image</div>
              </div>
            </Upload>
          </Form.Item>

          <Button
            className="self-center"
            shape="circle"
            icon={<MinusOutlined />}
            onClick={() => removeRow(inventory.id)}
          />
        </div>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={addRow} icon={<PlusOutlined />}>
          Add Inventory
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          block
          loading={loading}
          disabled={loading}
          type="primary"
          htmlType="submit"
        >
          Inventories Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SendInventory;
