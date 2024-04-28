import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewSubCategory = () => {
    let  [catList, setCatList] = useState([])

    useEffect(()=>{
        async function allsubcat(){
            let data =  await axios.get("http://localhost:8000/api/v1/product/allsubcat");

            let catdata = []

            data.data.map(item =>{
                catdata.push({
                    key:item._id,
                    name: item.name,
                    status: item.status,
                    categoryId: item.categoryId.name
                })
            })

           setCatList(catdata)
         }
         allsubcat()
    },[])
      
      const columns = [
        {
          title: 'SubCategory Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Category Name',
          dataIndex: 'categoryId',
          key: 'categoryId',
        },
      ];
  return (
    <Table dataSource={catList} columns={columns} />
  )
}

export default ViewSubCategory;