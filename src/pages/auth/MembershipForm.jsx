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
            year_left_cci: values.year_left_cci,
            is_member_state_network:
                values.is_member_state_network === "Yes (हाँ)"
                    ? true
                    : values.is_member_state_network === "No (नहीं)"
                    ? false
                    : values.is_member_state_network,
            education_status:
                values.education_status === "Primary School (प्राथमिक विद्यालय)"
                    ? "Primary School"
                    : values.education_status ===
                      "Secondary School (माध्यमिक विद्यालय)"
                    ? "Seconday School"
                    : values.education_status === "High School (हाई स्कूल)"
                    ? "High School"
                    : values.education_status === "Undergraduate (स्नातक)"
                    ? "Undergraduate"
                    : values.education_status === "Postgraduate (स्नातकोत्तर)"
                    ? "Postgraduate"
                    : values.education_status ===
                      "Professional Course (पेशेवर पाठ्यक्रम)"
                    ? "Professional Course"
                    : "Others",
            employment_status:
                values.employment_status === "Employed (नियोजित)"
                    ? "Employed"
                    : values.employment_status === "Unemployed (बेरोज़गार)"
                    ? "Unemployed"
                    : values.employment_status === "Self Employed (स्व-नियोजित)"
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
        "Primary School (प्राथमिक विद्यालय)",
        "Secondary School (माध्यमिक विद्यालय)",
        "High School (हाई स्कूल)",
        "Undergraduate (स्नातक)",
        "Postgraduate (स्नातकोत्तर)",
        "Professional Course (पेशेवर पाठ्यक्रम)",
        "Others (अन्य)",
    ];

    const employmentOptions = [
        "Employed (नियोजित)",
        "Unemployed (बेरोजगार)",
        "Self Employed (स्व-नियोजित)",
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
                        <Title level={2}>
                            Saarthi : Care Leavers Network: Membership Form
                        </Title>
                        <Paragraph>
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
                            Please fill out this online form and join us as a
                            member. If you prefer not to disclose any
                            information, you may skip the question or even the
                            membership form altogether. However, we encourage
                            you to fill out the form and be a part of the
                            Saarthi-AICL network.
                        </Paragraph>
                        <Paragraph>
                            If you have any questions or concerns about the
                            Saarthi-AICL membership or the data collection
                            process, please do not hesitate to contact us @
                            8700190013.
                        </Paragraph>
                        <Paragraph>
                            <strong>Definition</strong>
                        </Paragraph>
                        <Paragraph>
                            The term Care Leavers/care experienced youth is
                            being used for those people who have lived at least
                            three years (or less depending on their personal
                            circumstances) in any Child Care Institution. Care
                            Leavers' Network is a formal or informal group of
                            care leavers at National/State/District level
                            irrespective of their religion/class/gender/sexual
                            orientation/physical ability/type of their
                            institution. The Saarthi-AICL is a nationwide
                            federation of state networks of care leavers in
                            India. Its aim is to create a common platform for
                            care leavers to connect, utilize opportunities of
                            growth, gain referrals for various platforms of
                            support, and bring forth your issues at pan India
                            level. This network has been formed under a project
                            being implemented in partnership of Aide et Action
                            and UNICEF.
                        </Paragraph>
                        <Paragraph>
                            <strong>Disclaimer</strong>
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
                            Our purpose is solely to provide a platform for
                            strengthening and expanding the care leaver
                            community through membership.
                        </Paragraph>
                        <Paragraph>
                            <strong>
                                (The confidentiality of the information received
                                will be maintained.)
                            </strong>
                        </Paragraph>
                        <Paragraph>
                            सारथी-एआईसीएल (Saarthi -AICL) में शामिल होकर, आप
                            भारत भर में देखभाल अनुभव वाले युवाओं के एक लगातार
                            बढ़ते और फलते-फूलते समुदाय का हिस्सा बन जाएंगे। यह
                            समुदाय देखभाल अनुभव वाले युवाओं/देखभाल छोड़ने वालों
                            का है, उनके लिए और उनके द्वारा।
                        </Paragraph>
                        <Paragraph>
                            कृपया इस ऑनलाइन फॉर्म को भरें और सदस्य के रूप में
                            हमसे जुड़ें। यदि आप कोई जानकारी प्रकट नहीं करना
                            चाहते हैं, तो आप प्रश्न को छोड़ सकते हैं या यहां तक
                            कि सदस्यता फॉर्म को भी छोड़ सकते हैं। हालांकि, हम
                            आपको फॉर्म भरने और सारथी-एआईसीएल नेटवर्क का हिस्सा
                            बनने के लिए प्रोत्साहित करते हैं। यदि आपके पास
                            सारथी-एआईसीएल (Saarthi - AICL) सदस्यता या डेटा
                            संग्रह प्रक्रिया के बारे में कोई प्रश्न या चिंता है,
                            तो कृपया हमसे 8700190013 पर संपर्क करने में संकोच न
                            करें।
                        </Paragraph>
                        <Paragraph>
                            <strong>परिभाषा :</strong>
                        </Paragraph>
                        <Paragraph>
                            देखभाल छोड़ने वाले/देखभाल अनुभव वाले युवा उन लोगों
                            के लिए उपयोग किया जा रहा है जिन्होंने किसी भी बाल
                            देखभाल संस्थान में कम से कम तीन साल (या उनकी
                            व्यक्तिगत परिस्थितियों के आधार पर कम) बिताए हैं।
                        </Paragraph>
                        <Paragraph>
                            देखभाल छोड़ने वालों का नेटवर्क राष्ट्रीय/राज्य/जिला
                            स्तर पर देखभाल छोड़ने वालों का एक औपचारिक या
                            अनौपचारिक समूह है, चाहे उनका धर्म/वर्ग/लिंग/यौन
                            अभिविन्यास/शारीरिक क्षमता/संस्थान का प्रकार कुछ भी
                            हो।
                        </Paragraph>
                        <Paragraph>
                            सारथी-एआईसीएल (Saarthi -AICL) भारत में राज्य
                            नेटवर्कों का एक राष्ट्रीय संघ है। इसका उद्देश्य
                            देखभाल छोड़ने वालों को जोड़ने, विकास के अवसरों का
                            उपयोग करने, विभिन्न समर्थन प्लेटफार्मों के लिए
                            संदर्भ प्राप्त करने और आपके मुद्दों को पैन इंडिया
                            स्तर पर लाने के लिए एक सामान्य मंच बनाना है।
                        </Paragraph>
                        <Paragraph>
                            यह नेटवर्क एड एट एक्शन (Aide Et Action)और यूनिसेफ
                            (UNICEF) की साझेदारी में लागू की जा रही एक परियोजना
                            के तहत बनाया गया है।
                        </Paragraph>
                        <Paragraph>
                            <strong>अस्वीकरण :</strong>
                        </Paragraph>
                        <Paragraph>कृपया ध्यान दें,</Paragraph>
                        <Paragraph>
                            Saarthi -AICL एक पंजीकृत या लाभकारी नेटवर्क नहीं है।
                            एड एट एक्शन (Aide Et Action) या यूनिसेफ (UNICEF) पर
                            कोई वित्तीय, कानूनी या वैधानिक दायित्व नहीं है और न
                            ही इसके विपरीत। एड एट एक्शन (Aide Et Action) और
                            यूनिसेफ (UNICEF) किसी भी वित्तीय, कानूनी या वैधानिक
                            परिणामों के लिए जिम्मेदार नहीं होंगे जो सदस्यों
                            द्वारा व्यक्तिगत या समूह स्तर पर नेटवर्क के नाम का
                            उपयोग करके किए गए किसी भी गतिविधि या बयान से उत्पन्न
                            होते हैं।
                        </Paragraph>
                        <Paragraph>
                            हमारा उद्देश्य केवल सदस्यता के माध्यम से देखभाल
                            छोड़ने वाले समुदाय को मजबूत और विस्तारित करने के लिए
                            एक मंच प्रदान करना है
                        </Paragraph>
                        <Paragraph>
                            <strong>
                                (आपकी जानकारी की गोपनीयता बनाए रखी जाएगी)
                            </strong>
                        </Paragraph>
                        <Paragraph>
                            <strong>
                                Please follow NCLN on social medial platforms to
                                stay updated.😍😍😍
                            </strong>
                        </Paragraph>
                        <Paragraph>
                            <strong>Instagram</strong> -
                            https://www.instagram.com/ncln_india?igsh=dnJuOT
                            JkN2s0NnRv
                        </Paragraph>
                        <Paragraph>
                            <strong>Facebook</strong> -
                            https://www.facebook.com/profile.php?id=61562857873961&mibextid=ZbWKwL
                        </Paragraph>
                        <Paragraph>
                            <strong>Linkedin</strong> -
                            https://www.linkedin.com/company/national-care-leavers-network/
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
                                Name (Full name as per document): <br /> पूरा
                                नाम (दावेज क े अनुसार)
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
                                Age (as per document): <br /> आयु (दावेज क े
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
                                Gender: <br /> (िलंग)
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
                                Phone Number: <br /> (मोबाइल नंबर)
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
                                Email Address: <br /> (ईमेल पता)
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
                                Name of the CCI (Children Home): <br /> (बाल गह)
                                का नाम
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
                                Which year you left CCI? <br /> आपन बाल गह िकस
                                वष छोड़ा?
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
                                <br /> क्या आप राज्य केयर लीवस नेटवर्क सदस्य
                                हैं?
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
                                Education Status (Completed): <br /> शिक्षा
                                स्थिति (पूरा)
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
                                words only): <br /> अपनी तीन ताकतों के बारे में
                                बताएं (केवल तीन शब्दों में)
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

                        <div style={{ marginBottom: 24 }}>
                            <Paragraph strong>
                                Please follow NCG in our social media platforms
                                to stay updated:
                            </Paragraph>
                            <Space direction="vertical">
                                <Space>
                                    <InstagramOutlined />
                                    <Link
                                        href="https://www.instagram.com/ncln_india"
                                        target="_blank"
                                    >
                                        @ncln_india
                                    </Link>
                                </Space>
                                <Space>
                                    <FacebookOutlined />
                                    <Link
                                        href="https://www.facebook.com/nclnindia"
                                        target="_blank"
                                    >
                                        /nclnindia
                                    </Link>
                                </Space>
                            </Space>
                        </div>

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
