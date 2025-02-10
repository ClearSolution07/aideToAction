import { useEffect, useState } from "react";

import { Card, List, Avatar, Typography } from "antd";
import { profilePhoto } from "../utils/imageUtils";
import useUser from "../hooks/useUser";

const { Title, Text } = Typography;

const PsychologistCard = () => {
    const { getPsychologists } = useUser();
    const [psychologistsData, setPsychologistsData] = useState([]);

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
    return (
        <Card
            style={{
                borderRadius: 12,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                width: "100%",
                height: `calc(90vh - 290px)`,
            }}
            styles={{
                body: {
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                },
            }}
        >
            <div
                style={{
                    padding: "16px",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Title level={3} style={{ margin: "0" }}>
                    Psychologist Available
                </Title>
            </div>
            <div
                style={{
                    overflowY: "auto",
                    flexGrow: 1,
                    padding: "16px",
                }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={[...psychologistsData]}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                borderRadius: 8,
                                marginBottom: 8,
                                border: "1px solid #f0f0f0",
                                backgroundColor: "#FAFAFA",
                                padding: 8,
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={item.user_picture || profilePhoto}
                                        size={48}
                                        style={{ border: "1px solid #f0f0f0" }}
                                    />
                                }
                                title={<Text strong>{item.full_name}</Text>}
                                description={
                                    <Text type="secondary">
                                        {item.user_role
                                            ? item.user_role
                                            : "no role"}
                                    </Text>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </Card>
    );
};

export default PsychologistCard;
