import { Modal, Form, Checkbox, Input, Row, Col, Card, notification, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api'
import TokenService from '../../../services/token.service';
import moment from 'moment';
const { TextArea } = Input;
const { Text } = Typography;
function Huyphong(props) {
    const { isModalVisibleHuyPhong, setIsModalVisibleHuyPhong, handleCancelHuyPhong, huyPhong, setFilters } = props;
    const [isHoanHuy, setIsHoanHuy] = useState(false)
    const [lyDo, setLyDo] = useState("")
    const [REASON] = useState([
        "Tôi không đặt nữa",
        "Lý do cá nhân",
        "Số lượng nhu cầu của khách có thay đổi",
        "Đổi ngày đi, về",
        "Tìm được phòng khác thay thế"
    ])
    const { id } = TokenService.getUser();
    const [typeMsg] = useState({
        success: "success",
        danger: "danger"
    })
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues.toString());
        setLyDo(checkedValues.toString())
    }

    const [form] = Form.useForm();

    const huyLich = (data) => {
        const config = {
            method: "put",
            url: `/staff/cancel-room/${huyPhong.idBooking}`,
            data
        }
        api(config).then(res => {
            setFilters({ status: res.data.data.status })
            notification["success"]({
                message: res.data.message,
            });
        }).catch(err => {
            console.log(err);
        })
        form.resetFields();
        setIsModalVisibleHuyPhong(false)
    }

    const onFinish = () => {
        let hours = moment().diff(moment(huyPhong.createDateCheck), 'hours');
        var data = {
            idBooking: huyPhong.idBooking,
            reason: lyDo,
            idUser: id,
            vnp_TxnRef: huyPhong.soHoaDon,
            amountReq: parseInt(huyPhong.amout).toString(),
            vnp_TransDate: huyPhong.tranDate
        }

        if (hours > 24) {
            console.log("true")
            data.hoanHuy = false
        } else {
            console.log("false")
            data.hoanHuy = true
        }

        huyLich(data)
    };

    useEffect(() => {
        let hours = moment().diff(moment(huyPhong.createDateCheck), 'hours');
        var check = false;
        if (hours > 24) {
            console.log("true")

        } else {
            console.log("false")
            check = true;
        }
        setIsHoanHuy(check)
    }, [huyPhong])

    return (

        <Modal border-radius={100} width={650} title="Hủy đơn phòng "
            cancelText="Quay lại"
            okText="Đồng ý hủy phòng"
            visible={isModalVisibleHuyPhong} onOk={form.submit} onCancel={handleCancelHuyPhong} >
            <Form form={form} onFinish={onFinish}>

                <Card style={{ background: 'white' }}>
                    <Row>
                        <Col span={24}>
                            {
                                !isHoanHuy && <Text type="danger" style={{ marginLeft: "150px", fontSize: "20px" }}>Đơn đặt không được hủy miễn phí</Text>
                            }
                            {
                                isHoanHuy &&
                                <Text type="success" style={{ marginLeft: "170px", fontSize: "20px" }}>Đơn đặt hủy miễn phí</Text>
                            }
                        </Col>
                    </Row>
                    <Card style={{ background: '#e7fde9', borderRadius: '10px', marginTop: '20px' }}>
                        <Row gutter={[10, 10]}>
                            <Col span={12}>
                                <p > Cơ sở : {huyPhong.nameHotel}</p>
                            </Col>
                            <Col span={12}>
                                <p> Loại phòng : {huyPhong.nameTypeRoom}</p>
                            </Col>
                            <Col span={12}>
                                <p> Ngày nhận phòng: {huyPhong.dateIn}</p>
                            </Col>
                            <Col span={12}>
                                <p> Ngày trả phòng: {huyPhong.dateOut}</p>
                            </Col>
                        </Row>
                        <hr />
                        <p style={{ fontSize: '15px' }}> Tổng số phòng: {huyPhong.totalRoom}</p>
                        <hr />


                    </Card>
                    <Card style={{ background: 'white', borderRadius: '10px' }} >
                        <p style={{ fontSize: '15px', fontWeight: '150px', marginBottom: '10px' }}> Lý do khách hủy phòng</p>
                        <Form.Item name="reason" >
                            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                                <Row>
                                    {REASON.map((item, index) => (
                                        <Col key={index} span={8}>
                                            <Checkbox name='reason' value={item}>{item}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                                <p>Lý do khác:</p>
                                <TextArea style={{ background: 'white' }} rows={4} />
                            </Checkbox.Group>
                        </Form.Item>
                    </Card>

                </Card>
            </Form>
        </Modal >
    );
}
export default Huyphong;