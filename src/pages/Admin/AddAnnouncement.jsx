import { useState } from "react";
import { Form, Input, DatePicker, Upload, Button, message } from "antd";
import { FilePdfOutlined, PictureOutlined } from "@ant-design/icons";
import moment from "moment";
import useAdmin from "../../hooks/useAdmin";

const { TextArea } = Input;

function AddAnnouncement() {
    const [form] = Form.useForm();
    const [fileBase64, setFileBase64] = useState(null);
    const { addAnnouncement } = useAdmin();

    const onFinish = async (values) => {
        const payload = {
            header: values.title,
            content: values.description,
            date: values.date.format("YYYY-MM-DD"),
            file: fileBase64,
        };

        try {
            const response = await addAnnouncement(payload);
            if (response) {
                message.success("Announcement added successfully!");
                form.resetFields();
                setFileBase64(null);
            }
        } catch (error) {
            message.error(
                "Failed to add announcement. Please try again.",
                error
            );
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
    };

    const handleFileChange = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFileBase64(reader.result);
        };
        reader.onerror = () => {
            message.error("Failed to convert file to base64 format.");
        };
        reader.readAsDataURL(file);
    };

    const beforeUpload = (file, type) => {
        const isPdf = file.type === "application/pdf";
        const isImage = file.type.startsWith("image/");
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (type === "pdf" && !isPdf) {
            message.error("You can only upload PDF files!");
            return false;
        }

        if (type === "image" && !isImage) {
            message.error("You can only upload image files!");
            return false;
        }

        if (!isLt5M) {
            message.error("File must be smaller than 5MB!");
            return false;
        }

        return true;
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                margin: "0 auto",
                width: "100%",
            }}
        >
            <h2 style={{ marginBottom: "24px" }}>Add New Announcement</h2>
            <Form
                form={form}
                name="add_announcement"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                style={{ width: "68%" }}
            >
                <Form.Item
                    name="date"
                    label="Date of Announcement"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select the date of the announcement!",
                        },
                    ]}
                >
                    <DatePicker
                        style={{ width: "100%" }}
                        defaultValue={moment()}
                        format="YYYY-MM-DD"
                    />
                </Form.Item>

                <Form.Item
                    name="title"
                    label="Title of Announcement"
                    rules={[
                        { required: true, message: "Please input the title!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: "Please input the description!",
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item name="file" label="Upload PDF/Image">
                    <Upload
                        name="file"
                        beforeUpload={(file) =>
                            beforeUpload(
                                file,
                                file.type.startsWith("image/") ? "image" : "pdf"
                            )
                        }
                        showUploadList={false}
                        onChange={(info) => {
                            if (info.file && info.file.originFileObj) {
                                handleFileChange(info.file.originFileObj);
                            }
                        }}
                        accept=".pdf, image/*"
                    >
                        <Button
                            icon={
                                fileBase64?.startsWith("data:image/") ? (
                                    <PictureOutlined />
                                ) : (
                                    <FilePdfOutlined />
                                )
                            }
                        >
                            Upload{" "}
                            {fileBase64
                                ? fileBase64.startsWith("data:image/")
                                    ? "Image"
                                    : "PDF"
                                : ""}
                        </Button>
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
