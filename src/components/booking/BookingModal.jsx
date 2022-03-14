import { Col, Form, Input, Modal, Row } from "antd";
import api from "../../services/api";
import React, { useState } from "react";
import ChinhSach from "./ChinhSach";
import { Link } from "react-router-dom";

function BookingModal(props) {
  const { booking, setBooking, hotel, typeRoom, days,
    totalPrice, setGhiChu, isModalVisible, handleCancel, ghiChu } = props;
  const [form] = Form.useForm();
  const [showModalCS, setShowModalCS] = useState(false)

  const onFinish = () => {
    console.log(booking);

    const config = {
      method: "post",
      url: "/pay",
      params: {
        "bankCode": "NCB",
        "amout": booking.deposit_price,
        "description": ghiChu,
      },
      data: booking
    }
    api(config).then(res => {
      window.location.assign(res.data.data);
      // window.open(res.data.data, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
    })
    form.resetFields();
  };


  function stringToSlug(str) {
    // remove accents
    var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
      to =
        "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    str = str
      .toLowerCase()
      .trim()
      .replace("/[^a-z0-9-]/g", "-")
      .replace("/-+/g", " ");

    return str;
  }
  return (
    <>
      <Modal
        cancelText="Hủy"
        okText="Thanh toán bằng VNPay"
        border-radius={100}
        width={650}
        title="Thông tin đặt phòng"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
        getContainer={false}
      >

        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 5]}>
            <Col span={12}>
              <p>
                {" "}
                <img
                  src="https://img.icons8.com/material/24/000000/businessman--v1.png"
                  alt=""
                />{" "}
                Họ và tên
              </p>
              <Form.Item
                name="full_name"
                rules={[
                  { required: true, message: "Không được để trống họ và tên!" },
                ]}
              >
                <Input
                  size="large"
                  name="full_name"
                  onChange={(event) =>
                    setBooking({ ...booking, full_name: event.target.value })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <p>
                {" "}
                <img
                  src="https://img.icons8.com/material-outlined/24/000000/phone-contact.png"
                  alt=""
                />{" "}
                Số Điện Thoại
              </p>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống số điện thoại!",
                  },
                  {
                    validator(_, value) {
                      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                      if (!value || vnf_regex.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Sdt không đúng định dạng");
                    },
                  },
                ]}
              >
                <Input
                  size="large"
                  name="phone"
                  onChange={(event) =>
                    setBooking({ ...booking, phone: event.target.value })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/company.png"
                  alt=""
                />{" "}
                Cơ sở
              </p>

              <Input
                defaultValue={hotel.name}
                style={{ background: "#eee" }}
                disabled
                size="large"
                name="coso"
              />
            </Col>
            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/hospital-room--v1.png"
                  alt=""
                />{" "}
                Loại phòng
              </p>

              <Input
                value={typeRoom?.typeRoom && typeRoom.typeRoom.name}
                style={{ background: "#eee" }}
                disabled
                size="large"
                name="loaiphong"
              />
            </Col>
            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/date-to.png"
                  alt=""
                />{" "}
                Ngày đến
              </p>

              <Input
                value={booking.checkInCheckOutRequest.date_in !== null ? booking.checkInCheckOutRequest.date_in
                  .split("-")
                  .reverse()
                  .join("-") : ""}
                style={{ background: "#eee" }}
                disabled
                size="large"
                name="ngayden"
              />
            </Col>

            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/date-to.png"
                  alt=""
                />{" "}
                Ngày đi
              </p>

              <Input
                value={booking.checkInCheckOutRequest.date_out !== null ? booking.checkInCheckOutRequest.date_out
                  .split("-")
                  .reverse()
                  .join("-") : ""}
                style={{ background: "#eee" }}
                disabled
                size="large"
                name="ngaydi"
              />
            </Col>

            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/discount-ticket.png"
                  alt=""
                />{" "}
                Voucher
              </p>

              <Input size="large" name="voucher" />
            </Col>

            <Col span={12}>
              <p>
                {" "}
                <img
                  alt=""
                  src="https://img.icons8.com/windows/32/000000/notepad.png"
                />{" "}
                Nội dung chuyển khoản
              </p>
              <Form.Item
                name="noidungck"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống nội dung chuyển khoản",
                  },
                ]}
              >
                <Input
                  size="large"
                  name="noidungck"
                  onChange={(event) =>
                    setGhiChu((e) => stringToSlug(event.target.value))
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <p>
                <img
                  alt=""
                  src="https://img.icons8.com/android/24/000000/room.png"
                />{" "}
                Tổng số phòng: {booking.tongSoPhong}{" "}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <img
                  alt=""
                  src="https://img.icons8.com/android/24/000000/room.png"
                />{" "}
                Tổng số ngày: {days}{" "}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <img
                  alt=""
                  src="https://img.icons8.com/material-outlined/24/000000/bill.png"
                />{" "}
                Tổng thanh toán: {totalPrice.toLocaleString()}{"VND "}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <img
                  alt=""
                  src="https://img.icons8.com/ios-glyphs/30/000000/us-dollar.png"
                />{" "}
                Số tiền phải cọc: {booking.deposit_price.toLocaleString()}{"VND "}
              </p>
            </Col>
          </Row>
        </Form>
        <hr />

        <div style={{ textAlign: "right" }}>
          Bằng cách nhấn nút Thanh toán, bạn đồng ý với <br />
          <Link to="/policy" target="_blank"
            type="button"
            style={{ color: "rgb(0, 182, 243)" }}
          >
            Điều kiện và điều khoản
          </Link>
          &nbsp; của chúng tôi
        </div>
      </Modal>


    </>
  );
}

export default BookingModal;
