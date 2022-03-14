import { Col, Form, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { Link } from 'react-router-dom';
import api from '../../../services/api'

const { Option } = Select;
function ThongKeTheoCoSo(props) {
    const [hotels, setHotels] = useState([])
    const [idHotel, setIdHotel] = useState(null)
    const [columnData, setColumnData] = useState([])

    const getHotels = () => {
        api.get("/owner/hotels").then((res) => {
            if (res.data !== null) {
                setHotels(res.data.data);
            } else {
                console.log(res.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getHotels();
    }, [])

    useEffect(() => {
        if (idHotel !== null) {
            columnChart();
        }
    }, [idHotel])

    const columnChart = () => {
        const config = {
            method: "get",
            url: "/owner/thong-ke/column-chart",
            params: {
                idHotel
            }
        }

        api(config).then(res => {
            const chartData = []
            const rowData = []
            rowData.push("Fruit")
            for (let i = 0; i < res.data.data[0]["data"].length; i++) {
                rowData.push(res.data.data[0]["data"][i]);
            }
            chartData.push(rowData)
            for (let i = 1; i < res.data.data.length; i++) {
                const rowValData = []
                rowValData.push(res.data.data[i]["name"]);
                for (let j = 0; j < res.data.data[i]["data"].length; j++) {
                    rowValData.push(res.data.data[i]["data"][j]);
                }
                chartData.push(rowValData)
            }
            setColumnData({ data: chartData })
        })
    }

    const columnOptions = {
        title: 'Thống kê theo tháng từng cơ sở',
    }

    console.log(columnData && columnData?.data && columnData.data[1]);
    // if (columnData && columnData?.data) {
    //     console.log(columnData && columnData?.data && columnData.data[1]);
    //     console.log(columnData && columnData?.data && columnData.data[1]);
    // }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/thongke">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Thống kê theo cơ sở
                    </li>

                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Thống kê theo cơ sở
            </h3>
            <hr />
            <Row>
                <Col span={8} key={1}></Col>
                <Col span={8} key={2}>
                    <Form.Item label="Chọn cơ sở muốn xem">
                        <Select
                            name="hotel"
                            onChange={(hotel) => {
                                setIdHotel(hotel)
                            }} placeholder="Chọn cơ sở">
                            {hotels.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8} key={3}></Col>
            </Row>
            {
                idHotel !== null && columnData && columnData?.data && columnData.data[1] !== undefined ? <Chart
                    chartType="ColumnChart"
                    data={columnData.data}
                    options={columnOptions}
                    width="100%"
                    height="600px"
                    legendToggle
                />
                    : idHotel !== null && <h3 className="text-center text-danger mb-2 mt-2">
                        Không có dữ liệu
                    </h3>
            }
        </div>
    );
}

export default ThongKeTheoCoSo;