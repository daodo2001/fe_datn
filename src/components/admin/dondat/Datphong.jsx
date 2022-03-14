
import { InputNumber, Card, DatePicker, Row, Col, Form, Input, Select, Button, Checkbox, notification, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import api from '../../../services/api'
import TokenService from "../../../services/token.service";
const { Option } = Select;
function Datphong(props) {
    const { RangePicker } = DatePicker;
    const dateString = ["Ngày đến", "Ngày về"]
    const [checked, setChecked] = useState(false)
    const [componentSize] = useState('default');
    const [form] = Form.useForm();
    const { id } = TokenService.getUser();
    const [typeRooms, setTypeRooms] = useState([]);
    const [dates, setDates] = useState([]);
    const [emptyRoom, setEmptyRoom] = useState()
    const [hotelTypeRoom, setHotelTypeRoom] = useState({
        idTypeRoom: 0,
        dateIn: null,
        dateOut: null
    })
    const { idTypeRoom, dateIn, dateOut } = hotelTypeRoom
    const [days, setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0)
    const [depositPrice, setDepositPrice] = useState(0)
    const [priceTypeRoom, setPriceTypeRoom] = useState(0)
    const [totalRoom, setTotalRoom] = useState(0)
    const [nameHotel, setNameHotel] = useState("")
    const [idHotel, setIdHotel] = useState()

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
                setIdHotel(res.data.data.idHotel);
            }).catch(err => {
                console.log(err);
            })
        }
        getNameHotel();
    }, [id])

    useEffect(() => {
        const getTypeRooms = () => {
            const config = {
                method: "get",
                url: `/owner/hotel-type-room`,
                params: {
                    idHotel
                }
            };
            api(config).then((res) => {
                console.log(res);
                setTypeRooms(res.data.data);
            });
        };
        getTypeRooms();

    }, [form, idHotel])

    useEffect(() => {
        form.setFieldsValue({
            coso: nameHotel
        })
    }, [nameHotel])

    useEffect(() => {
        const checkTotalRoom = () => {
            const config = {
                method: "get",
                url: "/staff/check-total-room",
                params: {
                    idHotel: idHotel,
                    idTypeRoom, dateIn, dateOut
                },
            };
            api(config).then((res) => {
                setEmptyRoom(res.data.data);
            });
        }
        checkTotalRoom();
    }, [idTypeRoom, dateIn, dateOut, idHotel])

    useEffect(() => {
        var tongTien = 0;
        if (!isNaN(days) && totalRoom !== 0) {
            tongTien = priceTypeRoom * days * totalRoom
            setTotalPrice(tongTien)
            setDepositPrice(tongTien / 3)
        } else {
            setTotalPrice(tongTien)
            setDepositPrice(tongTien / 3)
        }
    }, [idTypeRoom, days, totalRoom, priceTypeRoom]);

    // const insert = (data) => {
    //     const config = {
    //         method: "post",
    //         url: "/staff/dat-phong",
    //         data: data
    //     }
    //     api(config).then(res => {
    //         if (res.data.status === "00") {
    //             window.location.assign(res.data.data);
    //         }
    //         else {
    //             form.resetFields();
    //             notification["success"]({
    //                 message: res.data.message,
    //             });
    //         }
    //     }).catch(err => {
    //         if (err) {
    //             notification["error"]({
    //                 message: err.response.data.message,
    //             });
    //         }
    //     })
    // }

    const insert = () => {
        const config = {
            method: "post",
            url: "/staff/dat-phong",
            data: dataSource
        }
        api(config).then(res => {
            if (res.data.status === "00") {
                window.location.assign(res.data.data);
            }
            else {
                form.resetFields();
                setDataSource([])
                notification["success"]({
                    message: res.data.message,
                });
                props.history.push("/admin/dondat");
            }
        }).catch(err => {
            if (err) {
                notification["error"]({
                    message: err.response.data.message,
                });
            }
        })
    }

    function stringToSlug(str) {
        if (str === undefined) {
            return null;
        }
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

    const onFinish = (fieldsValue) => {
        const rangeValue = fieldsValue['date-picker'];
        // isOn = true thì đặt off
        const { phone, fullName, idTypeRoom, totalRoom, ghiChu, email } = fieldsValue
        const values = {
            phone, fullName, idTypeRoom, totalRoom, ghiChu: stringToSlug(ghiChu), email,
            'dateIn': rangeValue[0].format('YYYY-MM-DD'),
            'dateOut': rangeValue[1].format('YYYY-MM-DD'),
            idHotel,
            isOnline: checked,
            totalPrice, depositPrice: 0,
            idUser: id
        };
        if (totalRoom > emptyRoom) {
            notification["error"]({
                message: "Số phòng không được lớn hơn số phòng trống",
            });
        } else {
            const newData = [...dataSource]
            // dataSource.forEach(item => {
            //     if (item.idTypeRoom === values.idTypeRoom) {
            //         item.totalRoom += values.totalRoom
            //     }
            // })

            var check = false;
            dataSource.forEach(item => {
                if (item.idTypeRoom === values.idTypeRoom &&
                    (item.dateIn === values.dateIn && item.dateOut === dateOut) &&
                    item.totalRoom >= emptyRoom) {
                    check = true;
                }
            })
            if (check) {
                notification["error"]({
                    message: "Loại phòng này đã hết phòng trống",
                });
            }
            else {
                const dataIndex = newData.find(item => item.idTypeRoom === idTypeRoom)
                if (dataIndex) {
                    dataIndex.totalRoom += values.totalRoom
                } else {
                    newData.push(values)
                }
                setDataSource(newData)
            }
            // insert(values)
        }
    }
    const deleteBooking = (record) => {

        setDataSource([...dataSource].filter(item => item.idTypeRoom !== record.idTypeRoom))
        console.log(record);
    }

    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Loại phòng',
            dataIndex: 'idTypeRoom',
            key: '2',
            render: (idTypeRoom) => {
                const typeRoom = typeRooms.find(item => item.idTypeRoom === idTypeRoom)
                var color
                if (typeRoom.nameTypeRoom === "Phòng đơn") {
                    color = 'geekblue'
                } else if (typeRoom.nameTypeRoom === "Phòng đôi") {
                    color = 'green'
                }
                else if (typeRoom.nameTypeRoom === "Phòng vip") {
                    color = 'red'
                }
                else if (typeRoom.nameTypeRoom === "Phòng superior") {
                    color = 'cyan'
                }
                return (
                    <Tag color={color} key={nameHotel}>
                        {typeRoom.nameTypeRoom}
                    </Tag>
                )
            }
        },
        {
            title: 'Số lượng phòng',
            dataIndex: 'totalRoom',
            key: '3',
        },
        {
            title: 'Ngày đến',
            dataIndex: 'dateIn',
            key: '4',
        },
        {
            title: 'Ngày về',
            dataIndex: 'dateOut',
            key: '5',
        },
        {
            title: 'Hành động',
            key: '6',
            render: (item, record, index) => {
                return (
                    <>
                        <Button onClick={() => deleteBooking(record)} type="danger" ghost>
                            Xóa
                        </Button>
                    </>
                )
            }
        },
    ]
    const checkPhongTrong = () => {
        var data = {
            check: false,
            totalRoom: 0
        }

        dataSource.forEach(item => {
            if (item.idTypeRoom === idTypeRoom) {
                data.check = true
                data.totalRoom = item.totalRoom
            }
        })
        return data;
    }
    // useEffect(() => {
    //     console.log(checkPhongTrong().totalRoom);
    //     setEmptyRoom(emptyRoom - checkPhongTrong().totalRoom)
    // }, [dataSource, idTypeRoom])


    return (
        <div >
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/danhsachdondat">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý đơn đặt
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Đặt phòng
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Đặt phòng {nameHotel}
            </h3>
            <hr />
            <Card className="main-container">
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
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={[20, 5]}>
                        <Col span={8} key={1}>
                            <Form.Item label="Họ và Tên" name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống họ tên!',
                                    },
                                ]}>
                                <Input disabled={dataSource.length > 0} name="fullName" />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={2}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống số điện thoại!',
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
                                    name="phone"
                                    disabled={dataSource.length > 0}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8} key={3}>
                            <Form.Item
                                name="email"
                                label="E-mail"

                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Không đúng định dạng E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống E-mail!',
                                    },
                                ]}
                            >
                                <Input disabled={dataSource.length > 0} name="email" />
                            </Form.Item>
                        </Col>

                        <Col span={8} key={4}>
                            <Form.Item label="Cơ sở" name="coso"
                            >
                                <Input disabled name="coso" />
                            </Form.Item>
                        </Col>

                        <Col span={8} key={5}>
                            <Form.Item
                                name="idTypeRoom"
                                label="Loại Phòng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được trống loại phòng!',
                                    },
                                ]}>
                                <Select
                                    onChange={(val) => {
                                        const { priceTypeRoom } = typeRooms.find(item => item.idTypeRoom === val);
                                        setPriceTypeRoom(priceTypeRoom)
                                        setHotelTypeRoom({
                                            ...hotelTypeRoom, idTypeRoom: val
                                        })
                                    }}
                                    name="loaiphong"
                                    placeholder="Chọn loại phòng">
                                    {
                                        typeRooms.map((item, index) => (
                                            <Option key={index} value={item.idTypeRoom}>{item.nameTypeRoom}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8} key={7}>
                            <Form.Item
                                name="date-picker"
                                label="Chọn Ngày" rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống ngày đến , ngày về!',
                                    },
                                ]}>
                                <RangePicker
                                    disabled={dataSource.length > 0}
                                    onChange={(date, dateString) => {
                                        var dateIn = dateString[0] !== "" ? dateString[0] : null;
                                        var dateOut = dateString[1] !== "" ? dateString[1] : null;
                                        setHotelTypeRoom({
                                            ...hotelTypeRoom,
                                            dateIn,
                                            dateOut,
                                        });
                                        let days = moment(dateOut).diff(moment(dateIn), "days");
                                        setDays(days);
                                    }}
                                    placeholder={dateString}
                                    disabledDate={(current) => {
                                        const checkTrungNgay = current && current <= moment(dates && dates[0], "yyyy-mm-dd");
                                        return (
                                            moment().add(-1, "days") >= current || checkTrungNgay
                                        );
                                    }}
                                    onCalendarChange={(val) => setDates(val)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8} key={8}>
                            <Form.Item label="Số lượng phòng" name="totalRoom"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống số lượng phòng!',
                                    },
                                ]}>
                                <InputNumber
                                    precision={0}
                                    max={emptyRoom - checkPhongTrong().totalRoom}
                                    onChange={val => setTotalRoom(val)}
                                    name="tongphong" value={1} min={1} />
                            </Form.Item>
                        </Col>

                        <Col span={8} key={11} >
                            <label style={emptyRoom === 0 || checkPhongTrong().totalRoom === emptyRoom ? { color: "red" } : {}} >Phòng còn trống : {emptyRoom - checkPhongTrong().totalRoom}</label>
                        </Col>

                        <Col span={8} key={12} >
                            <label>Tổng tiền : {totalPrice.toLocaleString()}VND</label>
                        </Col>

                        {checked && <Col span={8} key={10}>
                            <Form.Item label="ND thanh toán" name="ghiChu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được bỏ trống nội dung chuyển khoản!',
                                    },
                                ]}>
                                <Input name="noidungck" />
                            </Form.Item>
                        </Col>}

                        {/* <Col span={8} key={9}>

                        </Col> */}

                        {/* <Col span={9} key={11} >
                            <label style={emptyRoom === 0 || checkPhongTrong().check ? { color: "red" } : {}} >Phòng còn trống : {emptyRoom - checkPhongTrong().totalRoom}</label>
                        </Col> */}
                        {/* <Col span={7} key={12} >
                            <label>Tổng tiền : {totalPrice.toLocaleString()}VND</label>
                        </Col> */}
                        {
                            checked &&
                            <Col span={8} key={13} >
                                <label>Tiền cọc : {depositPrice.toLocaleString()}VND</label>
                            </Col>
                        }

                        <Col span={8} key={14}>

                        </Col>
                        <Col span={8} key={15}>
                            {/* <p style={{ marginBottom: '20px' }}>
                                <Checkbox
                                    checked={checked}
                                    onChange={onChange}
                                >
                                    Thanh toán bằng tiền mặt
                                </Checkbox>
                            </p> */}
                            <p>
                                <Button disabled={emptyRoom === 0} ghost style={{ height: '30px' }} htmlType="submit" type="primary" size="small" >
                                    {/* {!checked ? 'Thanh toán VNPAY' : 'Thanh toán tiền mặt'} */}
                                    {dataSource.length > 0 ? "Đặt thêm loại phòng" : "Đặt phòng"}
                                </Button>

                            </p>
                        </Col>
                        <Col span={8} key={16}>

                        </Col>
                    </Row>

                </Form>
            </Card>
            {
                dataSource.length > 0 &&
                <>
                    <Table columns={columns} dataSource={dataSource.map((item, index) => ({ key: index + 1, ...item }))} />
                    <Button style={{ float: "right", marginTop: "5px" }} type="primary" onClick={() => insert()} ghost>Xác nhận đặt phòng</Button>
                </>
            }
        </div >
    );
}

export default Datphong;