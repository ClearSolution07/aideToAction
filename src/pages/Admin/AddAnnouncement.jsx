import React, { useState } from "react";
import { Form, Input, DatePicker, Upload, Button, message } from "antd";
import {
  UploadOutlined,
  FilePdfOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;

function AddAnnouncement() {
  const [form] = Form.useForm();
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onFinish = (values) => {
    console.log("Success:", values);
    // Here you would typically send the data to your backend
    message.success("Announcement added successfully!");
    form.resetFields();
    setPdfFile(null);
    setImageFile(null);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handlePdfChange = (info) => {
    if (info.file.status === "done") {
      setPdfFile(info.file.originFileObj);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => setImageFile(url));
    }
  };

  const beforeUpload = (file, type) => {
    const isPdf = file.type === "application/pdf";
    const isImage = file.type.startsWith("image/");
    const isLt5M = file.size / 1024 / 1024 < 5;

    if (type === "pdf" && !isPdf) {
      message.error("You can only upload PDF file!");
      return false;
    }

    if (type === "image" && !isImage) {
      message.error("You can only upload image file!");
      return false;
    }

    if (!isLt5M) {
      message.error("File must be smaller than 5MB!");
      return false;
    }

    return true;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <h2 style={{ marginBottom: "24px" }}>Add New Announcement</h2>
      <Form
        form={form}
        name="add_announcement"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        {/* Date of Announcement */}
        <Form.Item
          name="date"
          label="Date of Announcement"
          rules={[
            {
              required: true,
              message: "Please select the date of the announcement!",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={moment()}
            format="YYYY-MM-DD"
          />
        </Form.Item>

        {/* Title of Announcement */}
        <Form.Item
          name="title"
          label="Title of Announcement"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        {/* Upload PDF */}
        <Form.Item name="pdf" label="Upload PDF" valuePropName="fileList">
          <Upload
            name="pdf"
            beforeUpload={(file) => beforeUpload(file, "pdf")}
            onChange={handlePdfChange}
            showUploadList={false}
            accept=".pdf"
          >
            <Button icon={<FilePdfOutlined />}>Upload PDF</Button>
          </Upload>
        </Form.Item>

        {/* Upload Image */}
        <Form.Item name="image" label="Upload Image" valuePropName="fileList">
          <Upload
            name="image"
            beforeUpload={(file) => beforeUpload(file, "image")}
            onChange={handleImageChange}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<PictureOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddAnnouncement;
