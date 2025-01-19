import { useState, useEffect } from "react";
import { Input, Button, Form, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import useUser from "../../hooks/useUser";
import ProfileHeader from "../../components/ProfileHeader";
import "./profile.css";

const Profile = () => {
    const { getUserDetail, handleUserDataSubmit, handleUpdatePassword } =
        useUser();
    const [fileList, setFileList] = useState([]);
    const [profileData, setProfileData] = useState({
        fullName: "",
        phoneNumber: "",
        description: "",
    });
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserDetail();
                setProfileData({
                    fullName: response.data[0].full_name || "",
                    phoneNumber: response.data[0].phone_number || "",
                    description: response.data[0].description || "",
                });
                setFileList([
                    {
                        uid: response.data[0].user_id.toString(),
                        name: "profile-image.png",
                        status: "done",
                        url: response.data[0].user_picture || "",
                    },
                ]);
            } catch (err) {
                message.error("Failed to fetch profile data.", err);
            }
        };

        fetchProfile();
    }, []);

    console.log("File List:", fileList);

    const handleProfileChange = (field) => (e) => {
        setProfileData({ ...profileData, [field]: e.target.value });
    };

    const handlePasswordChange = (field) => (e) => {
        setPasswords({ ...passwords, [field]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            message.error("User ID not found. Please log in again.");
            return;
        }

        setLoading(true);

        try {
            let userPictureBase64 = null;

            if (fileList[0]?.originFileObj) {
                userPictureBase64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(fileList[0].originFileObj);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            }

            const payload = {
                user_id: userId,
                full_name: profileData.fullName,
                phone_number: profileData.phoneNumber,
                user_picture: userPictureBase64,
                description: profileData.description,
            };

            const data = await handleUserDataSubmit(payload);

            message.success("Profile updated successfully!");

            setProfileData({
                fullName: data.full_name,
                phoneNumber: data.phone_number,
                description: data.description,
            });
        } catch (err) {
            console.error("Error updating profile:", err);
            message.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            message.error("User ID not found. Please log in again.");
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            message.error("Passwords do not match.");
            return;
        }
        const payload = {
            user_id: userId,
            password: passwords.newPassword,
        };
        setLoading(true);
        try {
            await handleUpdatePassword(payload);
            message.success("Password updated successfully!");
        } catch (err) {
            message.error("Failed to update password.", err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div className="profile-container">
            <ProfileHeader />
            <div className="profile-edit-container">
                <div className="section-container">
                    <div className="profile-edit-left">
                        <Form layout="vertical" className="left-container">
                            <div className="image-data-container">
                                <div className="user-data-container">
                                    <Form.Item
                                        label="Full Name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Full Name is required.",
                                            },
                                        ]}
                                    >
                                        <Input
                                            value={profileData.fullName}
                                            onChange={handleProfileChange(
                                                "fullName"
                                            )}
                                            placeholder="Enter your full name"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone Number"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Phone Number is required.",
                                            },
                                            {
                                                pattern: /^\d{10}$/,
                                                message:
                                                    "Phone Number must be 10 digits.",
                                            },
                                        ]}
                                    >
                                        <Input
                                            value={profileData.phoneNumber}
                                            onChange={handleProfileChange(
                                                "phoneNumber"
                                            )}
                                            placeholder="Enter your phone number"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Profile Description"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Profile Description is required.",
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            value={profileData.description}
                                            onChange={handleProfileChange(
                                                "description"
                                            )}
                                            placeholder="Write a short description about yourself"
                                            rows={4}
                                        />
                                    </Form.Item>
                                </div>
                                <ImgCrop rotationSlider>
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleImageChange}
                                        onPreview={handlePreview}
                                        className={"customSizedUpload"}
                                    >
                                        {fileList.length < 1 && "+ Upload"}
                                    </Upload>
                                </ImgCrop>
                            </div>
                            <Button
                                type="text"
                                className="button"
                                onClick={handleUpdateProfile}
                                loading={loading}
                                style={{ marginTop: "16px" }}
                                disabled={
                                    !profileData.fullName ||
                                    !profileData.phoneNumber ||
                                    !profileData.description ||
                                    fileList.length === 0
                                }
                            >
                                Update Name & Image
                            </Button>
                        </Form>

                        <Form layout="vertical" className="right-container">
                            <Form.Item
                                label="Change Password"
                                className="password"
                            >
                                <Input.Password
                                    value={passwords.newPassword}
                                    onChange={handlePasswordChange(
                                        "newPassword"
                                    )}
                                    placeholder="Enter a new password"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                className="password"
                            >
                                <Input.Password
                                    value={passwords.confirmPassword}
                                    onChange={handlePasswordChange(
                                        "confirmPassword"
                                    )}
                                    placeholder="Confirm your new password"
                                />
                            </Form.Item>
                            <Button
                                type="text"
                                className="button"
                                onClick={handlePasswordUpdate}
                                loading={loading}
                            >
                                Update Password
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
