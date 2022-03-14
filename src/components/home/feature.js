import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const { Meta } = Card;

function AppFeature() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    api.get("/owner/hotels").then((res) => {
      console.log(res);
      setHotels(res.data.data);
    });
  }, []);

  const getImage = (image) => {
    var showImage = "";

    if (image.indexOf(",") !== -1) {
      var arr = image.split(",");
      showImage = arr[0];
    } else {
      showImage = image;
    }
    return `http://localhost:8080/api/rest/files/image_hotels/${showImage}`;
  };

  return (
    <div id="feature" className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Danh sách khách sạn</h2>
          <p>Các thương hiệu khách sạn đối tác hàng đầu</p>
        </div>
        <Row gutter={[16, 16]}>
          {hotels
            .filter((item) => item.isEnabled === 1)
            .map((item, index) => (
              <Col
                key={index}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
              >
                <Link to={`/hotel/${item.id}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        height={240}
                        width={300}
                        alt="Modern Design"
                        src={getImage(item.images)}
                      />
                    }
                  >
                    <Meta title={item.name} />
                    <Meta title={`Thành phố ${item.city}`} />
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default AppFeature;
