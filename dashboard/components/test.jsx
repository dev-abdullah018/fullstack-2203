// import React, { useState } from 'react';
// import { Button, Form, Input,Alert, Space } from 'antd';
// import axios from "axios"
// import {useNavigate} from "react-router-dom"

// const Registration = () => {
//   let [loading, setLoading] = useState(false)
//   let [msg, setMsg] = useState()
//   let navigate = useNavigate()


// const onFinish = async (values) => {
//   console.log('Success:', values);
//    setLoading(true)  

//  let data = await axios.post("http://localhost:8000/api/v1/auth/registration",{
//      name: values.username,
//      email: values.email,
//      password: values.password
//   },
//   // {
//   //   headers: {
//   //     Authorization : "9&hH;5D139,"
//   //   }
//   // }
//   )

//   console.log(data)
//   setLoading(false)
//   setMsg("Registration Successfull. Please check your email!")
//   // setTimeout(()=>{
//   //   navigate(`/otpverification/${values.email}`)
//   // },1500)
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };


//   return (
//     <>
//       {msg && <Alert message={msg} type="success" showIcon closable />}

//     <Form
//     name="basic"
//     labelCol={{
//       span: 8,
//     }}
//     wrapperCol={{
//       span: 16,
//     }}
//     style={{
//       maxWidth: 600,
//     }}
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your username!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Email"
//       name="email"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your email',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your password!',
//         },
//       ]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
//       <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
//     </>
//   )
// }

// export default Registration;

///////////////////////////////////////////note

// import React, { useState } from 'react';
// import { Button, Form, Input,message } from 'antd';
// import axios from "axios";


// const Registration = () => {
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:8000/api/v1/auth/registration", {
//         name: values.username,
//         email: values.email,
//         password: values.password
//       });

//       message.success(response.data.message);
//     } catch (error) {
//       message.error(error.response.data.error);
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <Form
//         name="basic"
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         style={{ maxWidth: 600 }}
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//         autoComplete="off"
//       >
        // <Form.Item
        //   label="Username"
        //   name="username"
        //   rules={[{ required: true, message: 'Please input your username!' }]}
        // >
        //   <Input />
        // </Form.Item>

        // <Form.Item
        //   label="Email"
        //   name="email"
        //   rules={[{ required: true, message: 'Please input your email' }]}
        // >
        //   <Input />
        // </Form.Item>

        // <Form.Item
        //   label="Password"
        //   name="password"
        //   rules={[{ required: true, message: 'Please input your password!' }]}
        // >
        //   <Input.Password />
        // </Form.Item>

//         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//           <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default Registration;





import { Table, Tag, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewCategory = () => {
  const [catList, setCatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  let userInfo = useSelector((state) => state.user.value);

  const showModal = (record) => {
    setEditingCategory(record);
    form.setFieldsValue({ name: record.name });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/product/editcat", {
        id: editingCategory.key,
        name: values.name,
      });
      console.log(response);
      // Update the category list after editing
      const updatedCatList = catList.map((cat) =>
        cat.key === editingCategory.key ? { ...cat, name: values.name } : cat
      );
      setCatList(updatedCatList);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/product/allcat");
        const formattedData = data.map((item) => ({
          key: item._id,
          name: item.name,
          status: item.status,
        }));
        setCatList(formattedData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleClick = async (record) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/approvecategory",
        {
          id: record.key,
          status: record.status === "waiting" ? "approve" : "reject",
        }
      );
      console.log(response);
      // Update the category status in the UI
      const updatedCatList = catList.map((cat) =>
        cat.key === record.key ? { ...cat, status: response.data.status } : cat
      );
      setCatList(updatedCatList);
    } catch (error) {
      console.error("Failed to approve/reject category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/product/deletecategory/${id}`
      );
      console.log(response);
      // Remove the category from the list
      setCatList(catList.filter((cat) => cat.key !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "waiting"
              ? "orange"
              : status === "approve"
              ? "green"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleClick(record)}
            style={{
              backgroundColor: record.status === "waiting" ? "#52c41a" : "#fb6944",
              borderColor: record.status === "waiting" ? "#52c41a" : "#fb6944",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {record.status === "waiting" ? "Approve" : "Reject"}
          </Button>
          <Button
            onClick={() => handleDelete(record.key)}
            style={{
              marginLeft: "10px",
              backgroundColor: "#d14249",
              borderColor: "#d14249",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() => showModal(record)}
            style={{
              marginLeft: "10px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    userInfo.role !== "User" && (
      <>
        <Table dataSource={catList} columns={columns} />
        <Modal
          title="Edit Category"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            name="edit_category"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={editingCategory ? { name: editingCategory.name } : {}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the category name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Change
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  );
};

export default ViewCategory;
