import React, { useState, useEffect } from "react";
import { Row, Rate, Layout, Modal } from "antd";
import "../booking/hoteldetail.css";
import AppHeader from "../common/header";
import { Footer, Header } from "antd/lib/layout/layout";
import AppFooter from "../common/footer";
import api from "../../services/api";
import PreviewHotel from "./PreviewHotel";
import TypeRoom from "./TypeRoom";
import RatingComment from "./RatingComment";
import Utilities from "./Utilities";


function HotelDetail(props) {
  const { match } = props;
  const [hotel, setHotel] = useState({})
  const [typeRooms, setTypeRooms] = useState([])
  const [arrImage, setArrImage] = useState([])
  const [idTypeRoom, setIdTypeRoom] = useState(null)
  const [dateIn, setDateIn] = useState(null)
  const [dateOut, setDateOut] = useState(null)
  const [avgStar, setAvgStar] = useState()
  const [isModalMap, setIsModalMap] = useState(false)
  var address = "https://maps.google.com/maps?q=" + hotel.address + "&t=k&z=13&ie=UTF8&iwloc=&output=embed";

  useEffect(() => {
    api.get(`/owner/hotels/${match.params.id}`).then(res => {
      if (res.data.data.isEnabled === 0) {
        window.location.assign("/")
      }
      setHotel(res.data.data)
    })
    api.get(`/user/comment/hotel/${match.params.id}`).then((res) => {
      setAvgStar(res.data.data);
    });
    getHotelTypeRooms();
  }, [match.params.id, dateIn, dateOut, idTypeRoom]);

  const getHotelTypeRooms = () => {
    const config = {
      method: "get",
      url: `/owner/hotel-type-room/${match.params.id}`,
      params: {
        "id-type-room": idTypeRoom,
        "date-in": dateIn,
        "date-out": dateOut
      }
    }
    api(config).then(res => {
      setTypeRooms(res.data.data)
    })
  }

  useEffect(() => {
    if (hotel.images) {
      const newArrImage = hotel.images.split(",");
      setArrImage(newArrImage);
    }
  }, [hotel]);

  const handleOk = () => {
    setIsModalMap(false)
  }

  return (
    <>
      <Layout className="mainLayout">
        <Header>
          <AppHeader />
        </Header>
        <Modal visible={isModalMap} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }} width={575} closable={false}>
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe width={528} height={414} id="gmap_canvas" src={address} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} />
              <a href="https://123movies-org.net" /><br />
              <style dangerouslySetInnerHTML={{ __html: ".mapouter{position:relative;text-align:right;height:414px;width:528px;}" }} />
              <a href="https://www.embedgooglemap.net" />
              <style dangerouslySetInnerHTML={{ __html: ".gmap_canvas {overflow:hidden;background:none!important;height:414px;width:528px;}" }} />
            </div>
          </div>
        </Modal>
        <div className="main-hoteldetail">
          <div className="title-hotel">
            <div className="title-hotel-left">
              <div className="title-hotel-left-title">
                <p> {hotel.name}</p>
              </div>
              <div className="title-hotel-left-rate">
                <Rate
                  value={avgStar}
                  disabled={true}
                  style={{
                    fontSize: "16px",
                    margin: "15px 0px 0px",
                    color: "rgb(255, 188, 57)",
                  }}
                />
              </div>
            </div>
          </div>
          {/* <div className="title-hotel-rate">
            <span>9.0</span>
            <div>
              Tuyệt vời
              <span className="title-hotel-rate-ratenumber">
                &nbsp;(67 đánh giá)
              </span>
              &nbsp;
              <div className="jss153"></div>
              <div className="title-hotel-rate-icont">
                <img
                  src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_tripadvisor.svg"
                  alt=""
                />
              </div>
              9.0 &nbsp;
              <span style={{ color: "#00B6F3" }}>Xem đánh giá</span>
            </div>
          </div> */}
          <div className="title-hotel-address">
            <div style={{ marginRight: "6px" }}>
              <i className="fal fa-map-marker-alt"></i>
            </div>
            <div>
              Địa chỉ {hotel.address}
              &nbsp;
              <span style={{ color: "#00B6F3" }} onClick={() => setIsModalMap(true)} type="button">Xem bản đồ</span>
            </div>
          </div>
          <PreviewHotel arrImage={arrImage} />
          <br />
          <Utilities />
          <Row >
            <TypeRoom
              hotel={hotel}
              typeRooms={typeRooms}
              setIdTypeRoom={setIdTypeRoom}
              setDateIn={setDateIn}
              setDateOut={setDateOut}
            />
          </Row>
          <Row>
            <RatingComment idHotel={match} />
          </Row>
        </div>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </>
  );
}

export default HotelDetail;
