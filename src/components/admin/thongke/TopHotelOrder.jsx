import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api'
function TopHotelOrder(props) {
    const [topUserOrder, setTopUserOrder] = useState([])
    useEffect(() => {
        api.get("/owner/thong-ke/top-hotel-order").then(res => {
            setTopUserOrder(res.data.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])


    const columns = [
        {
            title: 'Tên cơ sở',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Tổng tiền',
        //     className: 'column-money',
        //     dataIndex: 'totalPrice',
        //     key: 'totalPrice',
        //     render: totalPrice => {
        //         return (
        //             <span>{totalPrice.toLocaleString()} VND</span>
        //         )
        //     }

        // },
        {
            title: 'Tổng lượt đặt phòng',
            dataIndex: 'totalOrder',
            key: 'totalOrder',
            align: 'center',
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={topUserOrder}
            pagination={{ defaultPageSize: 5 }}
            bordered
            title={() => 'Top cơ sở có đơn đặt phòng nhiều nhất'}
        />
    );
}

export default TopHotelOrder;