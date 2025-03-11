import { useState } from "react";
import { Input, Button, Upload, message } from "antd";
import { CameraOutlined, SaveOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Settings = () => {
  const [formData, setFormData] = useState({
    siteName: "",
    copyright: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    logo: null,
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully.`);
      setFormData({ ...formData, logo: info.file.response });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const handleSave = () => {
    console.log(formData);
    message.success("Settings saved successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        {/* Upload Logo */}
        <div className="flex flex-col items-center mb-8">
          <Upload name="logo" showUploadList={false} onChange={handleUpload}>
            <div className="flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-full">
              <CameraOutlined className="text-gray-500 text-xl" />
            </div>
          </Upload>
          <p className="text-blue-600 mt-2 cursor-pointer">Upload Logo</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-600 mb-1">Site Name</label>
            <Input
              variant="filled"
              placeholder="Enter site name"
              value={formData.siteName}
              onChange={(e) => handleInputChange("siteName", e.target.value)}
              className="border-gray-300  py-3"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Copy Right</label>
            <Input
              variant="filled"
              placeholder="Enter copyright text"
              value={formData.copyright}
              onChange={(e) => handleInputChange("copyright", e.target.value)}
              className="border-gray-300 py-3"
            />
          </div>

          <div>
            <div>
              <label className="block text-gray-600 mb-1">SEO Title</label>
              <Input
                variant="filled"
                placeholder="Enter SEO title"
                value={formData.seoTitle}
                onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                className="border-gray-300 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1">SEO Keywords</label>
              <Input
                variant="filled"
                placeholder="Enter SEO keywords"
                value={formData.seoKeywords}
                onChange={(e) =>
                  handleInputChange("seoKeywords", e.target.value)
                }
                className="border-gray-300 py-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">SEO Description</label>
            <TextArea
              variant="filled"
              placeholder="Enter SEO description"
              rows={5}
              value={formData.seoDescription}
              onChange={(e) =>
                handleInputChange("seoDescription", e.target.value)
              }
              className="border-gray-300"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            onClick={handleSave}
            className="bg-blue-600 px-24 py-5"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
