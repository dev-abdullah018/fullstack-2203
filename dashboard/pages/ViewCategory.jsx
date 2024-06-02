import { Table, Tag, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewCategory = () => {
  const [catList, setCatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  let [refatch, setRefetch] = useState(false)
  let userInfo = useSelector((state) => state.user.value);

  const showModal = (record) => {
    setIsModalOpen(true); 
    setInitialValues([
      {
        name: ["name"],
        value: record.name,
      },
    ]);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
  
    let data =  await axios.post("http://localhost:8000/api/v1/product/editcat",{
      oldname: initialValues[0].value,
      name: values.name
   })

   setRefetch(!refatch)
   setIsModalOpen(false)
};
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function allcat() {
      let data = await axios.get("http://localhost:8000/api/v1/product/allcat");

      let catdata = [];

      data.data.map((item) => {
        catdata.push({
          key: item._id,
          name: item.name,
          status: item.status,
        });
      });

      setCatList(catdata);
    }
    allcat();
  }, [refatch]);

  let handleClick = async (record) => {
    console.log(record);

    let response = await axios.post(
      "http://localhost:8000/api/v1/product/approvecategory",
      {
        id: record.key,
        status: record.status,
      }
    );
    console.log(response);
  };

  let handleDelect = async (id) => {
    let response = await axios.delete(
      `http://localhost:8000/api/v1/product/deletecategory/${id}`
    );
    console.log(response);
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
          {record.status == "waiting" ? (
            <Button
              onClick={() => handleClick(record)}
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Approve
            </Button>
          ) : (
            <Button
              onClick={() => handleClick(record)}
              style={{
                backgroundColor: "#fb6944",
                borderColor: "#fb6944",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Reject
            </Button>
          )}
          <Button
            onClick={() => handleDelect(record.key)}
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
            onClick={()=>showModal(record)}
            style={{
              marginLeft: "10px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Edit
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              name="basic"
              fields={initialValues}
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
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
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
                 Change
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      ),
    },
  ];
  return (
    userInfo.role != "User" && <Table dataSource={catList} columns={columns} />
  );
}

export default ViewCategory;
