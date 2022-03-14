import React from 'react';

function Utilities(props) {
    return (
        <div>
            <label className="title-utilities">Tiện ích khách sạn</label>
            <div className="images-utility">
                <img className="icon-utility" src="/assets/images/americanExpress.png" alt="American Express"/>
                <label>American Express</label>
                <img className="icon-utility" src="/assets/images/Amenities_wifi.png" alt="Wifi Miễn Phí"/>
                <label>Wifi Miễn Phí</label>
                <img className="icon-utility" src="/assets/images/baidoxe.png" alt="Bãi Đỗ Xe"/>
                <label>Bãi Đỗ Xe</label>
                <img className="icon-utility" src="/assets/images/duadonsanbay.png" alt="Đưa Đón Sân Bay"/>
                <label>Đưa Đón Sân Bay</label>
                <img className="icon-utility" src="/assets/images/giu-hanh-ly.png" alt="Giữ Hành Lý"/>
                <label>Giữ Hành Lý</label>
                <br/>
                <img className="icon-utility" src="/assets/images/ket-sat.png" alt="Két Sắt Giữ Đồ"/>
                <label>Két Sắt Giữ Đồ</label>
                <img className="icon-utility" src="/assets/images/reception-hotel-24h.svg" alt="Lễ Tân 24/24"/>
                <label>Lễ Tân 24/24</label>
                <img className="icon-utility" src="/assets/images/spa-stone.png" alt="Spa"/>
                <label>Spa</label>
                <img className="icon-utility" src="/assets/images/trogiup.png"alt="Trợ Giúp Đặc Biệt" />
                <label>Trợ Giúp Đặc Biệt</label>
                <img className="icon-utility" src="/assets/images/eat.png" alt="Đồ Ăn/Uống"/>
                <label>Đồ Ăn/Uống</label>
            </div>

        </div>
    );
}

export default Utilities;