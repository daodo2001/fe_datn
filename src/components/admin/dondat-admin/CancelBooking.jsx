import { Select } from 'antd';
import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import LayoutDonDat from './LayoutDonDat';
const CANCELBOOKING = "Đã hủy phòng"
function CancelBooking(props) {
    const [cancelBookings, setCancelBookings] = useState([])
    const [idHotel, setIdHotel] = useState(null)

    useEffect(() => {
        getCancelBookings();
    }, [idHotel])

    const getCancelBookings = () => {
        const config = {
            method: "get",
            url: "/owner/manage-bookings",
            params: {
                status: CANCELBOOKING,
                idHotel
            }
        }
        api(config).then((res) => {
            setCancelBookings(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <LayoutDonDat title={CANCELBOOKING.toLowerCase()} data={cancelBookings} setIdHotel={setIdHotel} />
    );
}

export default CancelBooking;