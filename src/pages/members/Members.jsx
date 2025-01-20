import { useState, useEffect } from "react";
import { Input, Row, Col, Pagination, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MemberCard from "../../components/MemberCard";
import ProfileHeader from "../../components/ProfileHeader";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./members.css";

const Members = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const { getMembers, loading, error } = useUser();
    const [membersData, setMembersData] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getMembers();
                console.log("Member data:", response);
                setMembersData(response.data || []);
            } catch (err) {
                console.error("Error fetching members:", err.message);
            }
        };

        fetchMembers();
    }, []);

    const filteredMembers = membersData.filter((member) => {
        const query = searchQuery.toLowerCase();
        return (
            member.full_name.toLowerCase().includes(query) ||
            member.user_role.toLowerCase().includes(query) ||
            member.user_rating.toString().includes(query) ||
            member.rated_students.toString().includes(query)
        );
    });

    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const navigateToChat = (member) => {
        navigate("/saarthi/chat", { state: { member } });
    };

    return (
        <div className="members-container">
            <ProfileHeader />
            <div className="members-content">
                <div className="members-header">
                    <h1 className="members-title">
                        Members ({membersData.length})
                    </h1>
                    <Input
                        placeholder="Search Members..."
                        prefix={<SearchOutlined className="search-icon" />}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="search-input"
                    />
                </div>
                {loading ? (
                    <div className="loading-container">
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                    />
                ) : (
                    <>
                        <Row gutter={[24, 24]}>
                            {paginatedMembers.map((member) => (
                                <Col
                                    key={member.user_id}
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                >
                                    <MemberCard
                                        {...member}
                                        navigateToChat={navigateToChat}
                                    />
                                </Col>
                            ))}
                        </Row>
                        <div className="pagination-container">
                            <Pagination
                                current={currentPage}
                                total={filteredMembers.length}
                                pageSize={pageSize}
                                onChange={setCurrentPage}
                                showSizeChanger={false}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Members;
