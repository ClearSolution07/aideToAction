import React, {useEffect, useState} from "react";
import {Layout, Typography, Avatar, Badge, Dropdown, Menu} from "antd";
import {BellOutlined, MessageOutlined, DownOutlined} from "@ant-design/icons";
import {profilePhoto} from "../utils/imageUtils";

const {Title} = Typography;
const {Header} = Layout;

// Menu for the dropdown
const menuItems = [
    {
        key: "profile",
        label: "Profile",
    },
    {
        key: "settings",
        label: "Settings",
    },
    {
        key: "logout",
        label: "Logout",
    },
];

const HeaderComponent = () => {
    const [is_mobile_width, set_is_mobile_width] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const width = document.body.clientWidth;
        if (width < 1024) {
            set_is_mobile_width(true);
        } else {
            set_is_mobile_width(false);
        }
    }, []);

    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "110px",
            }}
        >
            {!is_mobile_width ? <Title>Dashboard</Title> : null}

            <div
                style={{
                    display: "flex",
                    gap: 28,
                    alignContent: "center",
                }}
            >
                {!is_mobile_width ? <div style={{position: "relative", top: "5px"}}>
                    <Badge dot color="red" offset={[0, 14]}>
                        <BellOutlined style={{fontSize: 25}}/>
                    </Badge>
                </div> : null}

                {!is_mobile_width ? <MessageOutlined style={{fontSize: 25, color: "#000"}}/> : null}

                <Dropdown menu={{items: menuItems}} trigger={["click"]}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap: 8,
                        }}
                    >
                        <Avatar size="large" src={profilePhoto} alt="User Avatar"/>
                        <span style={{fontWeight: 500}}>Admirra John</span>
                        <DownOutlined/>
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeaderComponent;
