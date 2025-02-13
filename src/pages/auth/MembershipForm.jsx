import {
    Form,
    Input,
    Select,
    Radio,
    Button,
    Typography,
    Space,
    Divider,
    message,
    Modal,
} from "antd";
import { InstagramOutlined, FacebookOutlined } from "@ant-design/icons";
import { logoImage } from "../../utils/imageUtils";
import ReCAPTCHA from "react-google-recaptcha";
import useAuth from "../../hooks/useAuth";
import "./membershipform.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent";
import Footer from "../../components/FooterComponent";

const { Title, Paragraph, Link } = Typography;
const { Option } = Select;

const MembershipForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { handleSignUp, loading } = useAuth();

    const buttonStyle = {
        backgroundColor: "#ff5c5c",
        borderColor: "#ff5c5c",
        color: "white",
        margin: "10px",
        padding: "5px 15px",
        borderRadius: "5px",
    };

    const onFinish = async (values) => {
        const mappedValues = {
            full_name: values.full_name,
            age: parseInt(values.age, 10),
            gender:
                values.gender === "Male (पुरुष)"
                    ? "Male"
                    : values.gender === "Female (महिला)"
                    ? "Female"
                    : values.gender === "Others (अन्य)"
                    ? "Others"
                    : values.gender === "Prefer not to say (कहना नहीं चाहेंगे)"
                    ? "Prefer not to say"
                    : values.gender,
            phone_number: values.phone_number,
            email_address: values.email_address,
            state: values.state,
            cci_name: values.cci_name,
            network_name: values.network_name,
            year_left_cci: values.year_left_cci,
            is_member_state_network:
                values.is_member_state_network === "Yes (हाँ)"
                    ? true
                    : values.is_member_state_network === "No (नहीं)"
                    ? false
                    : values.is_member_state_network,
            education_status:
                values.education_status === "Primary School (प्राथमिक स्कूल)"
                    ? "Primary School"
                    : values.education_status ===
                      "Secondary School (माध्यमिक विद्यालय)"
                    ? "Seconday School"
                    : values.education_status === "High School (हाई स्कूल)"
                    ? "High School"
                    : values.education_status === "Undergraduate (अंडरग्रेजुएट)"
                    ? "Undergraduate"
                    : values.education_status === "Graduate (ग्रेजुएट)"
                    ? "Graduate"
                    : values.education_status === "Postgraduate (स्नातकोत्तर)"
                    ? "Postgraduate"
                    : "Others",
            employment_status:
                values.employment_status === "Employed (कार्यरत)"
                    ? "Employed"
                    : values.employment_status === "Unemployed (बेरोज़गार)"
                    ? "Unemployed"
                    : values.employment_status === "Self Employed (स्वनियोजित)"
                    ? "Self Employed"
                    : values.employment_status === "Student (छात्र)"
                    ? "Self Employed"
                    : "Student",
            strengths: values.strengths,
        };

        try {
            const response = await handleSignUp(mappedValues);
            if (response.statuscode === 200) {
                const password = response?.data?.password;
                const email = response?.data?.email_address;

                Modal.success({
                    title: "Signup Successful!",
                    content: (
                        <div>
                            <p>
                                Please save your password and email. This
                                message will disappear once you close it.
                            </p>
                            <p>
                                <strong>Password:</strong> {password}{" "}
                                <Button
                                    type="link"
                                    icon={<CopyOutlined />}
                                    onClick={() => {
                                        navigator.clipboard.writeText(password);
                                        message.success(
                                            "Password copied to clipboard!"
                                        );
                                    }}
                                >
                                    Copy
                                </Button>
                            </p>
                            <p>
                                <strong>Email:</strong> {email}
                            </p>
                        </div>
                    ),
                    okText: "Close",
                    onOk: () => {
                        form.resetFields();
                        navigate("/");
                    },
                    okButtonProps: {
                        style: {
                            backgroundColor: "#ff5c5c",
                            borderColor: "#ff5c5c",
                            color: "#fff",
                        },
                    },
                });
            } else {
                message.error(
                    response.message || "Signup failed. Please try again."
                );
            }
        } catch (err) {
            message.error(err.message || "Signup failed. Please try again.");
        }
    };

    const educationOptions = [
        "Primary School (प्राथमिक स्कूल)",
        "Secondary School (माध्यमिक विद्यालय)",
        "High School (हाई स्कूल)",
        "Undergraduate (अंडरग्रेजुएट)",
        "Graduate (रेजुएट)",
        "Postgraduate (स्नातकोत्तर)",
        "Others (अन्य)",
    ];

    const employmentOptions = [
        "Employed (कार्यरत)",
        "Unemployed (बेरोजगार)",
        "Self Employed (स्वनियोजित)",
        "Student (छात्र)",
    ];

    const member = ["Yes (हाँ)", "No (नहीं)"];

    const gender = [
        "Male (पुरुष)",
        "Female (महिला)",
        "Others (अन्य)",
        "Prefer not to say (कहना नहीं चाहेंगे)",
    ];

    return (
        <div>
            <HeaderComponent headerText={"Membership Form"} />

            <div className="regContainer">
                <div className="membershipContainer">
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <img
                            src={logoImage}
                            alt="Saarthi Logo"
                            style={{ margin: "0 auto", marginBottom: "16px" }}
                        />
                        <Title level={2}>Sign-Up!</Title>
                        <Paragraph style={{ fontWeight: 700 }}>
                            Welcome to the Saarthi-Association of Indian
                            Careleavers (AICL)!
                        </Paragraph>
                    </div>

                    <div style={{ textAlign: "justify", marginBottom: "4rem" }}>
                        <Paragraph>By joining the Saarthi-AICL,</Paragraph>
                        <Paragraph>
                            You'll be part of a constantly growing and thriving
                            community of care experienced youths across India.
                            This community is of, for and by care experienced
                            youths/care leavers.
                        </Paragraph>
                        <Paragraph>
                            <strong>Definition</strong>
                        </Paragraph>
                        <Paragraph>
                            1. The term Care Leavers/care experienced youth is
                            being used for those people who are have lived in
                            any Child Care Institution.
                        </Paragraph>
                        <Paragraph>
                            2.Care Leavers' Network/association is a formal or
                            informal group of care leavers' at
                            National/State/District level irrespective of their
                            religion/class/gender/sexual orientation/physical
                            ability/type of their institution.
                        </Paragraph>
                        <Paragraph>
                            <strong>**Disclaimer**</strong>
                        </Paragraph>
                        <Paragraph>
                            Please note, the Saarthi-AICL is not a registered or
                            for-profit network. There is no financial, legal or
                            statutory obligation on either Aide et Action or
                            UNICEF and vice versa. Aide et Action and UNICEF are
                            and will not be accountable for any financial,
                            legal, or statutory repercussions arising out of any
                            activity or statement done or undertaken by members
                            at their individual or group level using the
                            network's name.
                        </Paragraph>
                        <Paragraph>
                            <strong>
                                (The confidentiality of the information received
                                will be maintained.)
                            </strong>
                        </Paragraph>
                        <Paragraph>
                            <strong>Saarthi -AICL में आपका स्वागत है!</strong>
                        </Paragraph>
                        <Paragraph>
                            Saarthi -AICL में शामिल होकर, आप इस लगातार बढ़ते और
                            संपन्न समुदाय का हिस्सा बन जाएंगे। यह समुदाय केयर
                            लीवर्स के लिए, केयर लीवर्स द्वारा एक पहल है।कृपया इस
                            ऑनलाइन फॉर्म को भरें और सदस्य के रूप में हमसे
                            जुड़ें।
                        </Paragraph>
                        <Paragraph>
                            <strong>परिभाषा :</strong>
                        </Paragraph>
                        <Paragraph>
                            1. केयर लीवर्स शब्द का इस्तेमाल उन लोगों के लिए किया
                            जा रहा है जो किसी भी बाल ग्रह में रह चुके हैं।
                        </Paragraph>
                        <Paragraph>
                            2.देखभाल छोड़ने वालों का नेटवर्क /संघ एक औपचारिक या
                            अनौपचारिक राष्ट्रीय/राज्य/जिला स्तर पर समूह है, चाहे
                            उनका धर्म/वर्ग/लिंग/शारीरिक क्षमता/संस्थान का प्रकार
                            कुछ भी हो।
                        </Paragraph>
                        <Paragraph>
                            <strong>अस्वीकरण :</strong>
                        </Paragraph>
                        <Paragraph>कृपया ध्यान दें,</Paragraph>
                        <Paragraph>
                            Saarthi -AICL एक पंजीकृत या लाभकारी नेटवर्क नहीं है।
                            एड ए एक्शन (Aide et Action) या यूनिसेफ (UNICEF) पर
                            कोई वित्तीय, कानूनी या वैधानिक दायित्व नहीं है । आइड
                            एंड एक्शन (Aide et Action) और यूनिसेफ (UNICEF)
                            सदस्यों द्वारा नेटवर्क के नाम का उपयोग करके
                            व्यक्तिगत या समूह स्तर पर की गई किसी भी गतिविधि या
                            बयान से उत्पन्न होने वाले किसी भी वित्तीय, कानूनी या
                            वैधानिक परिणामों के लिए जवाबदेह नहीं हैं और न ही
                            होंगे।
                        </Paragraph>
                        <Paragraph>
                            <strong>
                                (आपकी जानकारी की गोपनीयता बनाए रखी जाएगी)
                            </strong>
                        </Paragraph>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        scrollToFirstError
                    >
                        <div className="form-group">
                            <label className="form-label">
                                Email: <br /> (ईमेल पता)
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="email_address"
                                    rules={[
                                        {
                                            type: "email",
                                            message:
                                                "Please enter a valid email!",
                                        },
                                        {
                                            required: true,
                                            message: "Please input your email!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Email Address" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Name (Full name as per document): <br /> पूरा
                                नाम (दस्तावेज के अनुसार)
                            </label>
                            <div className="form-input name-inputs">
                                <Form.Item
                                    name="full_name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your full name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Full Name" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Age (as per document): <br /> आयु (दस्तावेज के
                                अनुसार)
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="age"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your age!",
                                        },
                                    ]}
                                >
                                    <Input
                                        type="number"
                                        placeholder="Enter Age"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Gender: <br /> (लिंग)
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="gender"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select your gender!",
                                        },
                                    ]}
                                >
                                    <Radio.Group
                                        options={gender}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {gender.map((genderOption) => (
                                            <Radio
                                                key={genderOption.value}
                                                value={genderOption.value}
                                            >
                                                {genderOption.label}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Phone Number: <br /> (फ़ोन नंबर)
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="phone_number"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your contact number!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter Contact Number" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                State: <br /> (राज्य)
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="state"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your state!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter State" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Name of the CCI (Children Home): <br /> (बाल
                                गृह) का नाम
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="cci_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input CCI name!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter CCI Name" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Which year you left CCI? <br /> आपने बाल गृह किस
                                वर्ष छोड़ा?
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="year_left_cci"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input year!",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select Year">
                                        {Array.from(
                                            { length: 30 },
                                            (_, index) => (
                                                <Option
                                                    key={index}
                                                    value={2024 - index}
                                                >
                                                    {2024 - index}
                                                </Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Are you a member of state care leavers network?{" "}
                                <br /> क्या आप राज्य केयर लीवर्स नेटवर्क के
                                सदस्य हैं?
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="is_member_state_network"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select an option!",
                                        },
                                    ]}
                                >
                                    <Radio.Group
                                        options={member}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {member.map((memberOption) => (
                                            <Radio
                                                key={memberOption.value}
                                                value={memberOption.value}
                                            >
                                                {memberOption.label}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                If yes, Name of the state care leavers network:{" "}
                                <br /> राज्य केयर लीवर्स नेटवर्क का नाम
                            </label>
                            <div className="form-input">
                                <Form.Item name="network_name">
                                    <Input placeholder="Enter CCI Name" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Education Status (Completed): <br /> शिक्षा
                                स्थिति (पूर्ण)
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="education_status"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select an option!",
                                        },
                                    ]}
                                >
                                    <Radio.Group
                                        options={educationOptions}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Employment Status: <br /> (रोज़गार की छित)
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="employment_status"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select an option!",
                                        },
                                    ]}
                                >
                                    <Radio.Group
                                        options={employmentOptions}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Tell us about your three strengths (in three
                                words only): <br /> अपने तीन गुण हमें बताएं
                                (केवल तीन शब्दों में)
                            </label>
                            <div className="form-input">
                                <Form.Item
                                    name="strengths"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your strengths!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Enter strengths" />
                                </Form.Item>
                            </div>
                        </div>

                        <Divider />

                        <div style={{ width: "fit-content", margin: "auto" }}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    className="custom-button"
                                    loading={loading}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
            <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                style={buttonStyle}
                onClick={() => navigate("/")}
            >
                Home
            </Button>

            <Footer isAuthenticated={true} />
        </div>
    );
};

export default MembershipForm;
