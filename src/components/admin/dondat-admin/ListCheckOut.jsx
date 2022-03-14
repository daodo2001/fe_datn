import React, { useEffect, useState } from 'react';
import api from '../../../services/api'
import LayoutDonDat from './LayoutDonDat';
const CHECK_OUT = "Đã trả phòng"

function ListCheckOut(props) {
    const [idHotel, setIdHotel] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        getListCheckOut();
    }, [idHotel])

    const getListCheckOut = () => {
        const config = {
            method: "get",
            url: "/owner/manage-bookings",
            params: {
                status: CHECK_OUT,
                idHotel
            }
        }
        api(config).then((res) => {
            setData(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <LayoutDonDat data={data} setIdHotel={setIdHotel} title={CHECK_OUT.toLowerCase()} />
    );
}

export default ListCheckOut;