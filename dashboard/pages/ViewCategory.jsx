import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ViewCategory = () => {
    let  [catList, setCatList] = useState([])
    let userInfo = useSelector(state => state.user.value)

    useEffect(()=>{
        async function allcat(){
            let data =  await axios.get("http://localhost:8000/api/v1/product/allcat");

            let catdata = []

            data.data.map(item =>{
                catdata.push({
                    key:item._id,
                    name: item.name,
                    status: item.status
                })
            })

           setCatList(catdata)
         }
         allcat()
    },[])
      
      const columns = [
        {
          title: 'Category Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
      ];
  return (
    userInfo.role != "User" &&
    <Table dataSource={catList} columns={columns} />
  )
}

export default ViewCategory;