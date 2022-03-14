
import { Table, Row, Col, Form, Input, Select, Button, notification, Popover, Modal, Image } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../../services/api'
import TokenService from "../../../services/token.service";
import Huyphong from './Huyphong';
import GiaHanPhong from './GiaHanPhong';
import Doilich from './Doilich';
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import ChiTietHoaDon from "./ChiTietHoaDon";
import moment from 'moment';

const { Option } = Select;
const CHECK_IN = "Đã nhận phòng"
const CHECK_OUT = "Đã trả phòng"
const DEPOSITED = "Đã đặt cọc"
const CANCELROOM = "Đã hủy phòng"
const bookingOffline = "Khách đặt offline"
function Dondat(props) {

  /** */

  const [isModalVisibleHuyPhong, setIsModalVisibleHuyPhong] = useState(false);
  const [huyPhong, setHuyPhong] = useState({})
  const [doiLich, setDoiLich] = useState({})
  const [giaHanPhong, setGiaHanPhong] = useState({})
  const [nameHotel, setNameHotel] = useState("")
  const { id } = TokenService.getUser();
  const [donDats, setDonDats] = useState([])
  const [filters, setFilters] = useState({
    status: props.status === "" ? DEPOSITED : props.status
  })
  const typingTimeoutref = useRef(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const getNameHotel = () => {
      const config = {
        method: "get",
        url: "/staff/staff-by-hotel",
        params: {
          idUser: id,
        }
      }
      api(config).then(res => {
        setNameHotel(res.data.data.nameHotel);
      }).catch(err => {
        console.log(err);
      })
    }
    getNameHotel();
  }, [id])

  function showModalHuyPhong(record) {
    setHuyPhong(record)
    setIsModalVisibleHuyPhong(true)
  }

  function handleCancelHuyPhong() {
    setIsModalVisibleHuyPhong(false)
  }

  /** */
  const [isModalVisible, setIsModalVisible] = useState(false);

  function showModal(record) {
    setGiaHanPhong(record)
    setIsModalVisible(true)
  }
  function handleOk() {
    setIsModalVisible(false)
  }
  function handleCancel() {
    setIsModalVisible(false)
  }
  /***/
  const [isModalVisibleDL, setIsModalVisibleDL] = useState(false);

  function showModalDL(record) {
    setDoiLich(record)
    setIsModalVisibleDL(true)
  }
  function handleOkDL() {
    setIsModalVisibleDL(false)
  }
  function handleCancelDL() {
    setIsModalVisibleDL(false)
  }

  /***/
  useEffect(() => {
    const getOrderBookings = () => {
      const config = {
        method: "get",
        url: "/staff/booking-order",
        params: {
          idUser: id,
          status: filters.status
        }
      }
      api(config).then(res => {
        setDonDats(res.data.data)
      }).catch(err => {
        setDonDats([])
      })
    }
    getOrderBookings();
  }, [filters, id])

  const onSearch = (event) => {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;

    if (typingTimeoutref.current) {
      clearTimeout(typingTimeoutref.current);
    }

    typingTimeoutref.current = setTimeout(() => {
      setKeyword(value);
    }, 300);
  };

  var newDonDats = null;
  if (Array.isArray(donDats)) {
    newDonDats = [...donDats];
  }
  if (keyword) {
    newDonDats = newDonDats.filter((item) => {
      return (
        item.maGd.toLowerCase().indexOf(keyword.toLowerCase()) !==
        -1
      );
    });
  }

  const [formData, setFormData] = useState({
    idBooking: 0,
    status: "",
    totalPrice: 0,
    id_creator: id
  })

  const [orderDetails, setOrderDetails] = useState({})

  const confirmBooking = (record) => {
    const { idBooking, status, totalPrice } = record
    setFormData({
      ...formData,
      idBooking, status, totalPrice: totalPrice
    })
    if (status === CHECK_IN) {
      showModalChiTietHoaDon()
      setOrderDetails(record)
      // xacNhanTraPhong(record)
    }
    else {
      setIsModalVisibleCamera(true);
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Mã đơn đặt',
      dataIndex: 'maGd',
      key: '1',

    },
    {
      title: 'Họ Và Tên',
      dataIndex: 'fullName',
      key: '2',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: '3',
    },
    {
      title: 'Ngày nhận phòng',
      dataIndex: 'dateIn',
      key: '4',
      render: (dateIn, record, index) => {
        const newDateIn = dateIn.split("/").reverse().join("-")
        const date = new Date(newDateIn)

        let days = moment().diff(moment(date), 'days');
        if (days > 1) {
          return (
            <span style={{ color: "red" }} >{dateIn}</span>
          )
        } else {
          return dateIn
        }

      }
    },
    {
      title: 'Ngày trả phòng',
      dataIndex: 'dateOut',
      key: '5',
    },
    {
      title: 'Loại phòng',
      dataIndex: 'nameTypeRoom',
      key: '6',
    },
    {
      title: 'Tổng số phòng',
      dataIndex: 'totalRoom',
      key: '7',
    },
    {
      title: 'Trạng thái',
      key: '8',
      dataIndex: 'status',
    },
    {
      title: 'Lý do hủy',
      key: '9',
      dataIndex: 'reason',
      render: (reason, record, index) => {
        return (
          <Popover
            placement="leftTop"
            title={<b>Chi tiết lý do hủy phòng</b>}
            content={() => (
              <div>
                <p>Lý do : <b>{reason}</b></p>
              </div>
            )}
            trigger="hover"
          >
            <a href="#!">Chi tiết lý do</a>
          </Popover>
        )
      },
      hidden: filters.status === DEPOSITED || filters.status === CHECK_IN || filters.status === CHECK_OUT
    },

    {
      title: 'Chi tiết đơn đặt',
      key: '10',
      dataIndex: 'status',
      render: (status, record, index) => {

        if (record.noiDungCk === bookingOffline && (record.status === CHECK_IN || record.status === DEPOSITED)) {
          return <Popover
            placement="topLeft"
            title={`Chi tiết đơn đặt`}
            content={() => (
              <div>
                <p>Ngày nhận phòng : {record.createDate}</p>
                <p>Ngày đến : {record.dateIn} VND</p>
                <p>Ngày đi : {record.dateOut} VND</p>
                <p><b>{record.noiDungCk}</b></p>
                {filters.status === CHECK_IN && <p>Cmnd :
                  <Image width={200} src={record.imageCmnd} />
                </p>}
              </div>
            )}
            trigger="hover"
          >
            <span
              style={{
                "color": "#1890ff", "textDecoration": "none",
                "backgroundColor": "transparent", "outline": "none", "cursor": "pointer", "transition": "color 0.3s"
              }}>
              Chi tiết đơn đặt
            </span>
          </Popover>
        }

        if (status === DEPOSITED || status === CHECK_IN) {
          return <Popover
            placement="topLeft"
            title={`Chi tiết đơn đặt`}
            content={() => (
              <div>
                <p>Ngày chuyển khoản : {record.createDate}</p>
                <p>Số tiền phải trả : {record.totalPrice} VND</p>
                <p>Số tiền đã cọc : {record.depositPrice} VND</p>
                <p>Nội dung chuyển khoản : {record.noiDungCk}</p>
                {filters.status === CHECK_IN && <p>Cmnd :
                  <Image width={200} src={record.imageCmnd} />
                </p>}
              </div>
            )}
            trigger="hover"
          >
            <span
              style={{
                "color": "#1890ff", "textDecoration": "none",
                "backgroundColor": "transparent", "outline": "none", "cursor": "pointer", "transition": "color 0.3s"
              }}>
              Chi tiết đơn đặt
            </span>
          </Popover>
        } else if (status === CHECK_OUT) {
          return <Link to={`/admin/print-bill/${record.idBooking}`} >
            Chi tiết hóa đơn
          </Link>
        }

      },
      hidden: filters.status === CANCELROOM
    },

    {
      title: 'Hành động',
      key: '11',
      render: (record, index) => {
        const { status } = record;
        const textBtn = status === "Đã đặt cọc" ? "Nhận phòng" : "Trả phòng"
        const hiddenBtnDoiLich = filters.status === CHECK_IN || filters.status === CHECK_OUT
        const hiddenBtnHuyPhong = filters.status === CHECK_IN || filters.status === CHECK_OUT
        const checkDaDoiLich = record.checkUpdateBooking

        const newDateIn = record.dateIn.split("/").reverse().join("-")
        const date = new Date(newDateIn)

        let days = moment().diff(moment(date), 'days');
        var checkQuaHan = false;
        if (days > 1) {
          checkQuaHan = true
        }


        return (
          <>
            {/* <Popconfirm placement="right" title={textBtn} onConfirm={() => confirmBooking(record)} okText="Xác nhận" cancelText="Hủy">
              <Button onClick={() => confirmBooking(record)} ghost type="primary" style={{ marginBottom: '2px', borderColor: 'green', color: "green", width: '126px' }} >
                {textBtn}
              </Button>
            </Popconfirm> */}
            <Button
              hidden={checkQuaHan && textBtn === "Đã đặt cọc"}
              onClick={() => confirmBooking(record)}
              ghost type="primary"
              style={{ marginBottom: '2px', borderColor: 'green', color: "green", width: '126px' }} >
              {textBtn}
            </Button>
            {!hiddenBtnHuyPhong && <br />}
            <Button ghost hidden={hiddenBtnHuyPhong} onClick={() => showModalHuyPhong(record)} type="danger"
              style={{ marginBottom: '2px', width: '126px' }} >
              Hủy phòng
            </Button>
            <br />
            <Button
              ghost
              onClick={(() => showModalDL(record))}
              hidden={hiddenBtnDoiLich || checkDaDoiLich || checkQuaHan}
              type="primary"
              style={{ marginBottom: '2px', width: '126px' }} >
              Đổi lịch
            </Button>
            <br />
            <Button ghost hidden={filters.status === DEPOSITED} type="primary" onClick={() => showModal(record)} style={{ marginBottom: '2px', width: '126px' }} >
              Gia hạn phòng
            </Button>
          </>
        )
      },
      hidden: filters.status === CHECK_OUT || filters.status === CANCELROOM
    },

  ].filter(item => !item.hidden);

  const [componentSize] = useState('default');
  const [form] = Form.useForm();

  const [isModalVisibleCamera, setIsModalVisibleCamera] = useState(false);
  const [isModalVisibleImageFromCamera, setIsModalVisibleImageFromCamera] = useState(false);
  const [imageDataUri, setImageDataUri] = useState();
  const handleTakePhoto = (dataUri) => {

    setImageDataUri(dataUri)
    setIsModalVisibleImageFromCamera(true)
    setFormData({
      ...formData, imageCmnd: dataUri
    })

  }

  const xacNhanDatPhong = () => {
    const config = {
      method: "post",
      url: "/staff/confirm-booking",
      data: formData,
    };
    setIsModalVisibleCamera(false)
    setIsModalVisibleImageFromCamera(false)
    api(config).then(res => {
      setFilters({ ...filters, status: res.data.data.status })
      const indexToDonDat = donDats.findIndex(
        (donDat) => donDat.idBooking === formData.idBooking
      );
      const updatedDonDats = [...donDats]; // creates a copy of the array

      updatedDonDats[indexToDonDat].status =
        res.data.data.status
      setDonDats(updatedDonDats);
      notification["success"]({
        message: res.data.message,
      });
    }).catch(err => {
      console.log(err);
    })
  }

  const [isModalVisibleBill, setModalVisibleBill] = useState(false)
  const showModalChiTietHoaDon = () => {
    setModalVisibleBill(true)
  }
  return (
    <div >
      {isModalVisibleCamera && <Modal
        title="Máy ảnh!"
        visible={isModalVisibleCamera}
        onCancel={() => setIsModalVisibleCamera(false)}
        okButtonProps={{ style: { display: 'none' } }}
        width={820}
      >
        <Camera
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          isFullScreen={true}
          isMaxResolution={true}
          sizeFactor={1}
          onTakePhoto={(dataURI) => handleTakePhoto(dataURI)}
        />
      </Modal>}
      {isModalVisibleImageFromCamera && <Modal
        title="Ảnh chụp CCCD/CMTND của bạn!"
        visible={isModalVisibleImageFromCamera}
        okText="Xác nhận"
        cancelText="Hủy"
        onOk={xacNhanDatPhong}
        onCancel={() => setIsModalVisibleImageFromCamera(false)}
        closeIcon={handleCancel}
        width={400}
      >
        <Image
          width={350}
          src={imageDataUri}
        />
      </Modal>}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dondat">Nhân viên</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Quản lý đơn đặt
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Danh sách đơn đặt
          </li>
        </ol>
      </nav>
      <hr />
      <h3 className="text-center mb-2 mt-2">
        Đơn đặt {nameHotel && nameHotel.toUpperCase()}
      </h3>
      <hr />
      <div>

        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
            prefix: '84',
          }}
          form={form}
          // onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col span={16} key={1}>
              <Form.Item label="Tìm kiếm" name="idBooking"
              >
                <Input onChange={onSearch} value={keyword} placeholder="Nhập mã giao dịch" />
              </Form.Item>
            </Col>
            <Col span={8} key={2}>
              <Form.Item label="Trạng thái đơn đặt">
                <Select placeholder="Trạng thái đơn đặt"
                  value={filters.status}
                  onChange={(val) => {
                    if (filters.status !== val) {
                      setFilters({ ...filters, status: val });
                    }
                  }}>
                  <Option value={DEPOSITED}>Đã đặt cọc</Option>
                  <Option value={CHECK_IN}>Đã nhận phòng</Option>
                  <Option value={CHECK_OUT}>Đã trả phòng</Option>
                  <Option value={CANCELROOM}>Đã hủy phòng</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Table columns={columns} dataSource={newDonDats.reverse().map((item, index) => ({ key: index, ...item }))} />
        {isModalVisible && <GiaHanPhong
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          setIsModalVisible={setIsModalVisible}
          giaHanPhong={giaHanPhong}
          donDats={donDats}
          setDonDats={setDonDats}
        />}
        {isModalVisibleHuyPhong && <Huyphong
          huyPhong={huyPhong}
          setFilters={setFilters}
          isModalVisibleHuyPhong={isModalVisibleHuyPhong}
          handleCancelHuyPhong={handleCancelHuyPhong}
          setIsModalVisibleHuyPhong={setIsModalVisibleHuyPhong}
        />}
        {isModalVisibleDL && <Doilich
          donDats={donDats}
          setDonDats={setDonDats}
          doiLich={doiLich}
          isModalVisibleDL={isModalVisibleDL}
          handleOkDL={handleOkDL}
          handleCancelDL={handleCancelDL}
          setIsModalVisibleDL={setIsModalVisibleDL}
        />}
        {isModalVisibleBill && <ChiTietHoaDon
          isModalVisibleBill={isModalVisibleBill}
          setModalVisibleBill={setModalVisibleBill}
          orderDetails={orderDetails}
          donDats={donDats}
          setDonDats={setDonDats}
          filters={filters}
          setFilters={setFilters}
        />}
      </div>
    </div>
  );
}

export default Dondat;