import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { message, Spin } from "antd";

const AdminProtectedRoute = ({ element }) => {
    const { getUserDetail } = useUser();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserDetail();
                console.log("Admin Check:", response.data[0].is_admin);
                if (response.data && response.data[0]) {
                    setIsAdmin(response.data[0].is_admin || false);
                }
            } catch (err) {
                message.error("Failed to fetch profile data.", err);
                setIsAdmin(false);
            }
        };

        fetchProfile();
    }, []);

    if (isAdmin === null) {
        return (
            <div style={styles.loaderContainer}>
                <Spin size="large" />
            </div>
        );
    }

    return isAdmin ? element : <Navigate to="/dashboard" />;
};

const styles = {
    loaderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
    },
};

export default AdminProtectedRoute;
