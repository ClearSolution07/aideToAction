import { useState } from "react";
import {
    Form,
    Input,
    Select,
    Button,
    Checkbox,
    message,
    InputNumber,
    Spin,
} from "antd";
import useAdmin from "../../hooks/useAdmin";
const { Option } = Select;

function AddMember() {
    const [form] = Form.useForm();
    const { addMember, error } = useAdmin();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFinish = async (values) => {
        setIsSubmitting(true);
        try {
            const response = await addMember({
                full_name: values.fullName,
                age: values.age,
                gender: values.gender,
                phone_number: values.phoneNumber,
                email_address: values.emailAddress,
                password: values.password,
                is_admin: values.isAdmin,
            });

            if (response && response.statuscode === 200) {
                message.success("Member added successfully!");
                form.resetFields();
            } else {
                message.error(
                    response.message ||
                        "Failed to add member. Please try again."
                );
            }
        } catch (err) {
            console.error(err);
            message.error("Failed to add member. Please try again.");
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
            <h2 style={{ marginBottom: "24px" }}>Add New Mentor</h2>

            <Form
                form={form}
                name="add_member"
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

                {/* Age */}
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        { required: true, message: "Please input the age!" },
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        min={1}
                        max={100}
                        placeholder="Enter age"
                    />
                </Form.Item>

                {/* Gender */}
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        { required: true, message: "Please select gender!" },
                    ]}
                >
                    <Select placeholder="Select gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
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

                {/* Is Admin */}
                <Form.Item name="isAdmin" valuePropName="checked">
                    <Checkbox>Is Admin</Checkbox>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spin /> : "Save Member"}
                    </Button>
                </Form.Item>
            </Form>

            {/* Display error message if there's any */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default AddMember;
