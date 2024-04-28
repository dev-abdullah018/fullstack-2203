import React, { useEffect, useState } from 'react'
import { Button, Form, Input,  Select, Space } from 'antd';
import axios from 'axios';


const AddSubCategory = () => {
   let  [catList, setCatList] = useState([])
   let [catId,setCatId] = useState("")

    const onFinish = async (values) => {
        console.log('Success:', values);
        let data =  await axios.post("http://localhost:8000/api/v1/product/createsubcategory",{
            name: values.name,
            categoryId: catId,
        })
        console.log(data);
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      useEffect(()=>{
         async function allcat(){
            let data =  await axios.get("http://localhost:8000/api/v1/product/allcat");

            let catdata = []

            data.data.map(item =>{
                catdata.push({
                    value: item._id, 
                    label: item.name,
                })
            })

           setCatList(catdata)
         }

         allcat()
      },[])

      let handleChange = (e)=>{
        setCatId(e);
      }

  return (
    <>
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
      label="SubCategory Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your Subcategory name!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item>
    <Select
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={catList}
    />
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
    </>
  )
}

export default AddSubCategory;
 