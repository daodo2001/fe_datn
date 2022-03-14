import { Popover, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api'
import TokenService from '../../../services/token.service';
function LichSuDonDat(props) {
    const [bkHistory, setBkHistory] = useState([])
    const { id } = TokenService.getUser()
    useEffect(() => {
        api.get(`/staff/booking-history/${id}`).then(res => {
            setBkHistory(res.data.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Họ Và Tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ngày đến cũ',
            dataIndex: 'dateIn',
            key: 'dateIn',
        },
        {
            title: 'Ngày về cũ',
            dataIndex: 'dateOut',
            key: 'dateOut',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Loại phòng cũ',
            dataIndex: 'nameTypeRoom',
            key: 'nameTypeRoom',
        },
        {
            title: 'Tổng số phòng',
            dataIndex: 'totalRoom',
            key: 'totalRoom',
        },
        {
            title: 'Lịch đã đổi',
            key: Math.random().toString(),
            render: (reason, record, index) => {
                console.log(record);
                return (
                    <Popover
                        placement="leftTop"
                        title={<b>Chi tiết lịch đã đổi</b>}
                        content={() => (
                            <div>
                                <p>Ngày đổi : <b>{record.createDate}</b></p>
                                <p>Ngày đến mới: <b>{record.newDateIn}</b></p>
                                <p>Ngày về mới: <b>{record.newDateOut}</b></p>
                                <p>Tổng số phòng mới: <b>{record.newTotalRoom}</b></p>
                                <p>Loại phòng mới: <b>{record.newNameTypeRoom}</b></p>
                                <p>Người chuyển: <b>{record.username}</b></p>
                            </div>
                        )}
                        trigger="hover"
                    >
                        <span
                            style={{
                                "color": "#1890ff", "textDecoration": "none",
                                "backgroundColor": "transparent", "outline": "none", "cursor": "pointer", "transition": "color 0.3s"
                            }}>
                            Chi tiết lịch đổi
                        </span>
                    </Popover>
                )
            },
        },
    ]

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dondat">Nhân viên</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý đơn đặt
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Lịch sử đơn đặt
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Lịch sử đơn đặt
            </h3>
            <hr />
            <Table columns={columns} dataSource={bkHistory.reverse()} />
        </>

    );
}

export default LichSuDonDat;