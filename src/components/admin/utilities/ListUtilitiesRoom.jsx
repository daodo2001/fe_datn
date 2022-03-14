import React from "react";
import { Link } from "react-router-dom";
import AddUtilitiesRoom from "./AddUtilitiesRoom";
function ListUtilitiesRoom(props) {

    return (

        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Quản lý tiện ích
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Thêm tiện ích phòng
                    </li>
                </ol>
            </nav>
            <hr />
            <h3 className="text-center mb-2 mt-2">
                Thêm tiện ích loại phòng
            </h3>
            <hr />

            <AddUtilitiesRoom />


        </div>
    );
}

export default ListUtilitiesRoom;
