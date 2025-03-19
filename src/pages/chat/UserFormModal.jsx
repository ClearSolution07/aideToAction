import { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import useChat from "../../hooks/useChat";
const { RangePicker } = DatePicker;

const UserFormModal = ({ user_id, isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const { sendRequestAppoinment } = useChat();
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const senderId = localStorage.getItem("userId");
        setLoading(true);
        try {
            const { dateRange, ...otherValues } = values;
            const payload = {
                senderId,
                receiver_id: user_id,
                ...otherValues,
                date_from: dateRange ? dateRange[0].format("YYYY-MM-DD") : null,
                date_to: dateRange ? dateRange[1].format("YYYY-MM-DD") : null,
            };
            const response = await sendRequestAppoinment(payload);
            if (response.statuscode === 200) {
                message.success("Form submitted successfully!");
            }
            form.resetFields();
            setLoading(false);
        } catch (error) {
            console.error("Error sending message:", error);
            setLoading(false);
        }
    };

    return (
        <Modal
            title={
                <div style={{ textAlign: "center", width: "100%" }}>
                    Appointemt Request Form
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    name: "",
                    mobile: "",
                    dateRange: [],
                    additionalInfo: "",
                }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter your name" },
                    ]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Mobile Number"
                    name="mobile"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your mobile number",
                        },
                        {
                            pattern: /^[0-9]{10}$/,
                            message: "Enter a valid 10-digit number",
                        },
                    ]}
                >
                    <Input placeholder="Enter mobile number" />
                </Form.Item>

                <Form.Item
                    label="Preferred Date Range"
                    name="dateRange"
                    rules={[
                        {
                            required: true,
                            message: "Please select a date range",
                        },
                    ]}
                >
                    <RangePicker
                        format="YYYY-MM-DD"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                {/* Optional Text Box */}
                <Form.Item label="Add Your Message" name="additionalInfo">
                    <Input.TextArea
                        placeholder="Enter any additional details (optional)"
                        rows={3}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        {loading ? "Sending..." : "Send"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserFormModal;
