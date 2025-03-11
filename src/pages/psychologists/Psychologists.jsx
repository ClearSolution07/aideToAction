import { useState, useEffect } from "react";
import { Input, Row, Col, Pagination, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MemberCard from "../../components/MemberCard";
import useUser from "../../hooks/useUser";
import "./psychologists.css";
import ChatWindow from "../chat/chat";

const Psychologists = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const { getPsychologists, loading, error } = useUser();
    const [psychologistsData, setPsychologistsData] = useState([]);
    const [selectedPsychologist, setSelectedPsychologist] = useState(null);

    useEffect(() => {
        const fetchPsychologists = async () => {
            try {
                const response = await getPsychologists();
                setPsychologistsData(response.data || []);
            } catch (err) {
                console.error("Error fetching members:", err.message);
            }
        };

        fetchPsychologists();
    }, []);

    const filteredMembers = psychologistsData.filter((psychologist) => {
        const query = searchQuery.toLowerCase();
        const fullName = psychologist.full_name || "";
        return fullName.toLowerCase().includes(query);
    });

    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleChatNavigation = (psychologist) => {
        setSelectedPsychologist(psychologist);
    };
    console.log("psychologistsData", psychologistsData);

    return selectedPsychologist ? (
        <div className="chat-view">
            <ChatWindow member={selectedPsychologist} />
            <button
                onClick={() => setSelectedPsychologist(null)}
                className="back-button"
            >
                Back to Psychologists
            </button>
        </div>
    ) : (
        <div className="members-container">
            <div className="members-content">
                <div className="members-header">
                    <h1 className="members-title">
                        Available Psychologists ({psychologistsData.length})
                    </h1>
                    <Input
                        placeholder="Search Psychologists..."
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
                            {paginatedMembers.map((psychologist) => (
                                <Col
                                    key={psychologist.user_id}
                                    xs={24}
                                    sm={12}
                                    md={24}
                                    lg={12}
                                    xl={12}
                                >
                                    <MemberCard
                                        {...psychologist}
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
        </div>
    );
};

export default Psychologists;
