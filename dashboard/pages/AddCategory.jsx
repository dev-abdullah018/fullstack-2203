import React from 'react'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';


const AddCategory = () => {
  let userInfo = useSelector(state => state.user.value)
    const onFinish = async (values) => {
        console.log('Success:', values);
        let data =  await axios.post("http://localhost:8000/api/v1/product/createcategory",{
            name: values.name
        })
        console.log(data);
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

  return (
    userInfo.role != "User" &&
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
      label="Category Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your category name!',
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
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default AddCategory;
 