import { useState, useEffect } from "react";
import { Input, Row, Col, Pagination, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MemberCard from "../../components/MemberCard";
import ProfileHeader from "../../components/ProfileHeader";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./psychologists.css";

const Psychologists = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const { getPsychologists, loading, error } = useUser();
    const [PsychologistsData, setPsychologistsData] = useState([]);

    useEffect(() => {
        const fetchPsychologists = async () => {
            try {
                const response = await getPsychologists();
                console.log("psychologist data", response);
                setPsychologistsData(response.data || []);
            } catch (err) {
                console.error("Error fetching members:", err.message);
            }
        };

        fetchPsychologists();
    }, []);

    const filteredMembers = PsychologistsData.filter((psychologist) => {
        const query = searchQuery.toLowerCase();
        return (
            psychologist.full_name.toLowerCase().includes(query) ||
            psychologist.user_role.toLowerCase().includes(query) ||
            psychologist.user_rating.toString().includes(query) ||
            psychologist.rated_students.toString().includes(query)
        );
    });

    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const navigateToChat = (psychologist) => {
        navigate("/saarthi/chat", { state: { psychologist } });
    };

    return (
        <div className="members-container">
            <ProfileHeader />

            <div className="members-content">
                <div className="members-header">
                    <h1 className="members-title">
                        Psychologists ({PsychologistsData.length})
                    </h1>
                    <Input
                        placeholder="Search in your teachers..."
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
                                    md={8}
                                    lg={6}
                                >
                                    <MemberCard
                                        {...psychologist}
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

export default Psychologists;
