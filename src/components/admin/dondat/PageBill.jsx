import { Button, Card, Col, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import api from '../../../services/api'
import logo from "../../../assets/images/FPT_Polytechnic.png";
import "./ChiTietHoaDon.css"
import TokenService from '../../../services/token.service';
import { Link, Redirect } from 'react-router-dom';

function PageBill(props) {
    const { match, history, setStatus } = props;

    const [orderDetails, setOrderDetails] = useState({})
    const { fullName,
        dateIn,
        dateOut,
        totalRoom,
        totalPrice,
        nameHotel, phone,
        nameTypeRoom,
        idTransaction,
        status,
        depositPrice,
        nameCosts,
        priceCosts
    } = orderDetails
    const day = new Date();
    const [tongSoNgay, setTongSoNgay] = useState(0)
    const [orderServices, setOrderServices] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const { id } = TokenService.getUser();
    const idBooking = match.params.id;
    useEffect(() => {
        const config = {
            method: "get",
            url: "/staff/chi-tiet-hoa-don",
            params: {
                idBooking,
                idUser: id
            }
        }
        api(config).then(res => {
            setOrderDetails(res.data.data)
        }).catch(err => {
            // window.location.assign("/admin")
        })
    }, [idBooking])

    useEffect(() => {
        let ngayDen = dateIn !== undefined ? dateIn.split("/").reverse().join("-") : null;
        let ngayDi = dateOut !== undefined ? dateOut.split("/").reverse().join("-") : null;
        let days = moment(ngayDi).diff(moment(ngayDen), "days");
        setTongSoNgay(days);
    }, [dateIn, dateOut])

    useEffect(() => {
        var newPriceCosts = priceCosts !== null ? priceCosts : 0
        setTongTien(totalPrice + orderServices.reduce((sum, { quantity, totalPrice }) => sum + totalPrice * quantity, 0) + newPriceCosts)
    }, [orderServices])

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
    }, [idTransaction])


    return (
        <>
            <div className='alt'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/admin/dondat">Nhân viên</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Thông tin hóa đơn
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Chi tiết hóa đơn
                        </li>
                    </ol>
                </nav>
                <hr />
                <h3 className="text-center mb-2 mt-2">
                    Chi tiết hóa đơn
                </h3>
                <hr />
            </div>
            <Card style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#f7f7f7' }}>
                <img style={{ width: 200, marginBottom: 40 }} src={logo} alt="logo" />
                <div style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
                    HÓA ĐƠN THANH TOÁN DỊCH VỤ
                </div>
                <br />
                <div style={{ float: 'right' }}> {nameHotel}:<i> {day.getDate() + "-" + (day.getMonth() + 1) + "-" + day.getFullYear()}</i></div>
                <br />
                <hr />
                <Row>
                    <Col span={12}>
                        <div className="bill-field">Tên: {fullName}</div>
                        <div className="bill-field">Số điện thoại: {phone}</div>
                        <div className="bill-field">Loại phòng: {nameTypeRoom}</div>
                        <div className="bill-field">Số phòng: {totalRoom}</div>
                    </Col>
                    <Col span={12}>
                        <div className="bill-field">Ngày đến: {dateIn}</div>
                        <div className="bill-field">Ngày đi: {dateOut}</div>
                        <div className="bill-field">Số đêm: {tongSoNgay}</div>
                        <div className="bill-field" style={{ fontWeight: "bold" }}>Tiền phòng: {totalPrice && totalPrice.toLocaleString()}</div>
                    </Col>
                </Row>
                {orderServices.length > 0 && <>
                    <hr />
                    <Row>
                        <Col span={6}>
                            <div style={{ fontWeight: "bold" }}>DỊCH VỤ</div>
                            {orderServices.length > 0 && orderServices.map((item, index) => (
                                <div className="bill-field" key={index}>{item.name}</div>
                            ))}
                        </Col>
                        <Col span={6}>
                            <div style={{ fontWeight: "bold" }}>Số lượng</div>
                            {orderServices.length > 0 && orderServices.map((item, index) => (
                                <div className="bill-field" key={index}>{item.quantity}</div>
                            ))}
                        </Col>
                        <Col span={6} >
                            <div style={{ fontWeight: "bold" }}>Đơn giá</div>
                            {orderServices.length > 0 && orderServices.map((item, index) => (
                                <div className="bill-field" key={index}>{item.totalPrice.toLocaleString()}</div>
                            ))}
                        </Col>
                        <Col span={6} >
                            <div style={{ fontWeight: "bold" }}>SỐ TIỀN</div>
                            {orderServices.length > 0 && orderServices.map((item, index) => (
                                <div className="bill-field" key={index}>{(item.totalPrice * item.quantity).toLocaleString()}</div>
                            ))}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}> <div className="bill-field" style={{ fontWeight: "bold" }}>Tổng dịch vụ</div></Col>
                        <Col span={6}>  <div className="bill-field" style={{ fontWeight: "bold" }}>{orderServices.length > 0 ? orderServices.reduce((sum, { quantity }) => sum + quantity, 0) : 0}</div></Col>
                        <Col span={6}></Col>
                        <Col span={6}>
                            <div className="bill-field" style={{ fontWeight: "bold" }}>{(orderServices.length > 0 ? orderServices.reduce((sum, { quantity, totalPrice }) => sum + totalPrice * quantity, 0) : 0).toLocaleString()}</div>
                        </Col>
                    </Row>
                </>}

                { // phí phát sinh
                    (nameCosts, priceCosts) && <>
                        <hr />
                        <Row>
                            <Col span={6}>
                                <div style={{ fontWeight: "bold" }}>Phí phát sinh</div>
                                <div className="bill-field">{nameCosts}</div>
                            </Col>
                            <Col span={6}>
                            </Col>
                            <Col span={6} >
                            </Col>
                            <Col span={6} >
                                <div style={{ fontWeight: "bold" }}>SỐ TIỀN</div>
                                <div className="bill-field">{priceCosts && priceCosts.toLocaleString()}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}> <div className="bill-field" style={{ fontWeight: "bold" }}>Tiền PPS</div></Col>
                            <Col span={6}>
                            </Col>
                            <Col span={6}></Col>
                            <Col span={6}>
                                <div className="bill-field" style={{ fontWeight: "bold" }}>
                                    {priceCosts && priceCosts.toLocaleString()}
                                </div>
                            </Col>
                        </Row>
                    </>}
                <hr />
                <Row>
                    <Col span={16}>
                        <div><i>Đã bao gồm thuế VAT</i></div>
                    </Col>
                    <Col span={8}>
                        <div style={{ fontWeight: "bold" }}>Tổng số tiền: {tongTien.toLocaleString()}</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <div><i></i></div>
                    </Col>
                    <Col span={8}>
                        <div style={{ fontWeight: "bold" }}>Tiền khách cọc : {depositPrice && depositPrice.toLocaleString()}</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <div><i></i></div>
                    </Col>
                    <Col span={8}>
                        <div style={{ fontWeight: "bold" }}>Tiền khách thừa : {depositPrice && (depositPrice - tongTien < 0 ? 0 : depositPrice - tongTien).toLocaleString()}</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <div><i></i></div>
                    </Col>
                    <Col span={8}>
                        <div style={{ fontWeight: "bold" }}>Thu thêm : {(tongTien - depositPrice < 0 ? 0 : tongTien - depositPrice).toLocaleString()}</div>
                    </Col>
                </Row>

            </Card>
            <Row>
                <Col span={12}>
                    <Button className="alt" style={{ marginTop: 20, float: "right" }} type="primary" ghost onClick={() => window.print()}>IN HÓA ĐƠN</Button>
                </Col>
                <Col span={12}>
                    <Button
                        className="alt"
                        style={{ marginTop: 20, marginLeft: "10px" }}
                        type="danger"
                        ghost
                        onClick={() => setStatus(status)}
                    >
                        <Link to="/admin/dondat">Quay lại</Link>
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default PageBill;