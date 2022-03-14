import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Hotel from "../../admin/hotel/Hotel";
import CreateHotel from "../hotel/CreateHotel";
import User from "../user/User";
import AddUser from "../user/AddUser";
import ListRoom from "../room/ListRoom";
import TypeRoom from "../type-room/TypeRoom";
import Profile from "../profile/Profile";
import CreateTypeRoom from "../type-room/CreateTypeRoom";
import ListHotelTypeRoom from "../type-room/ListHotelTypeRoom";
import CreateHotelTypeRoom from "../type-room/CreateHotelTypeRoom";
import Dondat from './../dondat/Dondat';
import Thongke from './../thongke/Thongke';
import ThongKeTheoCoSo from './../thongke/ThongKeTheoCoSo';
import Datphong from './../dondat/Datphong';
import ConfirmDepositStaff from './../dondat/ConfirmDepositStaff'
import LichSuDonDat from "../dondat/LichSuDonDat";
import ListUtilities from './../utilities/ListUtilities';
import AddUtilities from './../utilities/AddUtilities';
import ListUtilitiesRoom from './../utilities/ListUtilitiesRoom';
import ListService from './../serviceKH/ListService';
import AddService from './../serviceKH/AddService';
import OrderService from "../dondat/OrderService";
import DoiMatKhau from '../profile/DoiMatKhau'
import PageBill from "../dondat/PageBill";
import ThongTinThanhToan from "../dondat/ThongTinThanhToan";
import BookingHistory from "../dondat-admin/BookingHistory";
import CancelBooking from "../dondat-admin/CancelBooking";
import ListCheckIn from "../dondat-admin/ListCheckIn";
import ListCheckOut from "../dondat-admin/ListCheckOut";
function Main() {
    const [status, setStatus] = useState("")
    return (
        <div>
            <Switch>
                <Route path="/admin/hotel" component={Hotel} exact={true} />
                <Route path="/admin/hotel/add" component={CreateHotel} />
                <Route path="/admin/user" component={User} exact={true} />
                <Route path="/admin/user/add" component={AddUser} />
                <Route path="/admin/room" component={ListRoom} exact={true} />
                <Route path="/admin/type-room" component={TypeRoom} exact={true} />
                <Route path="/admin/type-room/add" component={CreateTypeRoom} exact={true} />
                <Route path="/admin/hote-type-room" component={ListHotelTypeRoom} exact={true} />
                <Route path="/admin/hote-type-room/add" component={CreateHotelTypeRoom} />
                <Route path="/admin/profile" component={Profile} />
                <Route path="/admin/datphong" component={Datphong} />
                <Route path="/admin/dondat" component={() => <Dondat status={status} />} />
                <Route path="/admin/thongke" component={Thongke} />
                <Route path="/admin/thong-ke-theo-co-so" component={ThongKeTheoCoSo} />
                <Route path="/admin/staff/thong-tin-thanh-toan" component={ConfirmDepositStaff} exact={true} />
                <Route path="/admin/staff/dat-phong/thong-tin-thanh-toan" component={ThongTinThanhToan} exact={true} />
                <Route path="/admin/booking-history" component={LichSuDonDat} exact={true} />
                {/* <Route path="/admin/user/add" component={AddUser} /> */}
                <Route path="/admin/dstienich" component={ListUtilities} />
                <Route path="/admin/themtienich" component={AddUtilities} />
                <Route path="/admin/themtienichphong" component={ListUtilitiesRoom} />
                <Route path="/admin/dsdichvu" component={ListService} />
                <Route path="/admin/themdichvu" component={AddService} />
                <Route path="/admin/order-service" component={OrderService} />
                <Route path="/admin/change-password" component={DoiMatKhau} />
                <Route path="/admin/print-bill/:id" component={({ match, history }) => <PageBill match={match} history={history} setStatus={setStatus} />} />
                <Route path="/admin/don-dat/lich-su-don-dat" component={() => <BookingHistory />} />
                <Route path="/admin/don-dat/cancel-booking" component={() => <CancelBooking />} />
                <Route path="/admin/don-dat/check-in" component={() => <ListCheckIn />} />
                <Route path="/admin/don-dat/check-out" component={() => <ListCheckOut />} />
            </Switch>
        </div>
    );
}

export default Main;