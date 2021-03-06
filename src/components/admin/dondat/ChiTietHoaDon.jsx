import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import api from '../../../services/api'
import TokenService from '../../../services/token.service';
import "./ChiTietHoaDon.css"
function ChiTietHoaDon(props) {

    const { isModalVisibleBill, setModalVisibleBill, orderDetails, donDats, setDonDats, filters, setFilters } = props;
    const { fullName, dateIn, dateOut, totalRoom, totalPrice, nameHotel, phone, nameTypeRoom, idTransaction, idBooking, status, depositPrice } = orderDetails

    const { id } = TokenService.getUser();
    const day = new Date();
    const [tongSoNgay, setTongSoNgay] = useState(0)
    const [orderServices, setOrderServices] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const [checked, setChecked] = useState(false)
    const [phiPhatSinh, setPhiPhatSinh] = useState(0)
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        setPhiPhatSinh(0)
        setModalVisibleBill(false)
        setChecked(false)
    }

    useEffect(() => {
        let ngayDen = dateIn !== undefined ? dateIn.split("/").reverse().join("-") : null;
        let ngayDi = dateOut !== undefined ? dateOut.split("/").reverse().join("-") : null;
        let days = moment(ngayDi).diff(moment(ngayDen), "days");
        setTongSoNgay(days);
    }, [dateIn, dateOut])

    useEffect(() => {
        setTongTien(totalPrice + orderServices.reduce((sum, { quantity, totalPrice }) => sum + totalPrice * quantity, 0) + phiPhatSinh)
    }, [orderServices, phiPhatSinh])

    const getOrderDetails = () => {
        const config = {
            method: "get",
            url: "/staff/order-details",
            params: {
                idTransaction: idTransaction
            }
        }
        api(config).then(res => {
            setOrderServices(res.data.data)
        }).catch(err => {
            console.log(err);
            setOrderServices([])
        })
    }

    useEffect(() => {
        if (idTransaction !== null) {
            getOrderDetails();
        }
    }, [idTransaction, totalPrice])

    const onFinish = (fieldsValue) => {
        const { nameCostsIncurred, priceCostsIncurred } = fieldsValue
        const data = {
            idBooking, status, totalPrice: tongTien, id_creator: id,
            nameCostsIncurred, priceCostsIncurred, costsIncurred: checked
        }
        xacNhanTraPhong(data)
    }

    const xacNhanTraPhong = (data) => {
        const config = {
            method: "post",
            url: "/staff/confirm-booking",
            data: data
        }
        api(config).then(res => {
            setModalVisibleBill(false)
            setChecked(false)
            form.resetFields();
            setFilters({ ...filters, status: res.data.data.status })
            const indexToDonDat = donDats.findIndex(
                (donDat) => donDat.idBooking === idBooking
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
    return (
        <Modal
            visible={isModalVisibleBill}
            okText="X??c nh???n tr??? ph??ng"
            cancelText="H???y"
            onOk={form.submit}
            onCancel={handleCancel}
            closeIcon={handleCancel}
            width={600}
        >
            <div style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
                H??A ????N THANH TO??N D???CH V???
            </div>
            <br />
            <div style={{ float: 'right' }}> {nameHotel}:<i> {day.getDate() + "-" + (day.getMonth() + 1) + "-" + day.getFullYear()}</i></div>
            <br />
            <hr />
            <Row>
                <Col span={12}>
                    <div className="bill-field">T??n: {fullName}</div>
                    <div className="bill-field">S??? ??i???n tho???i: {phone}</div>
                    <div className="bill-field">Lo???i ph??ng: {nameTypeRoom}</div>
                    <div className="bill-field">S??? ph??ng: {totalRoom}</div>
                </Col>
                <Col span={12}>
                    <div className="bill-field">Ng??y ?????n: {dateIn}</div>
                    <div className="bill-field">Ng??y ??i: {dateOut}</div>
                    <div className="bill-field">S??? ????m: {tongSoNgay}</div>
                    <div className="bill-field" style={{ fontWeight: "bold" }}>Ti???n ph??ng: {totalPrice !== undefined && totalPrice.toLocaleString()}</div>
                </Col>
            </Row>

            {orderServices.length > 0 && <>
                <hr />
                <Row>
                    <Col span={6}>
                        <div style={{ fontWeight: "bold" }}>D???CH V???</div>
                        {orderServices.length > 0 && orderServices.map((item, index) => (
                            <div className="bill-field" key={index}>{item.name}</div>
                        ))}
                    </Col>
                    <Col span={6}>
                        <div style={{ fontWeight: "bold" }}>S??? l?????ng</div>
                        {orderServices.length > 0 && orderServices.map((item, index) => (
                            <div className="bill-field" key={index}>{item.quantity}</div>
                        ))}
                    </Col>
                    <Col span={6} >
                        <div style={{ fontWeight: "bold" }}>????n gi??</div>
                        {orderServices.length > 0 && orderServices.map((item, index) => (
                            <div className="bill-field" key={index}>{item.totalPrice.toLocaleString()}</div>
                        ))}
                    </Col>
                    <Col span={6} >
                        <div style={{ fontWeight: "bold" }}>Th??nh ti???n</div>
                        {orderServices.length > 0 && orderServices.map((item, index) => (
                            <div className="bill-field" key={index}>{(item.totalPrice * item.quantity).toLocaleString()}</div>
                        ))}
                    </Col>
                </Row>
                <Row>
                    <Col span={6}> <div className="bill-field" style={{ fontWeight: "bold" }}>T???ng d???ch v???</div></Col>
                    <Col span={6}>  <div className="bill-field" style={{ fontWeight: "bold" }}>{orderServices.length > 0 ? orderServices.reduce((sum, { quantity }) => sum + quantity, 0) : 0}</div></Col>
                    <Col span={6}></Col>
                    <Col span={6}>
                        <div className="bill-field" style={{ fontWeight: "bold" }}>{(orderServices.length > 0 ? orderServices.reduce((sum, { quantity, totalPrice }) => sum + totalPrice * quantity, 0) : 0).toLocaleString()}</div>
                    </Col>
                </Row>
            </>}
            <hr />
            <Form form={form} onFinish={onFinish} labelCol={{
                span: 8,
            }}>
                <Row>
                    <Col span={6}>
                        <Form.Item name="checkPhiPhatSinh">
                            <Checkbox onChange={() => setChecked(!checked)} value={checked}>Ph?? ph??t sinh</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6}></Col>
                    <Col span={6}>
                    </Col>
                    {checked && <>
                        <Col span={18}>
                            <Form.Item
                                label="M?? t???"
                                name="nameCostsIncurred"
                                rules={[
                                    {
                                        required: true,
                                        message: "Kh??ng ???????c b??? tr???ng m?? t???",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}></Col>
                        <Col span={18}>
                            <Form.Item
                                label="Gi??"
                                name="priceCostsIncurred"
                                rules={[
                                    {
                                        required: true,
                                        message: "Kh??ng ???????c b??? tr???ng gi??",
                                    },
                                ]}>
                                <InputNumber
                                    style={{
                                        width: "100%"
                                    }}
                                    precision={0}
                                    min={0}
                                    max={10000000}
                                    onChange={(val) => {
                                        setPhiPhatSinh(val)
                                    }} />
                            </Form.Item>
                        </Col>
                    </>}
                </Row>
            </Form>
            <hr />
            <Row>
                <Col span={16}>
                    <div><i>???? bao g???m thu??? VAT</i></div>
                </Col>
                <Col span={8}>
                    <div style={{ fontWeight: "bold" }}>T???ng ti???n : {tongTien.toLocaleString()}</div>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <div><i></i></div>
                </Col>
                <Col span={8}>
                    <div style={{ fontWeight: "bold" }}>Ti???n kh??ch c???c : {depositPrice && depositPrice.toLocaleString()}</div>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <div><i></i></div>
                </Col>
                <Col span={8}>
                    <div style={{ fontWeight: "bold" }}>Ti???n kh??ch th???a : {depositPrice && (depositPrice - tongTien < 0 ? 0 : depositPrice - tongTien).toLocaleString()}</div>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <div><i></i></div>
                </Col>
                <Col span={8}>
                    <div style={{ fontWeight: "bold" }}>
                        Ph?? ph??t sinh : {phiPhatSinh && phiPhatSinh.toLocaleString()}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <div><i></i></div>
                </Col>
                <Col span={8}>
                    <div style={{ fontWeight: "bold" }}>Thu th??m : {(tongTien - depositPrice < 0 ? 0 : tongTien - depositPrice).toLocaleString()}</div>
                </Col>
            </Row>

        </Modal >
    );
}

export default ChiTietHoaDon;