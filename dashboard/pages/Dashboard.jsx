import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined, TagsOutlined } from '@ant-design/icons';
import { Menu, Col, Row } from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';

const Dashboard = () => {
  let navigate = useNavigate();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('Users', 'sub1', <MailOutlined />, [
      getItem('Add User', '1'),
      getItem('View User', '2'),
    ]),
    getItem('Product', 'sub2', <AppstoreOutlined />, [
      getItem('Add Product', '3'),
      getItem('View Product', '4'),
    ]),
    getItem('Category', 'sub3', <SettingOutlined />, [
      getItem('Add Category', '/dashboard/addcategory'),
      getItem('View Category', '6'),
      getItem('Add SubCategory', '7'),
      getItem('View SubCategory', '8'),
    ]),
    getItem('Discount', 'sub4', <TagsOutlined />, [
      getItem('Add Discount', '9'),
      getItem('View Discount', '10'),
    ]),
  ];

    const onClick = (e) => {
      console.log('click ', e);
      navigate(e.key)
    }

  return (
    <>
    <Row>
      <Col span={7}>
      <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
      </Col>
      <Col span={17}>
         <Outlet/>
      </Col>
    </Row>
    </>
  )
}

export default Dashboard
