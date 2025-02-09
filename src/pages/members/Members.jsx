import { useState, useEffect } from "react";
import { Input, Row, Col, Pagination, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MemberCard from "../../components/MemberCard";
import useUser from "../../hooks/useUser";
import "./members.css";
import ChatWindow from "../chat/chat";

const Members = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const { getMembers, loading, error } = useUser();
    const [membersData, setMembersData] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getMembers();
                setMembersData(response.data || []);
            } catch (err) {
                console.error("Error fetching members:", err.message);
            }
        };

        fetchMembers();
    }, []);

    const filteredMembers = membersData.filter((member) => {
        const query = searchQuery.toLowerCase();
        const fullName = member.full_name || "";
        return fullName.toLowerCase().includes(query);
    });

    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleChatNavigation = (member) => {
        setSelectedMember(member);
    };

    return selectedMember ? (
        <div className="chat-view">
            <ChatWindow member={selectedMember} />
            <button
                onClick={() => setSelectedMember(null)}
                className="back-button"
            >
                Back to Mentors
            </button>
        </div>
    ) : (
        <div className="members-content">
            <div className="members-header">
                <h1 className="members-title">
                    Mentors ({membersData.length})
                </h1>
                <Input
                    placeholder="Search Mentors..."
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
                                    navigateToChat={handleChatNavigation}
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
    );
};

export default Members;
