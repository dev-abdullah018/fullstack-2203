import { Table, Button, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ViewProduct = () => {
  const [catList, setCatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [form] = Form.useForm(); // Create form instance
  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/product/allpro');
        const catdata = response.data.map((item) => {
          let details = item.description;

          // Extract YouTube URL and convert to embed iframe
          const oembedRegex = /<oembed[^>]*>/g;
          const oembedMatch = details.match(oembedRegex);
          if (oembedMatch) {
            const oembedUrl = oembedMatch[0].match(/url="([^"]*)"/)[1].replace("watch?v=", "embed/");
            const iframeElement = `<iframe width="200" height="215" src="${oembedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            details = details.replace(oembedRegex, iframeElement);
          }

          return {
            key: item._id,
            name: item.name,
            description: details,
            image: item.image,
          };
        });
        setCatList(catdata);
      } catch (error) {
        message.error('Failed to fetch products');
      }
    }
    fetchProducts();
  }, []);

  const showModal = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setImageFile(null);
    form.resetFields(); // Reset form fields when the modal is closed
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/product/deleteproduct/${id}`);
      setCatList((prevList) => prevList.filter((product) => product.key !== id));
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Error deleting product');
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/product/editproduct/${editingProduct.key}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const updatedProduct = response.data;
      setCatList((prevList) =>
        prevList.map((product) =>
          product.key === updatedProduct._id ? { ...product, ...updatedProduct } : product
        )
      );
      message.success('Product updated successfully');
      handleCancel();
    } catch (error) {
      message.error('Error updating product');
    }
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      onCell: () => ({
        style: {
          textAlign: 'center',
        },
      }),
      render: (_, record) => (
        <div
          style={{ textAlign: 'center' }}
          dangerouslySetInnerHTML={{ __html: record.description }}
        />
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <img width={50} height={50} src={`http://localhost:8000${record.image}`} alt={record.name} />
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    userInfo.role !== 'User' && (
      <>
        <Table dataSource={catList} columns={columns} />
        <Modal
          title="Edit Product"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input the product name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input the product description!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Image">
              <Upload
                beforeUpload={(file) => {
                  setImageFile(file);
                  return false; // Prevent automatic upload
                }}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  );
};

export default ViewProduct;
