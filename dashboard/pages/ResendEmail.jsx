import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import axios from "axios";

const ResendEmail = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleResendEmail = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/resendemail", {
        email: values.email
      });
      message.success(response.data.message);
      form.resetFields(); // Clear email field after successful resend
      onCancel(); // Close the modal after successful resend
    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.error === "Email already verified") {
            message.error("Email is already verified");
          } else {
            message.error(error.response.data.error);
          }
    }
    setLoading(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      closable={false}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="resend" type="primary" loading={loading} onClick={() => form.submit()}>
          Resend Email
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleResendEmail}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResendEmail;
