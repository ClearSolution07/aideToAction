import React, { useState } from "react";
import { Input, Row, Col, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MemberCard from "../../components/MemberCard";
import ProfileHeader from "../../components/ProfileHeader";
import "./members.css";

const membersData = [
  {
    id: 1,
    name: "Wade Warren",
    role: "Digital Product Designer",
    rating: 5.0,
    students: 236568,
    imageUrl: "/placeholder.svg?height=400&width=400&text=WW",
  },
  {
    id: 2,
    name: "Bessie Cooper",
    role: "Senior Developer",
    rating: 4.9,
    students: 211434,
    imageUrl: "/placeholder.svg?height=400&width=400&text=BC",
  },
  {
    id: 3,
    name: "Floyd Miles",
    role: "UI/UX Designer",
    rating: 4.8,
    students: 435671,
    imageUrl: "/placeholder.svg?height=400&width=400&text=FM",
  },
  {
    id: 4,
    name: "Ronald Richards",
    role: "Lead Developer",
    rating: 4.5,
    students: 1356236,
    imageUrl: "/placeholder.svg?height=400&width=400&text=RR",
  },
  {
    id: 5,
    name: "Devon Lane",
    role: "Senior Developer",
    rating: 4.6,
    students: 854,
    imageUrl: "/placeholder.svg?height=400&width=400&text=DL",
  },
  {
    id: 6,
    name: "Robert Fox",
    role: "UI/UX Designer",
    rating: 4.2,
    students: 197637,
    imageUrl: "/placeholder.svg?height=400&width=400&text=RF",
  },
  {
    id: 7,
    name: "Kathryn Murphy",
    role: "Adobe Instructor",
    rating: 4.8,
    students: 197637,
    imageUrl: "/placeholder.svg?height=400&width=400&text=KM",
  },
  {
    id: 8,
    name: "Jerome Bell",
    role: "Adobe Instructor",
    rating: 4.4,
    students: 2711,
    imageUrl: "/placeholder.svg?height=400&width=400&text=JB",
  },
  {
    id: 9,
    name: "Kristin Watson",
    role: "UI/UX Designer",
    rating: 4.9,
    students: 511123,
    imageUrl: "/placeholder.svg?height=400&width=400&text=KW",
  },
  {
    id: 10,
    name: "Arlene McCoy",
    role: "Digital Product Designer",
    rating: 4.7,
    students: 435671,
    imageUrl: "/placeholder.svg?height=400&width=400&text=AM",
  },
  {
    id: 11,
    name: "Courtney Henry",
    role: "Senior Developer",
    rating: 5.0,
    students: 265700,
    imageUrl: "/placeholder.svg?height=400&width=400&text=CH",
  },
  {
    id: 12,
    name: "Guy Hawkins",
    role: "Lead Developer",
    rating: 4.5,
    students: 854,
    imageUrl: "/placeholder.svg?height=400&width=400&text=GH",
  },
  {
    id: 13,
    name: "Wade Warren",
    role: "Digital Product Designer",
    rating: 5.0,
    students: 236568,
    imageUrl: "/placeholder.svg?height=400&width=400&text=WW",
  },
  {
    id: 14,
    name: "Bessie Cooper",
    role: "Senior Developer",
    rating: 4.9,
    students: 211434,
    imageUrl: "/placeholder.svg?height=400&width=400&text=BC",
  },
  {
    id: 15,
    name: "Floyd Miles",
    role: "UI/UX Designer",
    rating: 4.8,
    students: 435671,
    imageUrl: "/placeholder.svg?height=400&width=400&text=FM",
  },
  {
    id: 16,
    name: "Ronald Richards",
    role: "Lead Developer",
    rating: 4.5,
    students: 1356236,
    imageUrl: "/placeholder.svg?height=400&width=400&text=RR",
  },
  {
    id: 17,
    name: "Devon Lane",
    role: "Senior Developer",
    rating: 4.6,
    students: 854,
    imageUrl: "/placeholder.svg?height=400&width=400&text=DL",
  },
  {
    id: 18,
    name: "Robert Fox",
    role: "UI/UX Designer",
    rating: 4.2,
    students: 197637,
    imageUrl: "/placeholder.svg?height=400&width=400&text=RF",
  },
  {
    id: 19,
    name: "Kathryn Murphy",
    role: "Adobe Instructor",
    rating: 4.8,
    students: 197637,
    imageUrl: "/placeholder.svg?height=400&width=400&text=KM",
  },
  {
    id: 20,
    name: "Jerome Bell",
    role: "Adobe Instructor",
    rating: 4.4,
    students: 2711,
    imageUrl: "/placeholder.svg?height=400&width=400&text=JB",
  },
  {
    id: 21,
    name: "Kristin Watson",
    role: "UI/UX Designer",
    rating: 4.9,
    students: 511123,
    imageUrl: "/placeholder.svg?height=400&width=400&text=KW",
  },
  {
    id: 22,
    name: "Arlene McCoy",
    role: "Digital Product Designer",
    rating: 4.7,
    students: 435671,
    imageUrl: "/placeholder.svg?height=400&width=400&text=AM",
  },
  {
    id: 23,
    name: "Courtney Henry",
    role: "Senior Developer",
    rating: 5.0,
    students: 265700,
    imageUrl: "/placeholder.svg?height=400&width=400&text=CH",
  },
  {
    id: 24,
    name: "Guy Hawkins",
    role: "Lead Developer",
    rating: 4.5,
    students: 854,
    imageUrl: "/placeholder.svg?height=400&width=400&text=GH",
  },
];

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // Changed to 20 cards per page

  const filteredMembers = membersData.filter((member) => {
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.rating.toString().includes(query) ||
      member.students.toString().includes(query)
    );
  });

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="members-container">
      <ProfileHeader />

      <div className="members-content">
        <div className="members-header">
          <h1 className="members-title">Members ({membersData.length})</h1>
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

        <Row gutter={[24, 24]}>
          {paginatedMembers.map((member) => (
            <Col key={member.id} xs={24} sm={12} md={8} lg={6}>
              <MemberCard {...member} />
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
      </div>
    </div>
  );
};

export default Members;

