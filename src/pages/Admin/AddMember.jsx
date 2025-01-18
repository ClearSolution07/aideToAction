import React, { useState } from "react";
import { Form, Input, Select, Upload, Button, Checkbox, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function AddMember() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = (values) => {
    console.log("Success:", values);
    // Here you would typically send the data to your backend
    message.success("Member added successfully!");
    form.resetFields();
    setImageUrl(null);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <h2 style={{ marginBottom: "24px" }}>Add New Member</h2>
      <Form
        form={form}
        name="add_member"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please input the full name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select the role!" }]}
        >
          <Select placeholder="Select a role" style={{ width: "100%" }}>
            <Option value="member">Member</Option>
            <Option value="admin">Admin</Option>
            <Option value="manager">Manager</Option>
          </Select>
        </Form.Item>

        {/* Gender Field */}
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Select placeholder="Select gender" style={{ width: "100%" }}>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/* Phone Number Field */}
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid phone number (10 digits).",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Profile Image Field */}
        <Form.Item
          name="image"
          label="Profile Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Member Checkbox */}
        <Form.Item
          name="isMember"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Please confirm that you are a Member!",
            },
          ]}
        >
          <Checkbox>I am a Member</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddMember;
