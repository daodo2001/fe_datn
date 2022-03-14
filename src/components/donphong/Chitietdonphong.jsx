import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Modal, Form } from 'antd';
import api from '../../services/api'
function Chitietdonphong(props) {
    const { donPhong } = props;

    const { isModalVisible, handleCancel } = props;
    const [ctHoaDon, setCtHoaDon] = useState({})

    useEffect(() => {
        const config = {
            method: 'get',
            url: '/user/chi-tiet-dat-phong',
            params: {
                id: donPhong.idBooking
            },
        }

        api(config).then(res => {
            setCtHoaDon(res.data.data)
        }).catch(err => {
            console.log(err);
        })
    }, [donPhong.idBooking])

    return (

        <Modal border-radius={100} width={850} title="Chi tiết hóa đơn"

            visible={isModalVisible} onCancel={handleCancel} okButtonProps={{ style: { display: 'none' } }} >
            <Form>
                <Row gutter={[40, 30]}>

                    <Col span={12}>
                        <p> <img alt="" src="https://img.icons8.com/ios-glyphs/30/000000/recursion.png" /> Mã giao dịch: {ctHoaDon.maGd}</p>
                        <hr />

                    </Col>

                    <Col span={12}>
                        <p> <img alt="" src="https://img.icons8.com/material-rounded/32/000000/cost.png" /> Số hóa đơn: {ctHoaDon.soHoaDon}</p>
                        <hr />

                    </Col>

                    <Col span={12}>
                        <p> <img alt="" src="https://img.icons8.com/ios-glyphs/30/000000/us-dollar.png" /> Số tiền: {ctHoaDon.soTien}</p>
                        <hr />

                    </Col>

                    <Col span={12}>
                        <p> <img alt="" src="https://img.icons8.com/ios-glyphs/30/000000/bill.png" /> Nội dung thanh toán: {ctHoaDon.noidungCk}</p>
                        <hr />

                    </Col>
                    <Col span={12}>
                        <p> <img alt="" src="https://img.icons8.com/ios-filled/30/000000/order-history.png" /> Trạng thái: {ctHoaDon.status === "00" ? "Thành công" : ""}</p>
                        <hr />

                    </Col>
                    <Col span={12}>
                        <p> <img alt="" src="https://img.icons8.com/ios-glyphs/30/000000/pay-date.png" /> Ngày tạo: {ctHoaDon.createDate}</p>
                        <hr />

                    </Col>
                </Row>
            </Form>
        </Modal >
    );
}
export default Chitietdonphong;