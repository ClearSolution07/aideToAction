import React, { useEffect, useState } from 'react';
import { Collapse, Button, message, Spin, Typography, Space, Tag, Divider, Avatar, Modal } from 'antd';
import { CheckOutlined, CloseOutlined, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import useAdmin from '../../hooks/useAdmin';

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { confirm } = Modal;

const UserApproval = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getPendingUsers, approveUser, rejectUser, error } = useAdmin();

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const fetchPendingUsers = async () => {
        try {
            const users = await getPendingUsers();
            if (users && Array.isArray(users)) {
                setPendingUsers(users);
            } else {
                setPendingUsers([]);
                message.warning('No unverified users found');
            }
        } catch (error) {
            message.error(error.message || 'Failed to fetch unverified users');
            setPendingUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const showApproveConfirmation = (userId) => {
        confirm({
            title: 'Approve User',
            icon: <ExclamationCircleOutlined />,
            content: "This action can't be undone, are you sure you want to accept the user?",
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                handleApprove(userId);
            },
        });
    };

    const handleApprove = async (userId) => {
        try {
            const response = await approveUser(userId);
            if (response && response.statuscode === 200) {
                message.success(response.message || 'User verified successfully');
                fetchPendingUsers(); // Refresh the list
            } else {
                message.error(response?.message || 'Failed to verify user');
            }
        } catch (error) {
            message.error(error.message || 'Failed to verify user');
        }
    };

    const showRejectConfirmation = (userId) => {
        confirm({
            title: 'Reject User',
            icon: <ExclamationCircleOutlined />,
            content: "This action can't be undone, are you sure you want to delete the user?",
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleReject(userId);
            },
        });
    };

    const handleReject = async (userId) => {
        try {
            const response = await rejectUser(userId);
            if (response && response.statuscode === 200) {
                message.success(response.message || 'User deleted successfully');
                fetchPendingUsers(); // Refresh the list
            } else {
                message.error(response?.message || 'Failed to delete user');
            }
        } catch (error) {
            message.error(error.message || 'Failed to delete user');
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Text type="danger">{error}</Text>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Unverified User Approvals</Title>
            {pendingUsers.length === 0 ? (
                <Text>No unverified users to approve</Text>
            ) : (
                <Collapse>
                    {pendingUsers.map((user) => (
                        <Panel
                            header={
                                <Space>
                                    <Avatar 
                                        icon={<UserOutlined />} 
                                        src={user.user_picture} 
                                        style={{ backgroundColor: '#1890ff' }}
                                    />
                                    <Text strong>{user.full_name}</Text>
                                    <Tag color="blue">{user.email_address}</Tag>
                                    <Tag color="orange">Unverified</Tag>
                                </Space>
                            }
                            key={user.user_id}
                        >
                            <div style={{ marginBottom: '20px' }}>
                                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                    <div>
                                        <Text strong>User ID: </Text>
                                        <Text>{user.user_id}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Full Name: </Text>
                                        <Text>{user.full_name}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Email: </Text>
                                        <Text>{user.email_address}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Phone Number: </Text>
                                        <Text>{user.phone_number}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Gender: </Text>
                                        <Text>{user.gender}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Age: </Text>
                                        <Text>{user.age}</Text>
                                    </div>
                                    <div>
                                        <Text strong>State: </Text>
                                        <Text>{user.state}</Text>
                                    </div>
                                    <div>
                                        <Text strong>CCI Name: </Text>
                                        <Text>{user.cci_name}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Year Left CCI: </Text>
                                        <Text>{user.year_left_cci}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Member of State Network: </Text>
                                        <Text>{user.is_member_state_network ? 'Yes' : 'No'}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Education Status: </Text>
                                        <Text>{user.education_status}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Employment Status: </Text>
                                        <Text>{user.employment_status}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Strengths: </Text>
                                        <Text>{user.strengths}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Created At: </Text>
                                        <Text>{formatDate(user.created_at)}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Updated At: </Text>
                                        <Text>{formatDate(user.updated_at)}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Is Active: </Text>
                                        <Text>{user.is_active ? 'Yes' : 'No'}</Text>
                                    </div>
                                    <div>
                                        <Text strong>User Type: </Text>
                                        <Text>{user.user_type}</Text>
                                    </div>
                                    <div>
                                        <Text strong>User Role: </Text>
                                        <Text>{user.user_role || 'N/A'}</Text>
                                    </div>
                                    <div>
                                        <Text strong>User Rating: </Text>
                                        <Text>{user.user_rating || 'N/A'}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Rated Students: </Text>
                                        <Text>{user.rated_students || 'N/A'}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Is Admin: </Text>
                                        <Text>{user.is_admin ? 'Yes' : 'No'}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Description: </Text>
                                        <Text>{user.description || 'N/A'}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Network Name: </Text>
                                        <Text>{user.network_name}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Is Verified: </Text>
                                        <Text>{user.is_verified ? 'Yes' : 'No'}</Text>
                                    </div>
                                    <div>
                                        <Text strong>Specialization: </Text>
                                        <Text>{user.specialization || 'N/A'}</Text>
                                    </div>
                                </Space>
                            </div>
                            <Divider />
                            <Space>
                                <Button
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    onClick={() => showApproveConfirmation(user.user_id)}
                                >
                                    Approve
                                </Button>
                                <Button
                                    danger
                                    icon={<CloseOutlined />}
                                    onClick={() => showRejectConfirmation(user.user_id)}
                                >
                                    Reject
                                </Button>
                            </Space>
                        </Panel>
                    ))}
                </Collapse>
            )}
        </div>
    );
};

export default UserApproval; 