import { useState, useEffect } from "react";
import { Input, Button, Form, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import ProfileHeader from "../../components/ProfileHeader";
import "./profile.css";

const Profile = () => {
    const { getUserDetail, handleUserDataSubmit } = useUser();
    const { handleUpdatePassword } = useAuth();
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
                console.log(response.data[0]);
                setProfileData({
                    fullName: response.data[0].full_name || "",
                    phoneNumber: response.data[0].phone_number || "",
                    description: response.data[0].description || "",
                });
                setFileList([
                    {
                        uid: response.data[0].user_id,
                        name: "profile-image.png",
                        status: "done",
                        url: response.data[0].profile_image || "",
                    },
                ]);
            } catch (err) {
                message.error("Failed to fetch profile data.", err);
            }
        };

        fetchProfile();
    }, []);

    const handleProfileChange = (field) => (e) => {
        setProfileData({ ...profileData, [field]: e.target.value });
    };

    const handlePasswordChange = (field) => (e) => {
        setPasswords({ ...passwords, [field]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            const data = await handleUserDataSubmit({
                ...profileData,
                profile_image: fileList[0]?.originFileObj,
            });
            message.success("Profile updated successfully!");
            setProfileData({
                fullName: data.full_name,
                phoneNumber: data.phone_number,
                description: data.description,
            });
        } catch (err) {
            message.error("Failed to update profile.", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            message.error("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await handleUpdatePassword(passwords.newPassword);
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
                                    <Form.Item label="Full Name">
                                        <Input
                                            value={profileData.fullName}
                                            onChange={handleProfileChange(
                                                "fullName"
                                            )}
                                            placeholder="Enter your full name"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Phone Number">
                                        <Input
                                            value={profileData.phoneNumber}
                                            onChange={handleProfileChange(
                                                "phoneNumber"
                                            )}
                                            placeholder="Enter your phone number"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Profile Description">
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