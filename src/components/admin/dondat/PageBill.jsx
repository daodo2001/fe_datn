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
                            <Link to="/admin/dondat">Nh??n vi??n</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Th??ng tin h??a ????n
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Chi ti???t h??a ????n
                        </li>
                    </ol>
                </nav>
                <hr />
                <h3 className="text-center mb-2 mt-2">
                    Chi ti???t h??a ????n
                </h3>
                <hr />
            </div>
            <Card style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#f7f7f7' }}>
                <img style={{ width: 200, marginBottom: 40 }} src={logo} alt="logo" />
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
                        <div className="bill-field" style={{ fontWeight: "bold" }}>Ti???n ph??ng: {totalPrice && totalPrice.toLocaleString()}</div>
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
                            <div style={{ fontWeight: "bold" }}>S??? TI???N</div>
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

                { // ph?? ph??t sinh
                    (nameCosts, priceCosts) && <>
                        <hr />
                        <Row>
                            <Col span={6}>
                                <div style={{ fontWeight: "bold" }}>Ph?? ph??t sinh</div>
                                <div className="bill-field">{nameCosts}</div>
                            </Col>
                            <Col span={6}>
                            </Col>
                            <Col span={6} >
                            </Col>
                            <Col span={6} >
                                <div style={{ fontWeight: "bold" }}>S??? TI???N</div>
                                <div className="bill-field">{priceCosts && priceCosts.toLocaleString()}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}> <div className="bill-field" style={{ fontWeight: "bold" }}>Ti???n PPS</div></Col>
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
                        <div><i>???? bao g???m thu??? VAT</i></div>
                    </Col>
                    <Col span={8}>
                        <div style={{ fontWeight: "bold" }}>T???ng s??? ti???n: {tongTien.toLocaleString()}</div>
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
                        <div style={{ fontWeight: "bold" }}>Thu th??m : {(tongTien - depositPrice < 0 ? 0 : tongTien - depositPrice).toLocaleString()}</div>
                    </Col>
                </Row>

            </Card>
            <Row>
                <Col span={12}>
                    <Button className="alt" style={{ marginTop: 20, float: "right" }} type="primary" ghost onClick={() => window.print()}>IN H??A ????N</Button>
                </Col>
                <Col span={12}>
                    <Button
                        className="alt"
                        style={{ marginTop: 20, marginLeft: "10px" }}
                        type="danger"
                        ghost
                        onClick={() => setStatus(status)}
                    >
                        <Link to="/admin/dondat">Quay l???i</Link>
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default PageBill;