import { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import useAdmin from "../../hooks/useAdmin";

function AddPsychologist() {
    const [form] = Form.useForm();
    const { addPsychologist, error } = useAdmin();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFinish = async (values) => {
        setIsSubmitting(true);
        try {
            const response = await addPsychologist({
                full_name: values.fullName,
                phone_number: values.phoneNumber,
                email_address: values.emailAddress,
                password: values.password,
            });

            if (response && response.statuscode === 200) {
                message.success("Psychologist added successfully!");
                form.resetFields();
            } else {
                message.error(
                    response.message ||
                        "Failed to add psychologist. Please try again."
                );
            }
        } catch (err) {
            console.error(err);
            message.error("Failed to add psychologist. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
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
            <h2 style={{ marginBottom: "24px" }}>Add New Psychologist</h2>

            <Form
                form={form}
                name="add_psychologist"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                style={{ width: "68%" }}
            >
                {/* Full Name */}
                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the full name!",
                        },
                    ]}
                >
                    <Input placeholder="Enter full name" />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input the phone number!",
                        },
                        {
                            pattern: /^[0-9]{10}$/,
                            message: "Phone number must be 10 digits!",
                        },
                    ]}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>

                {/* Email Address */}
                <Form.Item
                    name="emailAddress"
                    label="Email Address"
                    rules={[
                        {
                            required: true,
                            message: "Please input the email address!",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email address!",
                        },
                    ]}
                >
                    <Input placeholder="Enter email address" />
                </Form.Item>

                {/* Password */}
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input the password!",
                        },
                        {
                            min: 6,
                            message:
                                "Password must be at least 6 characters long!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spin /> : "Save Psychologist"}
                    </Button>
                </Form.Item>
            </Form>

            {/* Error message display */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default AddPsychologist;
