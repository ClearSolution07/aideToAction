import { useState, useEffect } from "react";
import { Card, Typography, DatePicker, Collapse } from "antd";
import useDesktop from "../hooks/useDesktop";
import moment from "moment";
import "../../src/pages/auth/Announce.css";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const AnnouncementCard = ({ visible }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [announcementData, setAnnouncementData] = useState([]);
    const { getContent } = useDesktop();

    const handleDateChange = (date, dateString) => {
        setSelectedDate(date);
    };

    const filterByDate = (itemDate) => {
        if (!selectedDate || !selectedDate.isValid()) {
            return true;
        }

        const formattedSelectedDate = selectedDate.format("DD-MM-YYYY");
        const backendDate = moment(itemDate).format("DD-MM-YYYY");

        return backendDate === formattedSelectedDate;
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await getContent();
                console.log("API Response:", response);

                if (response.statuscode === 500 || !response.data) {
                    console.error("Server error:", response.message);
                    setAnnouncementData([]);
                    return;
                }

                if (Array.isArray(response.data)) {
                    setAnnouncementData(response.data);
                } else {
                    console.warn("Unexpected response format:", response);
                    setAnnouncementData([]);
                }
            } catch (err) {
                console.error("Error fetching announcements:", err.message);
                setAnnouncementData([]);
            }
        };

        fetchAnnouncements();
    }, []);

    const filteredAnnouncements = Array.isArray(announcementData)
        ? announcementData
              .filter((item) => filterByDate(item.date))
              .sort(
                  (a, b) =>
                      moment(b.date, "DD-MM-YYYY") -
                      moment(a.date, "DD-MM-YYYY")
              )
        : [];

    const isPDF = (url) => url?.endsWith(".pdf");

    return (
        <Card
            style={{
                width: "100%",
                height: `calc(90vh - 200px)`,
                border: "1px solid #ddd",
            }}
            bodyStyle={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                }}
            >
                <div className="announcement-text">Announcement</div>
                <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="ddd, DD MMM YYYY"
                    placeholder="Select date"
                    style={{ width: visible ? "40%" : "auto" }}
                />
            </div>
            <div
                style={{
                    overflowY: "auto",
                    flexGrow: 1,
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {filteredAnnouncements.length > 0 ? (
                    <Collapse
                        bordered={false}
                        expandIconPosition="end"
                        className="ant-collapse-ghost"
                    >
                        {filteredAnnouncements.map((item, index) => (
                            <Panel
                                key={index}
                                header={
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "100%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#FF5C5C",
                                                    marginRight: "8px",
                                                }}
                                            />
                                            <Text
                                                type="secondary"
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#FF5C5C",
                                                }}
                                            >
                                                {moment(item.date).format(
                                                    "DD-MM-YYYY"
                                                )}
                                            </Text>
                                        </div>
                                        <Text
                                            strong
                                            style={{ fontSize: "18px" }}
                                        >
                                            {item.header}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: "14px",
                                                marginTop: "4px",
                                            }}
                                        >
                                            {item.content}
                                        </Text>
                                    </div>
                                }
                                style={{
                                    border: "1px solid #EFEFEF",
                                    marginBottom: "8px",
                                    borderRadius: "8px",
                                }}
                            >
                                {item?.file && isPDF(item.file) ? (
                                    <iframe
                                        src={item.file}
                                        width="100%"
                                        height="500px"
                                        title="PDF Viewer"
                                        style={{
                                            border: "none",
                                            marginTop: "8px",
                                        }}
                                    ></iframe>
                                ) : item?.file ? (
                                    <img
                                        src={item.file}
                                        alt="Announcement"
                                        style={{
                                            maxWidth: "100%",
                                            marginTop: "8px",
                                        }}
                                    />
                                ) : null}
                            </Panel>
                        ))}
                    </Collapse>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                    >
                        <Text>
                            No announcements found for the selected date...!!
                        </Text>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default AnnouncementCard;
