import React, { useEffect, useState } from 'react';
import api from '../../../services/api'
import LayoutDonDat from './LayoutDonDat';
const CHECK_IN = "Đã nhận phòng"

function ListCheckIn(props) {
    const [idHotel, setIdHotel] = useState(null)
    const [listCheckIn, setListCheckIn] = useState([])
    useEffect(() => {
        getListCheckIn();
    }, [idHotel])

    const getListCheckIn = () => {
        const config = {
            method: "get",
            url: "/owner/manage-bookings",
            params: {
                status: CHECK_IN,
                idHotel
            }
        }
        api(config).then((res) => {
            setListCheckIn(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <LayoutDonDat data={listCheckIn} setIdHotel={setIdHotel} title={CHECK_IN.toLowerCase()} />
    );
}

export default ListCheckIn;