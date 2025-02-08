import { useState } from "react";
import { Row, Col, Pagination } from "antd";
import "./TherapyWellness.css";

const TherapyWellness = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const TherapyWellnessData = [
        {
            id: "1",
            title: "Mindfulness Meditation",
            videoId: "V2m8zQYLuvk",
        },
        {
            id: "2",
            title: "Breathwork Exercise",
            videoId: "ysv0ww_1LFo",
        },
        {
            id: "3",
            title: "Therapeutic Healing Session",
            videoId: "jyUGiPVCKB0",
        },
    ];

    const paginatedVideos = TherapyWellnessData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="therapy-content">
            <div className="therapy-header">
                <h1 className="therapy-title">
                    Therapy & Healing Corner ({TherapyWellnessData.length})
                </h1>
            </div>

            <Row gutter={[24, 24]}>
                {paginatedVideos.map((video) => (
                    <Col key={video.id} xs={24} sm={12} md={8} lg={6}>
                        <div
                            className="video-card"
                            onClick={() =>
                                window.open(
                                    `https://www.youtube.com/watch?v=${video.videoId}`,
                                    "_blank"
                                )
                            }
                        >
                            <img
                                src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                                alt={video.title}
                                className="video-thumbnail"
                            />
                            <p className="video-title">{video.title}</p>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className="pagination-container">
                <Pagination
                    current={currentPage}
                    total={TherapyWellnessData.length}
                    pageSize={pageSize}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default TherapyWellness;
