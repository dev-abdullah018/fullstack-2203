import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from "axios";
import { useParams } from 'react-router-dom';

const NewPassword = () => {
   let parms = useParams()
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
      console.log('Success:', values);
      setLoading(true);
  
      const data = await axios.post(
        "http://localhost:8000/api/v1/auth/newpass",
        {
         password: values.password,
         token: parms.token
        }
      );
      console.log(data);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
  return (
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
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password',
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
      <Button type="primary" htmlType="submit"  loading={loading} disabled={loading}>
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default NewPassword
