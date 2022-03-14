import React, { useState, useEffect } from "react";
import { Modal, Form, Space, DatePicker, Row, Col, Input, Card, notification } from "antd";
import moment from "moment";
import api from '../../../services/api'

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
function GiaHanPhong(props) {

  const { isModalVisible, setIsModalVisible, giaHanPhong, donDats, setDonDats } = props;
  const [day, setDay] = useState(0)
  const [form] = Form.useForm();

  const [giaHanPhongReq, setGiaHanPhongReq] = useState({
    idHotel: giaHanPhong.idHotel,
    idTypeRoom: giaHanPhong.idTypeRoom,
    dateIn: null,
    dateOut: null,
  })

  const [emptyRoom, setEmptyRoom] = useState(0)

  useEffect(() => {
    checkTotalRoom();
  }, [giaHanPhongReq.dateOut])

  const checkTotalRoom = () => {
    const config = {
      method: "get",
      url: "/staff/check-total-room",
      params: {
        idHotel: giaHanPhongReq.idHotel,
        idTypeRoom: giaHanPhongReq.idTypeRoom,
        dateIn: giaHanPhongReq.dateIn,
        dateOut: giaHanPhongReq.dateOut
      }
    }
    api(config).then(res => {
      setEmptyRoom(res.data.data)
    })
  }

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false)
  }

  useEffect(() => {
    setGiaHanPhongReq({
      ...giaHanPhongReq,
      idHotel: giaHanPhong.idHotel,
      idTypeRoom: giaHanPhong.idTypeRoom,
      dateIn: giaHanPhong.dateIn && giaHanPhong.dateIn.split("/").reverse().join("-")

    })
  }, [giaHanPhong])


  const [formData, setFormData] = useState({})

  useEffect(() => {
    const { idTypeRoom } = giaHanPhong
    setFormData({
      ...formData,
      idBooking: giaHanPhong.idBooking,
      dateIn: giaHanPhongReq.dateIn,
      dateOut: giaHanPhongReq.dateOut,
      idTypeRoom,
      tongNgay: day
    })
  }, [giaHanPhongReq])

  const onFinish = () => {
    if (giaHanPhongReq.dateOut === null || giaHanPhongReq.dateOut === "") {
      notification["error"]({
        message: "Không được bỏ trống ngày về",
      });
    }
    else if (emptyRoom === 0 || emptyRoom < giaHanPhong.totalRoom) {
      notification["error"]({
        message: "Không còn phòng trống để gia hạn",
      });
    }
    else {
      const config = {
        method: "put",
        url: `/staff/gia-han-phong`,
        data: formData
      }
      api(config).then(res => {
        const indexToDonDat = donDats.findIndex(
          (donDat) => donDat.idBooking === formData.idBooking
        );
        const updatedDonDats = [...donDats]; // creates a copy of the array
        form.resetFields();
        updatedDonDats[indexToDonDat].dateIn = res.data.data.dateIn
        updatedDonDats[indexToDonDat].dateOut = res.data.data.dateOut
        updatedDonDats[indexToDonDat].totalPrice = res.data.data.totalPrice
        setDonDats(updatedDonDats);
        notification["success"]({
          message: res.data.message,
        });
        setIsModalVisible(false)
      }).catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <Modal
      border-radius={100}
      width={750}
      title="Gia Hạn Phòng"
      visible={isModalVisible}
      onOk={form.submit}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={onFinish} >
        <Card style={{ borderRadius: "15px" }}>
          <Row gutter={[40]}>
            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/company.png"
                  alt=""
                />{" "}
                Cơ sở
              </p>

              <Input value={giaHanPhong.nameHotel} size="large" name="coso" disabled />
            </Col>
            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/hospital-room--v1.png"
                  alt=""
                />{" "}
                Loại phòng
              </p>

              <Input value={giaHanPhong.nameTypeRoom} size="large" name="loaiphong" disabled />

            </Col>
            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/date-to.png"
                  alt=""
                />{" "}
                Ngày đến , Ngày đi
              </p>
              <Space>
                <Form.Item>
                  <DatePicker
                    size="large"
                    style={{ width: '150px' }}
                    placeholder="Ngày đến"
                    id="ngayden"
                    format={dateFormatList}
                    disabled={true}
                    value={moment(giaHanPhong.dateIn, dateFormatList)}
                  />
                </Form.Item>

                <Form.Item name="ngayve">
                  <DatePicker
                    size="large"
                    style={{ width: '150px' }}
                    placeholder="Ngày về"
                    id="ngaydi"
                    format={dateFormatList}
                    disabledDate={(current) => {
                      var dateParts = giaHanPhong.dateOut.split("/");
                      var dateOut = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                      dateOut.setDate(dateOut.getDate() + 1);
                      return current && current <= moment(dateOut, "DD/MM/YY");
                    }}
                    onChange={(date, dateString) => {
                      var newDate = dateString !== "" ? dateString.split("/").reverse().join("-") : null;
                      var dateIn = giaHanPhong.dateIn !== "" ? giaHanPhong.dateIn.split("/").reverse().join("-") : null;
                      setGiaHanPhongReq({
                        ...giaHanPhongReq,
                        dateOut: newDate
                      })
                      let days = moment(newDate).diff(moment(dateIn), "days");
                      setDay(isNaN(days) ? 0 : days);
                    }}
                  />
                </Form.Item>
              </Space>
            </Col>

            <Col span={12}>
              <p>
                <img alt="" src="https://img.icons8.com/ios-glyphs/30/000000/home.png" />
                Số lượng phòng
              </p>
              <Input
                style={{ width: "305px" }}
                size="large"
                value={giaHanPhong.totalRoom}
                disabled
              />


            </Col>
            <Col span={12}>
              <p>
                <img alt="" src="https://img.icons8.com/ios-glyphs/30/000000/home.png" />
                Số lượng phòng còn trống
              </p>
              <Input

                style={{ width: "305px" }}
                size="large"
                value={emptyRoom}
                disabled />
            </Col>
            <Col span={12}>
              <label style={{ paddingTop: 70 }}>Số đêm : <b>{day}</b> </label>
              {/* <label style={{ marginLeft: 40 }}>Số tiền : <b>70000000 </b> VND</label> */}
            </Col>
          </Row>
        </Card>
      </Form>
    </Modal>
  );
}
export default GiaHanPhong;
