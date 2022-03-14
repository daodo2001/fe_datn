import React, { useEffect, useState } from "react";
import moment from "moment";
import {
    Button,
    Col,
    DatePicker,
    InputNumber,
    notification
} from "antd";
import { WarningOutlined } from "@ant-design/icons";
import TokenService from "../../services/token.service";
import BookingModal from "./BookingModal";

function TypeRoom(props) {
    var today = new Date();
    var currentDay = String(today.getDate()).padStart(2, '0');
    const { typeRooms, hotel, setIdTypeRoom, setDateIn, setDateOut } = props;
    const [checkLogin, setCheckLogin] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ghiChu, setGhiChu] = useState("")
    const [typeRoom, setTypeRoom] = useState({});
    const userAuthen = TokenService.getUser();
    const [days, setDays] = useState(0)
    const [booking, setBooking] = useState({
        checkInCheckOutRequest: {
            date_in: "",
            date_out: "",
            idTypeRoom: 0,
        },
        email: "",
        full_name: "",
        id_hotel: 0,
        id_user: 0,
        phone: "",
        tongNgay: 0,
        tongSoPhong: 1,
        deposit_price: 0

    });

    const [dateInit, setDateInit] = useState(new Date());
    const [disable, setdisable] = useState(true);


    useEffect(() => {
        setBooking({
            ...booking,
            id_user: userAuthen && userAuthen.id,
            id_hotel: hotel.id,
            email: userAuthen && userAuthen.email,
        });
    }, [checkLogin]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (event, index, item) => {
        console.log(objs[index])
        console.log("dateOut", objs[index]?.dateOut);
        console.log("dateIn", objs[index]?.dateIn);
        if (
            objs[index] === undefined ||
            objs[index]?.dateIn === undefined ||
            objs[index]?.dateIn === null ||
            objs[index]?.dateOut === null ||
            objs[index]?.dateOut === undefined
        ) {
            notification.open({
                message: <p>Vui lòng chọn ngày đến, ngày đi!</p>,
                icon: (
                    <WarningOutlined
                        style={{
                            color: "red",
                            fontSize: "30px",
                            paddingBottom: 30,
                        }}
                    />
                ),
            });
        } else if (
            objs[index].dateIn >=
            objs[index].dateOut
        ) {
            notification.open({
                message: <p>Ngày đến không được lớn hơn hoặc bằng ngày về!
                    Vui lòng nhập lại!</p>,
                icon: (
                    <WarningOutlined
                        style={{
                            color: "red",
                            fontSize: "30px",
                            paddingBottom: 30,
                        }}
                    />
                ),
            });
        } else if (objs[index].totalRoom === 0 || objs[index].totalRoom === null) {
            notification.open({
                message: <p>Vui lòng chọn số phòng!</p>,
                icon: (
                    <WarningOutlined
                        style={{
                            color: "red",
                            fontSize: "30px",
                            paddingBottom: 30,
                        }}
                    />
                ),
            });
        }
        else if (TokenService.getUser() === null) {
            notification.open({
                message: <p>Vui lòng đăng nhập để đặt phòng</p>,
                icon: (
                    <WarningOutlined
                        style={{
                            color: "red",
                            fontSize: "30px",
                            paddingBottom: 30,
                        }}
                    />
                ),
            });
        } else {
            const { dateIn, dateOut, totalRoom } = objs[index]
            let days = moment(dateOut).diff(moment(dateIn), "days");
            setDays(days)
            const tongTien = item.typeRoom.price * days * totalRoom;
            // cọc 30%
            const tienPhaiCoc = tongTien / 3
            const newTypeRoom = typeRooms.find((val) => val.id === item.id);

            setBooking({
                ...booking,
                tongNgay: days,
                deposit_price: tienPhaiCoc,
                tongSoPhong: totalRoom,
                checkInCheckOutRequest: {
                    ...booking.checkInCheckOutRequest,
                    idTypeRoom: item.typeRoom.id,
                    date_in: dateIn,
                    date_out: dateOut
                },
            });
            setTypeRoom(newTypeRoom);
            setTotalPrice(tongTien);
            setCheckLogin(true);
            setIsModalVisible(true);
        }
    };

    function handleCancel() {
        setIsModalVisible(false);
    }

    const getImageTypeRoom = (image) => {
        if (image) {
            return `http://localhost:8080/api/rest/files/image_type_room/${image}`;
        }
    };

    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

    const [objs, setObjs] = useState([])

    //bug 2 
    const onChangeTotalRoom = (val, index, item) => {
        var objects = [...objs]
        var object = { ...objects[index] }
        object.key = item.id
        object.totalRoom = val
        objects[index] = object
        setObjs(objects)
        setDateIn(object.dateIn)
        setDateOut(object.dateOut)
        setIdTypeRoom(item.typeRoom.id)
    }

    const onChangeDateIn = (date, dateString, index, item) => {
        var newDate = dateString !== "" ? dateString.split("/").reverse().join("-") : null;
        var objects = [...objs]
        var object = { ...objects[index] }
        object.key = item.id
        object.dateIn = newDate
        object.totalRoom = 1
        objects[index] = object
        setObjs(objects)
        setDateIn(newDate)
        setIdTypeRoom(item.typeRoom.id)

        if (date === null) {
            setDateInit(new Date());
        } else {
            setDateInit(date.format("DD"));
            setdisable(false);
        }
    };

    const onChangeDateOut = (date, dateString, index, item) => {
        var newDate = dateString !== "" ? dateString.split("/").reverse().join("-") : null;
        var objects = [...objs]
        var object = { ...objects[index] }
        object.dateOut = newDate
        objects[index] = object
        setObjs(objects)
        setDateOut(newDate)
        setIdTypeRoom(item.typeRoom.id)
    };

    return (
        <Col span={24}>
            {typeRooms.map((item, index) => (
                <div key={index} className="type-room mb-3" style={{ width: "940px" }}>
                    <div className="type-room-main">
                        <div>
                            <div className="type-room-image">
                                <img
                                    style={{
                                        height: "170px",
                                        width: "170px",
                                        borderRadius: 10,
                                    }}
                                    src={getImageTypeRoom(item.typeRoom.typeRoomImages[0].image)}
                                    alt=""
                                />
                            </div>

                        </div>
                        <div className="type-room-content">
                            <h6 id="name-hotel">{item.typeRoom.name}</h6>
                            <div className="text-content">
                                <i className="fas fa-arrows-alt"></i> 33m2 &ensp;{" "}
                                <i className="fas fa-eye"></i> Hướng một phần
                            </div>
                            <div className="text-content">
                                <i className="fas fa-sticky-note"></i> Hỗ trợ hoàn hủy trong 24h
                            </div>
                            <div className="text-content">
                                <i className="fas fa-utensils"></i> Không bao gồm bữa ăn sáng
                            </div>
                            <div className="text-content" style={{ color: "#48BB78" }}>
                                <i className="fas fa-bolt"></i> Xác nhận phòng ngay
                            </div>
                            <div className="text-content" style={{ color: "#E53E3E" }}>
                                {item.totalNumberRoom === 0 ? "Đã hết loại phòng này!" : `Chỉ còn ${item.totalNumberRoom} phòng trống`}
                            </div>
                        </div>
                        <div className="type-room-people">
                            <div id="iconpeople">
                                <i
                                    style={{
                                        alignContent: "center",
                                        position: "relative",
                                        left: "13px",
                                        fontSize: "25px",
                                    }}
                                    className="fas fa-user"
                                ></i>
                            </div>
                            <div className="text-content" align="center">
                                {item.typeRoom.capacity} người
                            </div>
                        </div>
                        <div className="type-room-bed">
                            <div id="iconpeople">
                                <i
                                    style={{
                                        alignContent: "center",
                                        position: "relative",
                                        left: "18px",
                                        fontSize: "25px",
                                    }}
                                    className="fas fa-bed"
                                ></i>
                            </div>
                            <div className="text-content" align="center">
                                Một giường đôi
                            </div>
                        </div>
                        <div className="type-room-date">
                            <label style={{ marginBottom: 10 }}>Chọn Thời Gian</label>
                            <div className="mb-2">
                                <DatePicker
                                    placeholder="Ngày đến"
                                    id="ngayden"
                                    format={dateFormatList}
                                    onChange={(date, dateString) =>
                                        onChangeDateIn(date, dateString, index, item)
                                    }
                                    disabledDate={(current) => {
                                        return moment().add(30, "days") < current || moment().add(-1, "days") >= current
                                    }}
                                />
                            </div>

                            <div>
                                <DatePicker
                                    placeholder="Ngày về"
                                    id="ngaydi"
                                    format={dateFormatList}
                                    disabled={disable}
                                    onChange={(date, dateString) =>
                                        onChangeDateOut(date, dateString, index, item)
                                    }
                                    disabledDate={(current) => {
                                        return moment().add(dateInit - currentDay, "days") >= current;
                                    }}
                                />
                            </div>
                            <br />
                            <label>Chọn Số Phòng</label>
                            <br />
                            <br />
                            <InputNumber
                                style={{ width: 117 }}
                                size="middle"
                                min={0}
                                max={item.totalNumberRoom}
                                precision={0}
                                defaultValue={1}
                                onChange={(val) => onChangeTotalRoom(val, index, item)}
                            />
                        </div>
                        <div className="type-room-rate" align="right">
                            {/* <div id="rate-text"></div>
                            <div className="price-text mt-1">
                                <i>đ /đêm</i>
                            </div> */}
                            <div className="mt-4">
                                <span
                                    className="price-text giathat"
                                    style={{ fontSize: 19, fontWeight: "bold" }}
                                >
                                    {(item.typeRoom.price).toLocaleString()}/đêm
                                </span>
                            </div>
                            <div className="mt-1">
                                <Button
                                    disabled={item.totalNumberRoom === 0}
                                    onClick={(event) => showModal(event, index, item)}
                                    style={{
                                        borderRadius: "8px",
                                        textTransform: "none",
                                        marginLeft: "16px",
                                        width: "80%",
                                        height: 40,
                                    }}
                                    className="title-hotel-right-btn"
                                    variant="contained"
                                    color="secondary"
                                    type="danger"
                                >
                                    <div
                                        style={{
                                            fontSize: "16px",
                                            minHeight: "20px",
                                            fontWeight: "600",
                                        }}

                                    >
                                        Đặt phòng
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <BookingModal
                booking={booking}
                setBooking={setBooking}
                hotel={hotel}
                typeRoom={typeRoom}
                days={days}
                totalPrice={totalPrice}
                setGhiChu={setGhiChu}
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                ghiChu={ghiChu}
            />
        </Col>
    );
}

export default TypeRoom;
