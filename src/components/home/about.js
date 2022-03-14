import React from "react";

import { Row, Col } from "antd";

const items = [
  {
    key: "1",
    icon: (
      <img
        alt=""
        src="https://img.icons8.com/ios-filled/100/fa314a/bedroom.png"
      />
    ),
    title: "Các khách sạn dọc Việt Nam",
    content:
      "Nhiều khách sạn, đặc biệt là 4 sao và 5 sao, cho phép bạn thoải mái lựa chọn, giá cạnh tranh, phong phú.",
  },
  {
    key: "2",
    icon: (
      <img
        alt=""
        src="https://img.icons8.com/color/96/fa314a/calendar--v2.png"
      />
    ),
    title: "Giá tốt sát ngày",
    content: "Cam kết giá tốt nhất khi đặt gần ngày cho chuyến đi của bạn.",
  },
  {
    key: "3",
    icon: (
      <img
        alt=""
        src="https://img.icons8.com/external-those-icons-fill-those-icons/96/fa314a/external-phone-mobile-telephone-those-icons-fill-those-icons-2.png"
      />
    ),
    title: "Hỗ trợ khách hàng 24/7",
    content:
      "Chat là có, gọi là nghe, không quản đêm hôm, ngày nghỉ và ngày lễ.",
  },
];

function AppAbout() {
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Giới thiệu khách sạn</h2>
          <p>Cho đi nhiều hơn mong đợi</p>
        </div>
        <div className="contentHolder">
          <p>
            Khách hàng sẽ quên những điều bạn làm, nhưng họ sẽ không bao giờ
            quên những cảm nhận mà bạn mang đến cho họ Những khách hàng không
            hài lòng với sản phẩm, dịch vụ mà bạn cung cấp sẽ là nguồn tư liệu
            học hỏi tuyệt vời dành cho bạn Dịch vụ khách hàng nên được thực hiện
            bởi toàn bộ công ty chứ không riêng ở bộ phận nào Hãy nỗ lực làm
            thật tốt những gì bạn có và hơn thế nữa đến mức khách hàng muốn quay
            lại với bạn trong tương lai Khách hàng có thể sẽ quên những điều bạn
            làm, nhưng họ sẽ không bao giờ quên những cảm nhận mà bạn đã mang
            đến cho họ
          </p>
        </div>
        <Row gutter={[16, 16]}>
          {items.map((item) => {
            return (
              <Col md={{ span: 8 }} key={item.key}>
                <div className="content">
                  <div className="icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default AppAbout;
