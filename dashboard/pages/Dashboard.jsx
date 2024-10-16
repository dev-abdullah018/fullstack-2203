import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Col, Row } from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
 
  let userInfo = useSelector(state => state.user.value)
     console.log(userInfo.role);

  const items = [
    userInfo.role != "User" &&
      getItem('Users', 'sub1', <MailOutlined />, [
        getItem('Add User', '1'),
        getItem('View User', '2'),
      ]),
      userInfo.role != "User" &&
      getItem('Product', 'sub2', <AppstoreOutlined />, [
        getItem('Add Product', '/dashboard/addproduct'),
        getItem('View Product', '/dashboard/viewproduct'),
      ]),
      userInfo.role != "User" &&
      getItem('Category', 'sub3', <SettingOutlined />, [
        getItem('Add Category', '/dashboard/addcategory'),
        getItem('View Category', '/dashboard/viewcategory'),
        getItem('Add SubCategory', '/dashboard/addsubcategory'),
        getItem('View SubCategory', '/dashboard/viewsubcategory'),
      ]),
      userInfo.role != "User" &&
      getItem('Discount', 'sub4', <TagsOutlined />, [
        getItem('Add Discount', '9'),
        getItem('View Discount', '10'),
      ]),

    userInfo.role == "User" &&
    getItem('My Profile', 'sub5', <UserOutlined />, [
      getItem('Purchase', '11'),
      getItem('Profile', '12'),
    ]),
  ];

    const onClick = (e) => {
      console.log('click ', e);
      navigate(e.key)
    }

  return (
    <>
    <Row>
      <Col span={5}>
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
      <Col span={19}>
         <Outlet/>
      </Col>
    </Row>
    </>
  )
}

export default Dashboard
