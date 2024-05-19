import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ViewProduct = () => {
    let  [catList, setCatList] = useState([])
    let userInfo = useSelector(state => state.user.value)

    useEffect(()=>{
        async function allcat(){
            let data =  await axios.get("http://localhost:8000/api/v1/product/allpro ");

            let catdata = []

            data.data.map(item =>{
                catdata.push({
                    key:item._id,
                    name: item.name,
                    image: item.image
                })
            })

           setCatList(catdata)
         }
         allcat()
    },[])
      
      const columns = [
        {
          title: 'Product Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (_, record) => <img width={50} height={50} src={`http://localhost:8000${record.image}`}/>
        },
      ];
  return (
    userInfo.role != "User" &&
    <Table dataSource={catList} columns={columns} />
  )
}

export default ViewProduct;