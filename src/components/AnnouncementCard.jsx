import React, { useState } from "react";
import { Card, Typography, DatePicker } from "antd";

const { Title, Text } = Typography;

const announcements = [
  { title: "Outing schedule for every department", timestamp: "5 minutes ago" },
  { title: "Meeting HR Department", timestamp: "Yesterday, 12:30 PM" },
  {
    title: "IT Department need two more talents for UX/UI Designer position",
    timestamp: "Yesterday, 09:15 AM",
  },
  { title: "Saarthi is good", timestamp: "5 minutes ago" },
  { title: "Hello saarthi", timestamp: "Yesterday, 12:30 PM" },
  { title: "Happy New Year Saarthi", timestamp: "Yesterday, 09:15 AM" },
  { title: "Outing schedule for every department", timestamp: "5 minutes ago" },
  { title: "Meeting HR Department", timestamp: "Yesterday, 12:30 PM" },
  {
    title: "IT Department need two more talents for UX/UI Designer position",
    timestamp: "Yesterday, 09:15 AM",
  },
  { title: "Saarthi is good", timestamp: "5 minutes ago" },
  { title: "Hello saarthi", timestamp: "Yesterday, 12:30 PM" },
  { title: "Happy New Year Saarthi", timestamp: "Yesterday, 09:15 AM" },
];

const AnnouncementCard = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "100%",
        height: 570,
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Announcement
        </Title>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="ddd, DD MMM YYYY"
          placeholder="Select date"
        />
      </div>
      <div
        style={{
          overflowY: "auto",
          flexGrow: 1,
          padding: "16px",
        }}
      >
        {announcements.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #EFEFEF",
              marginBottom: "8px",
              borderRadius: "8px",
              padding: "8px",
              backgroundColor: "#FAFAFA",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong>{item.title}</Text>
              <Text type="secondary">{item.timestamp}</Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AnnouncementCard;
