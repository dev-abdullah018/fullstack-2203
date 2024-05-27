import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ViewProduct = () => {
    let  [catList, setCatList] = useState([])
    let userInfo = useSelector(state => state.user.value)

    useEffect(()=>{
        async function allcat(){
            let response =  await axios.get("http://localhost:8000/api/v1/product/allpro ");

            let catdata = []

            response.data.map((item) =>{
              let details = item.description
              const oembedRegex = /<oembed[^>]*>/g;
              const oembedMatch = details.match(oembedRegex);
              if (oembedMatch) {
                const oembedUrl = oembedMatch[0].match(/url="([^"]*)"/)[1];
                oembedUrl.replace("watch", "embed")
                const iframeElement = `<iframe width="300" height="315" src="https://www.youtube.com/embed/${oembedUrl.split("v=")[1].split("&")[0]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
                details = details.replace(oembedRegex, iframeElement);
              }
                catdata.push({
                    key:item._id,
                    name: item.name,
                    description: details,
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
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          render: (_, record) => (
            <div dangerouslySetInnerHTML={{__html: record.description}}></div>
          ),
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