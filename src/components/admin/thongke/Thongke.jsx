

import { Statistic, Card, Row, Col, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopUserOrder from "./TopUserOrder";
import TopHotelOrder from "./TopHotelOrder";
import api from '../../../services/api'
import { Chart } from "react-google-charts";
const { Option } = Select;
function Thongke(props) {

    const [componentSize] = useState('default');
    const [form] = Form.useForm();
    const [totalUsers, setTotalUser] = useState({})
    const [totalHotel, setTotalHotel] = useState({})
    const [totalBookings, setTotalBookings] = useState({})
    const [totalRevenue, setTotalRevenue] = useState({})
    const [barData, setBarData] = useState([])

    const barOptions = {
        title: 'Doanh thu các cơ sở',
    };

    useEffect(() => {
        api.get("/owner/thong-ke/total-all").then(res => {
            console.log(res);
            setTotalUser(res.data.data.totalUsers)
            setTotalHotel(res.data.data.totalHotel)
            setTotalBookings(res.data.data.totalBookings)
            setTotalRevenue(res.data.data.totalRevenue)
        })
        barChart();
    }, [])

    const barChart = () => {
        api.get("/owner/thong-ke/chart").then(res => {
            const chartData = [['Hotel', 'Doanh thu']]
            for (let i = 0; i < res.data.data[1].length; i += 1) {
                chartData.push([res.data.data[0][i], res.data.data[1][i]])
            }
            setBarData({ data: chartData })
        })
    }

    return (
        <div >
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/thongke">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý thống kê
                    </li>

                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Thống kê
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
                    // onFinish={onFinish}
                    autoComplete="off">
                    <Row gutter={[45, 30]}>


                        <Col span={12} key={1}>
                            <Card style={{ borderRadius: '30px' }}>
                                <Row align="middle" gutter={[45, 30]}>
                                    <Col span={24}>
                                        <div style={{ marginTop: '35px' }} className="site-statistic-demo-card">
                                            <Row gutter={[30, 30]}>
                                                <Col span={12}>
                                                    <Card style={{ height: '150px', background: '#EEEEEE', borderRadius: '20px' }}>
                                                        <Statistic
                                                            title="Tổng doanh thu"
                                                            value={totalRevenue.total}
                                                            precision={0}
                                                            valueStyle={{ color: '#00CC00' }}
                                                        />
                                                    </Card>
                                                </Col>
                                                <Col span={12}>
                                                    <Card style={{ height: '150px', background: '#66FFFF', borderRadius: '20px' }}>
                                                        <Statistic
                                                            title="Tổng lượt đặt phòng"
                                                            value={totalBookings.total}
                                                            precision={0}
                                                            valueStyle={{ color: '#black' }}
                                                        />
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>

                                    <Col span={24}>
                                        <div className="site-statistic-demo-card">
                                            <Row gutter={[30, 30]}>
                                                <Col span={12}>
                                                    <Card style={{ height: '150px', background: '#66FFFF', borderRadius: '20px' }}>
                                                        <Statistic
                                                            title="Tổng khách hàng"
                                                            value={totalUsers.total}
                                                            precision={0}
                                                            valueStyle={{ color: '#00CC00' }}
                                                        />
                                                    </Card>
                                                </Col>
                                                <Col span={12}>
                                                    <Card style={{ height: '150px', background: '#EEEEEE', borderRadius: '20px' }} >
                                                        <Statistic
                                                            title="Tổng cơ sở"
                                                            value={totalHotel.total}
                                                            precision={0}
                                                            valueStyle={{ color: 'black' }}

                                                        />
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>

                                </Row>
                            </Card>
                        </Col>

                        <Col span={12} key={2}>
                            <Chart
                                chartType="BarChart"
                                data={barData.data}
                                options={barOptions}
                                width="100%"
                                height="400px"
                                legendToggle
                            />
                        </Col>


                    </Row>

                    <div style={{ marginTop: '50px' }}>

                        <Row gutter={[45, 30]}>

                            <Col span={12}>
                                <TopUserOrder />
                            </Col>
                            <Col span={12}>
                                <TopHotelOrder />
                            </Col>


                        </Row>
                    </div>

                </Form>


            </Card>
        </div >
    );
}

export default Thongke;
