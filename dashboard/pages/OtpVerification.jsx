// import React from "react";
// import { Button, Form, Input, Alert, Space } from "antd";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const OtpVerification = () => {
//   let params = useParams()
//   console.log(params.email);

//   const onFinish = async (values) => {
//     console.log("Success:", values.otp);
    
//     let data = await axios.post("http://localhost:8000/api/v1/auth/otpverification",{
//      email: params.email,
//      otp: values.otp
//   })

//    console.log(data);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <Form
//       name="basic"
//       labelCol={{
//         span: 8,
//       }}
//       wrapperCol={{
//         span: 16,
//       }}
//       style={{
//         maxWidth: 600,
//       }}
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item
//         label="Code"
//         name="otp"
//         rules={[
//           {
//             required: true,
//             message: "Please input your otp",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default OtpVerification;



import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const OtpVerification = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      let data = await axios.post("http://localhost:8000/api/v1/auth/otpverification",{
      email: params.email,
      otp: values.otp
     })

     console.log(data);

      setLoading(false);
      setMsg("OTP Matched");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setLoading(false);
      setMsg("OTP Incorrect. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {msg && <Alert message={msg} type={msg === "OTP Matched" ? "success" : "error"} showIcon closable />}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Code"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your otp",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default OtpVerification;
