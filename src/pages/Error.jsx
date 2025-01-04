import { Row, Col, Button } from "antd";

const Error = () => {
    return (
        <Row
            align="middle"
            justify="center"
            style={{
                height: "100vh",
                textAlign: "center",
                backgroundColor: "#f0f2f5",
                padding: "20px",
            }}
        >
            <Col>
                <h1
                    style={{
                        fontSize: "2rem",
                        color: "red",
                        marginBottom: "20px",
                    }}
                >
                    404 - Page Not Found
                </h1>
                <p
                    style={{
                        fontSize: "1.2rem",
                        color: "gray",
                        marginBottom: "20px",
                    }}
                >
                    The page you're looking for doesn't exist.
                </p>
                <Button type="primary" href="/" size="large">
                    Go to Home
                </Button>
            </Col>
        </Row>
    );
};

export default Error;
