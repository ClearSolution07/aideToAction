import React, { useState } from "react";
import { Card, Typography, List, DatePicker } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const announcements = [
  {
    title: "Outing schedule for every department",
    timestamp: "5 minutes ago",
  },
  {
    title: "Meeting HR Department",
    timestamp: "Yesterday, 12:30 PM",
  },
  {
    title: "IT Department need two more talents for UX/UI Designer position",
    timestamp: "Yesterday, 09:15 AM",
  },
];

const AnnouncementCard = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Announcement
          </Title>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="ddd, DD MMM YYYY"
          />
        </div>
      }
      bordered
      style={{ width: "100%" }}
    >
      <List
        dataSource={announcements}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Title level={4} strong>{item.title}</Title>}
              description={<Text type="secondary">{item.timestamp}</Text>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AnnouncementCard;
