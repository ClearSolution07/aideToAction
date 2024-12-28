import React from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Typography,
  Space,
  Divider,
  Row,
  Col,
} from "antd";
import { InstagramOutlined, FacebookOutlined } from "@ant-design/icons";
import { logoImage, rightImage, leftImage } from "../utils/imageUtils";
import ReCAPTCHA from "react-google-recaptcha";
import "./membershipform.css";

const { Title, Paragraph, Link } = Typography;
const { Option } = Select;

const MembershipForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
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
    " Male (पुरुष)",
    "Female (महिला",
    "Others (अन्य)",
    "Prefer not to say (कहना नहीं चाहेंगे)",
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", top: "-10px" }}>
        <img src={rightImage} />
      </div>
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
            Welcome to the Saarthi-Association of Indian Careleavers (AICL)!
          </Paragraph>
        </div>

        <div style={{ textAlign: "justify", marginBottom: "4rem" }}>
          <Paragraph>By joining the Saarthi-AICL,</Paragraph>
          <Paragraph>
            You'll be part of a constantly growing and thriving community of
            care experienced youths across India. This community is of, for and
            by care experienced youths/care leavers.
          </Paragraph>
          <Paragraph>
            Please fill out this online form and join us as a member. If you
            prefer not to disclose any information, you may skip the question or
            even the membership form altogether. However, we encourage you to
            fill out the form and be a part of the Saarthi-AICL network.
          </Paragraph>
          <Paragraph>
            If you have any questions or concerns about the Saarthi-AICL
            membership or the data collection process, please do not hesitate to
            contact us @ 8700190013.
          </Paragraph>
          <Paragraph>
            <Paragraph>
              {" "}
              <strong>Definition</strong>
            </Paragraph>
            The term Care Leavers/care experienced youth is being used for those
            people who have lived at least three years (or less depending on
            their personal circumstances) in any Child Care Institution. Care
            Leavers' Network is a formal or informal group of care leavers at
            National/State/District level irrespective of their
            religion/class/gender/sexual orientation/physical ability/type of
            their institution. The Saarthi-AICL is a nationwide federation of
            state networks of care leavers in India. Its aim is to create a
            common platform for care leavers to connect, utilize opportunities
            of growth, gain referrals for various platforms of support, and
            bring forth your issues at pan India level. This network has been
            formed under a project being implemented in partnership of Aide et
            Action and UNICEF.
          </Paragraph>
          <Paragraph>
            <Paragraph>
              {" "}
              <strong>Disclaimer</strong>
            </Paragraph>
            Please note, the Saarthi-AICL is not a registered or for-profit
            network. There is no financial, legal or statutory obligation on
            either Aide et Action or UNICEF and vice versa. Aide et Action and
            UNICEF are and will not be accountable for any financial, legal, or
            statutory repercussions arising out of any activity or statement
            done or undertaken by members at their individual or group level
            using the network's name.
          </Paragraph>
          <Paragraph>
            Our purpose is solely to provide a platform for strengthening and
            expanding the care leaver community through membership.
          </Paragraph>
          <Paragraph>
            <strong>
              (The confidentiality of the information received will be
              maintained.)
            </strong>
          </Paragraph>
          <Paragraph>
            सारथी-एआईसीएल (Saarthi -AICL) में शामिल होकर, आप भारत भर में देखभाल
            अनुभव वाले युवाओं के एक लगातार बढ़ते और फलते-फूलते समुदाय का हिस्सा
            बन जाएंगे। यह समुदाय देखभाल अनुभव वाले युवाओं/देखभाल छोड़ने वालों का
            है, उनके लिए और उनके द्वारा।
          </Paragraph>
          <Paragraph>
            कृपया इस ऑनलाइन फॉर्म को भरें और सदस्य के रूप में हमसे जुड़ें। यदि
            आप कोई जानकारी प्रकट नहीं करना चाहते हैं, तो आप प्रश्न को छोड़ सकते
            हैं या यहां तक कि सदस्यता फॉर्म को भी छोड़ सकते हैं। हालांकि, हम
            आपको फॉर्म भरने और सारथी-एआईसीएल नेटवर्क का हिस्सा बनने के लिए
            प्रोत्साहित करते हैं। यदि आपके पास सारथी-एआईसीएल (Saarthi - AICL)
            सदस्यता या डेटा संग्रह प्रक्रिया के बारे में कोई प्रश्न या चिंता है,
            तो कृपया हमसे 8700190013 पर संपर्क करने में संकोच न करें।
          </Paragraph>
          <Paragraph>
            <strong> परिभाषा :</strong>
          </Paragraph>
          <Paragraph>
            देखभाल छोड़ने वाले/देखभाल अनुभव वाले युवा उन लोगों के लिए उपयोग किया
            जा रहा है जिन्होंने किसी भी बाल देखभाल संस्थान में कम से कम तीन साल
            (या उनकी व्यक्तिगत परिस्थितियों के आधार पर कम) बिताए हैं।
          </Paragraph>
          <Paragraph>
            देखभाल छोड़ने वालों का नेटवर्क राष्ट्रीय/राज्य/जिला स्तर पर देखभाल
            छोड़ने वालों का एक औपचारिक या अनौपचारिक समूह है, चाहे उनका
            धर्म/वर्ग/लिंग/यौन अभिविन्यास/शारीरिक क्षमता/संस्थान का प्रकार कुछ
            भी हो।
          </Paragraph>
          <Paragraph>
            सारथी-एआईसीएल (Saarthi -AICL) भारत में राज्य नेटवर्कों का एक
            राष्ट्रीय संघ है। इसका उद्देश्य देखभाल छोड़ने वालों को जोड़ने, विकास
            के अवसरों का उपयोग करने, विभिन्न समर्थन प्लेटफार्मों के लिए संदर्भ
            प्राप्त करने और आपके मुद्दों को पैन इंडिया स्तर पर लाने के लिए एक
            सामान्य मंच बनाना है।
          </Paragraph>
          <Paragraph>
            यह नेटवर्क एड एट एक्शन (Aide Et Action)और यूनिसेफ (UNICEF) की
            साझेदारी में लागू की जा रही एक परियोजना के तहत बनाया गया है।
          </Paragraph>
          <Paragraph>
            <strong> अस्वीकरण :</strong>
          </Paragraph>
          <Paragraph>कृपया ध्यान दें,</Paragraph>
          <Paragraph>
            Saarthi -AICL एक पंजीकृत या लाभकारी नेटवर्क नहीं है। एड एट एक्शन
            (Aide Et Action) या यूनिसेफ (UNICEF) पर कोई वित्तीय, कानूनी या
            वैधानिक दायित्व नहीं है और न ही इसके विपरीत। एड एट एक्शन (Aide Et
            Action) और यूनिसेफ (UNICEF) किसी भी वित्तीय, कानूनी या वैधानिक
            परिणामों के लिए जिम्मेदार नहीं होंगे जो सदस्यों द्वारा व्यक्तिगत या
            समूह स्तर पर नेटवर्क के नाम का उपयोग करके किए गए किसी भी गतिविधि या
            बयान से उत्पन्न होते हैं।
          </Paragraph>
          <Paragraph>
            हमारा उद्देश्य केवल सदस्यता के माध्यम से देखभाल छोड़ने वाले समुदाय
            को मजबूत और विस्तारित करने के लिए एक मंच प्रदान करना है
          </Paragraph>
          <Paragraph>
            <strong> (आपकी जानकारी की गोपनीयता बनाए रखी जाएगी)</strong>
          </Paragraph>
          <Paragraph>
            <strong>
              {" "}
              Please follow NCLN on social medial platforms to stay
              updated.😍😍😍
            </strong>
          </Paragraph>
          <Paragraph>
            <strong> Instagram</strong> -
            https://www.instagram.com/ncln_india?igsh=dnJuOT JkN2s0NnRv
          </Paragraph>
          <Paragraph>
            <strong> Facebook</strong> -
            https://www.facebook.com/profile.php?id=61562857873961&mibextid=ZbWKwL
          </Paragraph>{" "}
          <Paragraph>
            <strong> Linkedin</strong> -
            https://www.linkedin.com/company/national-care-leavers-network/
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="fullName"
                label={
                  <>
                    Name (Full name as per document): <br /> पूरा नाम (दावेज क े
                    अनुसार)
                  </>
                }
                required
                style={{ marginBottom: 24 }}
              />
            </Col>
            <Col span={16}>
              <Space
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "6.1rem",
                }}
              >
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                  style={{ marginBottom: 0, flex: 1 }}
                >
                  <Input placeholder="First Name" style={{ width: "130%" }} />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                  style={{ marginBottom: 0, flex: 1 }}
                >
                  <Input placeholder="Last Name" style={{ width: "130%" }} />
                </Form.Item>
              </Space>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Age (as per document): <br /> आयु (दावेज क े अनुसार)
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="age"
                rules={[{ required: true, message: "Please input your age!" }]}
              >
                <Input type="number" placeholder="Enter Age" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Gender:
                    <br /> (िलंग)
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Checkbox.Group
                  options={gender}
                  style={{ display: "flex", flexDirection: "column" }}
                ></Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Phone Number:
                    <br /> (मोबाइल नंबर)
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your contact number!",
                  },
                ]}
              >
                <Input placeholder="Enter Contact Number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Email Address: <br /> (ईमेल पता)
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Enter Email Address" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    State: <br /> (राज्य)
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="state"
                rules={[
                  { required: true, message: "Please input your state!" },
                ]}
              >
                <Input placeholder="Enter State" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Name of the CCI (Children Home): <br /> (बाल गह) का नाम
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="cciName"
                rules={[{ required: true, message: "Please input CCI name!" }]}
              >
                <Input placeholder="Enter CCI Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Which year you left CCI? <br /> आपन बाल गह िकस वष छोड़ा?
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="yearLeftCCI"
                rules={[{ required: true, message: "Please input year!" }]}
              >
                <Select placeholder="Select Year">
                  {Array.from({ length: 30 }, (_, index) => (
                    <Option key={index} value={2024 - index}>
                      {2024 - index}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Are you a member of state care leavers network? <br /> क्या
                    आप राज्य केयर लीवस नेटवर्क सद ह?
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="stateCareLeavers"
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}
              >
                <Checkbox.Group
                  options={member}
                  style={{ display: "flex", flexDirection: "column" }}
                ></Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Education Status (Completed): <br /> शिक्षा स्थिति (पूरा)
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="educationStatus"
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}
              >
                <Checkbox.Group
                  options={educationOptions}
                  style={{ display: "flex", flexDirection: "column" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Employment Status: <br /> (रोज़गार की छित)
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="employmentStatus"
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}
              >
                <Checkbox.Group
                  options={employmentOptions}
                  style={{ display: "flex", flexDirection: "column" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Tell us about your three strengths (in three words only):
                    <br /> अपनी तीन ताकतों के बारे में बताएं (केवल तीन शब्दों
                    में)
                  </>
                }
              />
            </Col>
            <Col span={16}>
              <Form.Item
                name="strengths"
                rules={[
                  { required: true, message: "Please input your strengths!" },
                ]}
              >
                <Input placeholder="Enter strengths" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <div style={{ marginBottom: 24 }}>
            <Paragraph strong>
              Please follow NCG in our social media platforms to stay updated:
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
                <Link href="https://www.facebook.com/nclnindia" target="_blank">
                  /nclnindia
                </Link>
              </Space>
            </Space>
          </div>

          <div style={{ width: "fit-content", margin: "auto" }}>
            <Form.Item>
              
              <Title level={4} style={{ textAlign: "left" }}>
                CAPTCHA
              </Title>

              <div style={{ transform: "scale(1.64)", transformOrigin: "0" , margin:"30px 0 20px 0"}}>
                <ReCAPTCHA
                  sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
                  onChange={onCaptchaChange}
                />
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="custom-button"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div style={{ display: "flex", justifyContent: "start" }}>
        <img src={leftImage} />
      </div>
    </div>
  );
};

export default MembershipForm;
