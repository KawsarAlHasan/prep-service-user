import { Select } from "antd";
import React from "react";

function test() {
  // http://localhost:7000/api/v1/inventory/?start_date=2025-03-24&end_date=2025-03-25
  // Select এর মাধ্যেমে এই ইউআরএল থেকে ডাটা আনতে হবে

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
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
  );
}

export default test;
