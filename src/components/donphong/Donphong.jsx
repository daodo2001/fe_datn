import React, { useEffect, useState } from "react";
import "./donphong.css";
import { Table, Tag, Button } from "antd";
import api from '../../services/api'
import TokenService from "../../services/token.service";
import Chitietdonphong from './Chitietdonphong';
import authService from "../../services/auth.service";
function Donphong() {

  const [bookingOrder, setBookingOrder] = useState([])
  const userAuthen = TokenService.getUser();
  const [donPhong, setDonPhong] = useState({})

  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal(item) {
    setDonPhong(item)
    setIsModalVisible(true)
  }
  function handleOk() {
    setIsModalVisible(false)
  }
  function handleCancel() {
    setIsModalVisible(false)
  }

  useEffect(() => {
    var config = {
      method: 'get',
      url: '/user/thong-tin-dat-phong',
      params: {
        id: userAuthen && userAuthen.id
      },
    };
    api(config).then(res => {
      setBookingOrder(res.data.data)
    }).catch(err => {
      if (err.response && err.response.status === 403) {
        authService.logout()
      }
    })
  }, [])

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => index + 1
    },
    {
      title: "Cơ sở",
      dataIndex: "nameHotel",
      key: 1,
      render: nameHotel => {
        let color = "";
        if (nameHotel === "Cơ sở 1") {
          color = 'geekblue'
        } else if (nameHotel === "Cơ sở 2") {
          color = 'green'
        }
        else if (nameHotel === "Cơ sở 3") {
          color = 'red'
        }
        else if (nameHotel === "Cơ sở 4") {
          color = 'cyan'
        } else {
          color = 'purple'
        }
        return (
          <Tag color={color} key={nameHotel}>
            {nameHotel !== null ? nameHotel.toUpperCase() : ""}
          </Tag>
        )
      }
    },
    {
      title: "Loại Phòng",
      dataIndex: "nameTypeRoom",
      key: 2,
    },
    {
      title: "Ngày đến",
      dataIndex: "dateIn",
      key: 3,
      defaultSortOrder: "descend",

    },
    {
      title: "Ngày về",
      dataIndex: "dateOut",
      key: 4,
      defaultSortOrder: "descend",

    },
    {
      title: "Thanh toán",
      dataIndex: "price",
      key: 5,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: 6,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Tổng số phòng",
      dataIndex: "totalRoom",
      key: 7,
    },

    {
      title: "Action",
      key: 7,
      render: (record) => {
        return (
          <Button onClick={() => showModal(record)} type="primary">Chi Tiết Hóa Đơn</Button>
        )
      }
    },
  ];


  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (

    <>
      <Chitietdonphong
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        setIsModalVisible={setIsModalVisible}
        donPhong={donPhong}
      />
      <Table columns={columns} dataSource={bookingOrder.reverse()} onChange={onChange} />;
    </>
  );



}
export default Donphong;
