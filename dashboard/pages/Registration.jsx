import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import ResendEmail from "./ResendEmail";
import { Link } from "react-router-dom";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/registration",
        {
          name: values.username,
          email: values.email,
          password: values.password,
        }
      );
      message.success(response.data.message);
      form.resetFields();
      setEmail(values.email); // Store email for ResendEmailModal
    } catch (error) {
      message.error(error.response.data.error);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleResendModalOpen = () => {
    setShowModal(true);
  };

  const handleResendModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={onReset}>
            Reset
          </Button>
          <Button htmlType="button" style={{ marginLeft: '10px' }} onClick={handleResendModalOpen}>
            Resend
          </Button>
           <Link to="/forgotpass" style={{ marginLeft: '10px' }}>Forgotpass</Link>
        </Form.Item>
      </Form>
      <ResendEmail
        visible={showModal}
        onCancel={handleResendModalClose}
        email={email}
      />
    </>
  );
};

export default Registration;
