import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  DatePicker,
  InputNumber,
  Select,
  Input,
  Card,
  Row,
  Col,
  notification,
} from "antd";
import api from "../../../services/api";
import moment from "moment";
import TokenService from "../../../services/token.service";
const { Option } = Select;
const { RangePicker } = DatePicker;
function Doilich(props) {

  const {
    isModalVisibleDL,
    doiLich,
    setIsModalVisibleDL,
    donDats,
    setDonDats,
  } = props;

  const { id } = TokenService.getUser();
  const [paramReq, setParamReq] = useState({
    idBooking: 0,
    idHotel: 0,
    idTypeRoom: null,
    dateIn: null,
    dateOut: null,
    totalRoom: 1,
    ghiChu: "",
    newDepositPrice: 0,
    totalPrice: 0,
    idChanger: id,
  });
  const [days, setDays] = useState(0);
  const [tongNgay, setTongNgay] = useState(0)
  const [depositPrice, setDepositPrice] = useState(0);
  const [typeRooms, setTypeRooms] = useState([]);
  const [price, setPrice] = useState(0);
  const [typeRoom, setTypeRoom] = useState({})
  const [emptyRoom, setEmptyRoom] = useState(0);
  const [form] = Form.useForm();
  const [dates, setDates] = useState([]);

  const getTypeRooms = () => {
    const config = {
      method: "get",
      url: `/owner/hotel-type-room`,
      params: {
        idHotel: doiLich.idHotel
      }
    };
    api(config).then((res) => {
      console.log(res);
      setTypeRooms(res.data.data);
    });
  };

  useEffect(() => {
    if (!isNaN(days)) {
      setParamReq({
        ...paramReq,
        newDepositPrice: (price * paramReq.totalRoom * days) / 3 - depositPrice < 0 ? 0 : (price * paramReq.totalRoom * days) / 3 - depositPrice,
        totalPrice: price * paramReq.totalRoom * days,
      });
    } else {
      setParamReq({
        ...paramReq,
        newDepositPrice: 0,
        totalPrice: 0,
      });
    }
  }, [price, paramReq.totalRoom, days, depositPrice, paramReq.totalRoom, paramReq.idTypeRoom]);

  useEffect(() => {
    getTypeRooms();
  }, [doiLich.idHotel]);

  useEffect(() => {
    setParamReq({
      ...paramReq,
      idBooking: doiLich.idBooking,
      idTypeRoom: doiLich.idTypeRoom,
      idHotel: doiLich.idHotel,
      totalRoom: doiLich.totalRoom,
    });
    setDepositPrice(doiLich.depositPrice);
    form.setFieldsValue({
      loaiphong: doiLich.nameTypeRoom,
      soluongphong: doiLich.totalRoom
    });

    var dateIn = doiLich.dateIn !== undefined ? doiLich.dateIn.split("/").reverse().join("-") : null;
    var dateOut = doiLich.dateOut !== undefined ? doiLich.dateOut.split("/").reverse().join("-") : null;
    var totalDay = moment(dateOut).diff(moment(dateIn), "days");
    setTongNgay(totalDay)

    var idTypeRoom = doiLich.idTypeRoom !== undefined ? doiLich.idTypeRoom : null;
    if (idTypeRoom !== null) {
      var findTypeRoom = typeRooms.find(item => item.idTypeRoom === idTypeRoom)
      setTypeRoom(findTypeRoom)
    }

  }, [doiLich, typeRooms]);

  useEffect(() => {
    const config = {
      method: "get",
      url: "/staff/check-total-room",
      params: {
        idHotel: paramReq.idHotel,
        idTypeRoom: paramReq.idTypeRoom,
        dateIn: paramReq.dateIn,
        dateOut: paramReq.dateOut,
      },
    };
    api(config).then((res) => {
      setEmptyRoom(res.data.data);
    });
  }, [paramReq.idTypeRoom, paramReq.dateIn, paramReq.dateOut]);

  const handleCancelDL = () => {
    setPrice(0);
    // setEmptyRoom(0)
    setParamReq({
      ...paramReq, dateIn: null, dateOut: null, totalRoom: 0
    })
    setDays(NaN)
    setDates([])
    form.resetFields();
    setIsModalVisibleDL(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      loaiphong: doiLich.nameTypeRoom,
      soluongphong: doiLich.totalRoom
    });
    if (isModalVisibleDL === true) {
      setParamReq({
        ...paramReq, totalRoom: doiLich.totalRoom
      })
    }

  }, [isModalVisibleDL])

  useEffect(() => {
    const findTypeRoom = typeRooms.find((item) => item.idTypeRoom === paramReq.idTypeRoom);
    setPrice(findTypeRoom?.priceTypeRoom);
  }, [paramReq.idTypeRoom, isModalVisibleDL])

  const updateBooking = () => {
    const config = {
      method: "post",
      url: "/staff/pay",
      data: paramReq,
    };
    api(config).then((res) => {
      console.log(res);
      if (res.data.status === "00") {
        window.location.assign(res.data.data);
      } else {
        const indexToDonDat = donDats.findIndex(
          (item) => item.idBooking === paramReq.idBooking
        );
        const updatedDonDats = [...donDats]; // creates a copy of the array

        updatedDonDats[indexToDonDat].dateIn = res.data.data.dateIn;
        updatedDonDats[indexToDonDat].dateOut = res.data.data.dateOut;
        updatedDonDats[indexToDonDat].nameTypeRoom =
          res.data.data.nameTypeRoom;
        updatedDonDats[indexToDonDat].totalRoom = res.data.data.totalRoom;
        updatedDonDats[indexToDonDat].checkUpdateBooking = res.data.data.checkUpdateBooking;
        updatedDonDats[indexToDonDat].totalPrice = res.data.data.newTotalPrice;
        updatedDonDats[indexToDonDat].depositPrice = res.data.data.newDepositPrice;
        setDonDats(updatedDonDats);

        setPrice(0);
        setEmptyRoom(0)
        setParamReq({
          ...paramReq, dateIn: null, dateOut: null, totalRoom: 0
        })
        setDays(NaN)
        setDates([])
        form.resetFields();
        setIsModalVisibleDL(false);

        notification["success"]({
          message: res.data.message,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const onFinish = () => {

    if (paramReq.totalRoom > emptyRoom) {
      notification["error"]({
        message: "Số lượng phòng không được lớn hơn số phòng trống",
      });
    } else if (days < tongNgay) {
      notification["error"]({
        message: "Tổng số ngày lịch mới phải lớn hơn hoặc bằng tổng số ngày cũ",
      });
    }
    else {
      updateBooking();
    }
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

  const disablePastDates = (current) => {
    const checkTrungNgay = current && current <= moment(dates && dates[0], "yyyy-mm-dd");
    return current && (current < moment().startOf("day") || checkTrungNgay);
  };

  return (
    <Modal
      border-radius={100}
      width={750}
      title="Đổi lịch"
      visible={isModalVisibleDL}
      onOk={form.submit}
      onCancel={handleCancelDL}
    >
      <Form form={form} onFinish={onFinish}>
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

              <Input
                value={doiLich.nameHotel}
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
              <Form.Item
                name="loaiphong"
                rules={[
                  {
                    required: true,
                    message: "Không được trống loại phòng!",
                  },
                ]}
              >
                <Select
                  onChange={(val) => {
                    setParamReq({
                      ...paramReq,
                      idTypeRoom: val,
                    });
                    const { priceTypeRoom } = typeRooms.find((item) => item.idTypeRoom === val);
                    setPrice(priceTypeRoom);
                  }}
                  size="large"
                  name="loaiphong"
                  placeholder="Chọn loại phòng"
                >
                  {typeRooms.map((item, index) => {
                    var check = false;
                    if (typeRoom?.priceTypeRoom && typeRoom.priceTypeRoom > item.priceTypeRoom) {
                      check = true
                    }
                    return (
                      <Option disabled={check} key={index} value={item.idTypeRoom}>
                        {item.nameTypeRoom}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <p>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/date-to.png"
                  alt=""
                />{" "}
                Ngày đến - Ngày về
              </p>

              <Form.Item
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Không được trống ngày đến , ngày về!",
                  },
                ]}
              >
                <RangePicker
                  disabledDate={(current) => disablePastDates(current)}
                  size="large"
                  style={{ width: "305px" }}
                  onCalendarChange={(val) => setDates(val)}
                  placeholder={["Ngày đến", "Ngày về"]}
                  onChange={(date, dateString) => {
                    var dateIn = dateString[0] !== "" ? dateString[0] : null;
                    var dateOut = dateString[1] !== "" ? dateString[1] : null;
                    setParamReq({
                      ...paramReq,
                      dateIn,
                      dateOut,
                    });
                    let days = moment(dateOut).diff(moment(dateIn), "days");
                    setDays(days);
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <p>
                <img
                  alt=""
                  src="https://img.icons8.com/ios-glyphs/30/000000/home.png"
                />
                Số lượng phòng
              </p>
              <Form.Item name="soluongphong">
                <InputNumber
                  disabled
                  style={{ width: "305px" }}
                  size="large"
                  name="soluongphong"
                  precision={0}
                  onChange={(val) => {
                    setParamReq({ ...paramReq, totalRoom: val })
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <p>
                {" "}
                <img
                  alt=""
                  src="https://img.icons8.com/ios-glyphs/30/000000/door-opened.png"
                />{" "}
                Tổng phòng trống:
              </p>
              <Input
                value={emptyRoom}
                disabled
                size="large"
                name="phongtrong"
              />
            </Col>

            {/* {paramReq.newDepositPrice > 0 && <Col span={12}>
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
                  onChange={(e) => {
                    setParamReq({
                      ...paramReq,
                      ghiChu: stringToSlug(e.target.value),
                    });
                  }}
                />
              </Form.Item>
            </Col>} */}
            <Col span={12}>
              <p>
                <img
                  alt=""
                  src="https://img.icons8.com/android/24/000000/room.png"
                />{" "}
                Tổng số ngày: {isNaN(days) ? 0 : days}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <img
                  alt=""
                  src="https://img.icons8.com/material-outlined/24/000000/bill.png"
                />{" "}
                Số tiền đã cọc: {depositPrice}
              </p>
            </Col>
          </Row>
        </Card>
        <Row gutter={[40]} style={{ marginTop: "10px" }}>
          <Col span={12} key={10}>
            <b style={{ color: "black", fontSize: "20px", marginLeft: "27px" }}>
              Tổng tiền: {paramReq.totalPrice} VND
            </b>
          </Col>
          {/* <Col span={12} key={11}>
            <b style={{ color: "black", fontSize: "20px" }}>
              Số tiền cọc mới : {paramReq.newDepositPrice} VND
            </b>
          </Col> */}
        </Row>
      </Form>
    </Modal >
  );
}
export default Doilich;
