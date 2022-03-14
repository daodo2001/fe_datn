import React, { useEffect, useState } from "react";
import "../../booking/hoteldetail.css";
import check from '../../../assets/images/check.png'
import fail from "../../../assets/images/fail.jpg";
import { Button } from "antd";
import { Link } from "react-router-dom";
import api from '../../../services/api'
function ConfirmDepositStaff(props) {

    const [hoaDon, setHoaDon] = useState({})
    const [checkHoaDon, setCheckHoaDon] = useState(false)

    useEffect(() => {
        setCheckHoaDon(true)
        if (window.location.search) {
            api.get(`/staff/thong-tin-thanh-toan${window.location.search}`).then(res => {
                setCheckHoaDon(false)
                setHoaDon(res.data.data)
            }).catch(err => {
                setCheckHoaDon(true)
            })
        }

    }, [])

    return (
        <>
            <div className="main-info-deposit">
                {
                    !checkHoaDon && <div>
                        <img className="deposit-image" src={check} alt="success" />
                        <div style={{ textAlign: "center", fontSize: 15, marginTop: 30 }}>
                            GIAO DỊCH THÀNH CÔNG
                        </div>
                        <div style={{ textAlign: "center", fontSize: 25, marginTop: 50 }}>
                            THÔNG TIN THANH TOÁN
                        </div>
                        <div className="main-info">
                            <div className="label-info">Mã giao dịch: {hoaDon.maGd} </div>
                            <hr />
                            <div className="label-info">Mã hóa đơn: {hoaDon.soHoaDon} </div>
                            <hr />
                            <div className="label-info">Số tiền: {hoaDon.soTien}</div>
                            <hr />
                            <div className="label-info">Ngân hàng: {hoaDon.bankCode}</div>
                            <hr />
                            <div className="label-info">Nội dung: {hoaDon.noidungCk} </div>
                            <hr />
                            <div className="label-info">Ngày tạo: {hoaDon.createDate} </div>
                            <hr />
                            <Link to="/admin">
                                <Button type="primary" style={{ marginLeft: 90, marginTop: 50 }}>
                                    Quay Lại Trang Chủ
                                </Button>
                            </Link>
                        </div>
                    </div>
                }
                {
                    checkHoaDon && <div>
                        <img className="deposit-image" src={fail} alt="success" />
                        <div style={{ textAlign: "center", fontSize: 25, marginTop: 50 }}>
                            GIAO DỊCH KHÔNG THÀNH CÔNG
                        </div>
                        <div className="main-info">
                            <Link to="/admin">
                                <Button type="primary" style={{ marginLeft: 90, marginTop: 50 }}>
                                    Quay Lại Trang Chủ
                                </Button>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default ConfirmDepositStaff;
