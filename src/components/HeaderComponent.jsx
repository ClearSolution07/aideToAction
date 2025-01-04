import {
    Layout,
    Typography,
    Avatar,
    Badge,
    Dropdown,
    Button,
} from "antd";
import {
    BellOutlined,
    MessageOutlined,
    DownOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import {profilePhoto} from "../utils/imageUtils";

const {Title} = Typography;
const {Header} = Layout;

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

const HeaderComponent = ({onMenuClick, isMobileWidth, headerText = ''}) => {
    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "64px",
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
            }}
        >
            <div
                style={{display: "flex", alignItems: "center", gap: "16px", flex: 1}}
            >
                {isMobileWidth && (
                    <Button
                        type="text"
                        icon={<MenuOutlined/>}
                        onClick={onMenuClick}
                        style={{
                            fontSize: "18px",
                            padding: 0,
                        }}
                    />
                )}
                {!isMobileWidth && <Title level={2} style={{
                    paddingLeft: 16
                }}>{headerText || 'Dashboard'}</Title>}
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                }}
            >
                <Badge dot color="red" style={{marginTop: "12px"}}>
                    <BellOutlined style={{fontSize: 20, color: "#666"}}/>
                </Badge>
                <Badge dot color="red" style={{marginTop: "12px"}}>
                    <MessageOutlined style={{fontSize: 20, color: "#666"}}/>
                </Badge>
                <Dropdown menu={{items: menuItems}} trigger={["click"]}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap: 8,
                        }}
                    >
                        <Avatar size={32} src={profilePhoto} alt="User Avatar"/>
                        {!isMobileWidth && (
                            <>
                                <span style={{color: "#333"}}>Admirra John</span>
                                <DownOutlined style={{fontSize: 12, color: "#666"}}/>
                            </>
                        )}
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeaderComponent;
