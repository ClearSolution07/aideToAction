import { useState } from "react";
import { Row, Col, Pagination } from "antd";
import "./TherapyWellness.css";

const TherapyWellness = () => {
    const [currentPage, setCurrentPage] = useState({});
    const pageSize = 5;

    const TherapyWellnessData = {
        "Art Therapy": [
            {
                id: "1",
                title: "How to Draw Your Feelings",
                videoId: "v0dgjSG4CpA",
            },
            {
                id: "2",
                title: "ART THERAPY activity for anxiety",
                videoId: "GMSC95hEj2w",
            },
            {
                id: "3",
                title: "Art Therapy Body Scan Meditation",
                videoId: "cWpc4BfRy_U",
            },
        ],
        Meditation: [
            {
                id: "4",
                title: "Isha Kriya: A Guided Meditation",
                videoId: "EwQkfoKxRvo",
            },
            {
                id: "5",
                title: "Short Meditation For Beginners",
                videoId: "DulNz2CkoHI",
            },
        ],
        Pranayama: [
            {
                id: "6",
                title: "10 Minute Pranayama to Increase Immunity",
                videoId: "cMfChJLqma4",
            },
            {
                id: "7",
                title: "A 5-Minute Morning Yoga for Peace",
                videoId: "q5m6tMjcF8k",
            },
            {
                id: "8",
                title: "A 5-Minute Morning Yoga for Peace (Hindi)",
                videoId: "-V3AIfdqn90",
            },
        ],
        Healing: [
            {
                id: "9",
                title: "10 Minute Crystal Singing Bowl Meditation",
                videoId: "unCya_-8ECs",
            },
            {
                id: "10",
                title: "How to Forgive & Forget If Someone Betrays You?",
                videoId: "9l9ASU8mTfE",
            },
        ],
        "Music Therapy": [
            {
                id: "11",
                title: "Relaxing Music for Stress Relief",
                videoId: "6xDyPcJrl0c",
            },
            { id: "12", title: "Morning Flute Music", videoId: "tF4z5kntXAA" },
        ],
    };

    const handlePageChange = (category, page) => {
        setCurrentPage((prev) => ({ ...prev, [category]: page }));
    };

    return (
        <div className="therapy-content">
            <div className="therapy-header">
                <h1 className="therapy-title">Therapy & Healing Corner</h1>
            </div>

            {Object.entries(TherapyWellnessData).map(
                ([category, videos], index) => {
                    const currentPageNum = currentPage[category] || 1;
                    const paginatedVideos = videos.slice(
                        (currentPageNum - 1) * pageSize,
                        currentPageNum * pageSize
                    );

                    return (
                        <div key={category} className="therapy-category">
                            <h2 className="category-title">{category}</h2>
                            <Row gutter={[24, 24]}>
                                {paginatedVideos.map((video) => (
                                    <Col
                                        key={video.id}
                                        xs={24}
                                        sm={12}
                                        md={8}
                                        lg={6}
                                    >
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
                                            <p className="video-title">
                                                {video.title}
                                            </p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                            {videos.length > pageSize && (
                                <div className="pagination-container">
                                    <Pagination
                                        current={currentPageNum}
                                        total={videos.length}
                                        pageSize={pageSize}
                                        onChange={(page) =>
                                            handlePageChange(category, page)
                                        }
                                        showSizeChanger={false}
                                    />
                                </div>
                            )}
                            {index <
                                Object.entries(TherapyWellnessData).length -
                                    1 && <hr className="category-separator" />}
                        </div>
                    );
                }
            )}

            <p className="disclaimer">
                <strong>*Disclaimer*</strong> Saarthi is not promoting any
                trainer,school or you tube channel, these are just examples of
                Do it Yourself sessions
            </p>
        </div>
    );
};

export default TherapyWellness;
