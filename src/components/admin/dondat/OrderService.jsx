import {
  Button,
  Form,
  Col,
  Input,
  Table,
  Select,
  Row,
  Modal,
  Checkbox,
  InputNumber,
  notification,
} from "antd";
import api from "../../../services/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../../services/token.service";
const { Option } = Select;

function OrderService(props) {
  const [formData, setFormData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [bookingByCheckIn, setBookingByCheckIn] = useState([]);
  const { id } = TokenService.getUser();

  useEffect(() => {
    api
      .get(`/staff/order-service/${id}`)
      .then((res) => {
        setBookingByCheckIn(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onFinish = () => {
    const { serviceRequestList } = formData
    var checkQuantity = false;

    serviceRequestList && serviceRequestList.forEach((item => {
      if (item.quantity === 0 || item.quantity === null) {
        checkQuantity = true;
      }
    }))

    if (checkQuantity) {
      notification["error"]({
        message: "Không được bỏ trống số lượng",
      });
    } else {
      insert();
    }
  };

  const insert = () => {
    const config = {
      method: "post",
      url: "/staff/order-service",
      data: formData
    }
    api(config).then(res => {
      setObjs([])
      notification["success"]({
        message: res.data.message,
      });
    }).catch(err => {
      console.log(err);
    })

    setIsModalVisible(false)
    form.resetFields();
  }
  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Mã đơn đặt',
      key: 'idBooking',
      dataIndex: "idBooking",
    },
    {
      title: "Họ Và Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày nhận phòng",
      dataIndex: "dateIn",
      key: "dateIn",
    },
    {
      title: "Ngày trả phòng",
      dataIndex: "dateOut",
      key: "dateOut",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Loại phòng",
      dataIndex: "nameTypeRoom",
      key: "nameTypeRoom",
    },
    {
      title: "Hành động",
      key: Math.random().toString(),
      render: (reason, record, index) => {
        return (
          <Button ghost onClick={() => showModal(record)} type="primary">
            Order dịch vụ
          </Button>
        );
      },
    },
  ];

  const [filters, setFilters] = useState({
    idHotel: 0,
    idTypeRoom: 0
  })

  useEffect(() => {
    const { idHotel, idTypeRoom, idBooking } = filters
    if (idHotel !== 0 && idTypeRoom !== 0) {
      getRoomsAndGetService(idHotel, idTypeRoom)
    }
    setFormData({
      ...formData, idBooking
    })
  }, [filters])

  const [rooms, setRooms] = useState([])
  const [services, setServices] = useState([])

  const getRoomsAndGetService = (idHotel, idTypeRoom) => {
    const config = {
      method: "get",
      url: "/staff/order-service",
      params: {
        idHotel, idTypeRoom
      }
    }
    api(config).then(res => {
      setRooms(res.data.data.rooms)
      setServices(res.data.data.service)
    })
  }

  const showModal = (record) => {
    const { idHotel, idTypeRoom, idBooking } = record;
    setFilters({
      idHotel, idTypeRoom, idBooking
    })
    setIsModalVisible(true)
  }
  const [objs, setObjs] = useState([])

  function onChangeService(event, item, index) {
    var objects = [...objs]
    var object = { ...objects[index] }

    const value = event.target.value
    if (!event.target.checked) {
      var objFilter = [...objs]
      objFilter[index] = undefined
      setObjs(objFilter)
    } else {
      object.idService = value
      object.quantity = 1
      object.price = item.price;
      objects[index] = object
      setObjs(objects)
    }
  }

  useEffect(() => {
    var listService = [...objs].filter(item => item !== undefined)
    setFormData({
      ...formData, serviceRequestList: listService
    })

  }, [objs])

  const [form] = Form.useForm();

  const onChangeQty = (val, item, index) => {
    var objects = [...objs]
    var object = { ...objects[index] }

    object.quantity = val
    object.price = item.price
    objects[index] = object
    setObjs(objects)
    //
  }
  const handleCancel = () => {
    setIsModalVisible(false)
    setObjs([])
    form.resetFields();
  }
  return (
    <>
      <Modal
        title="Order dịch vụ"
        visible={isModalVisible}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item
            name="room"
            label="Phòng"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống phòng!",
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Chọn phòng"
              optionFilterProp="children"
              onChange={(val) => setFormData({ ...formData, idRoom: val })}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {rooms.map((item, index) => (
                <Option key={index} value={item.id}>{item.numberRoom}</Option>
              )
              )}
            </Select>
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            name="nameService"
            label="Dịch vụ"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống dịch vụ",
              },
            ]}
          >
            <Row>
              {services.map((item, index) => (
                <React.Fragment key={index}>
                  <Col span={8} style={{ marginTop: 5 }}>
                    <Checkbox
                      onChange={(event) => onChangeService(event, item, index)}
                      value={item.id} >{item.name}
                    </Checkbox>
                  </Col>
                  <Col span={8} >
                    <InputNumber
                      disabled={!objs[index]?.idService}
                      min={0}
                      max={10}
                      value={objs[index]?.quantity || 0}
                      size="small"
                      onChange={(val => onChangeQty(val, item, index))}
                    />
                  </Col>
                  <Col span={8} style={{ marginTop: 5 }}>
                    <label >
                      {((item.price * objs[index]?.quantity) && (item.price * objs[index]?.quantity).toLocaleString())
                        || ((item.price * 1) && (item.price * 1).toLocaleString())} VND
                    </label>
                  </Col>
                </React.Fragment>
              ))}
            </Row>
          </Form.Item>
          <Form.Item label="Giá dịch vụ" name="priceService">
            <label>{objs
              .filter(item => item !== undefined)
              .reduce((sum, { price, quantity }) => sum + quantity * price, 0)}VND</label>
          </Form.Item>
          <div style={{ marginLeft: 150 }}>
            <Button danger onClick={handleCancel}>
              Hủy
            </Button>
            &nbsp;
            <Button type="primary" ghost htmlType="submit">
              Xác nhận order
            </Button>
          </div>
        </Form>
      </Modal>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dondat">Nhân viên</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Quản lý đơn đặt
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Order dịch vụ
          </li>
        </ol>
      </nav>
      <hr />
      <h3 className="text-center mb-2 mt-2">Order Dịch Vụ</h3>
      <hr />

      <Table columns={columns} dataSource={bookingByCheckIn} />
    </>
  );
}

export default OrderService;