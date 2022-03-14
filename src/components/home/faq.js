import React from "react";

import { Collapse, Button } from "antd";

const { Panel } = Collapse;

function AppFaq() {
  return (
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</h2>
          <p>GIỚI THIỆU ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</p>
        </div>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="GIỚI THIỆU ĐIỀU KHOẢN VÀ ĐIỀU KIỆN" key="1">
            <p>
              Công ty Cổ phần khách sạn Fpoly Hotel (“Chúng Tôi” hoặc Fpoly
              Hotel) thực hiện việc cung cấp Dịch Vụ thông qua website. Bằng
              cách cài đặt, đăng nhập, truy cập và sử dụng website
              FpolyHotel.Com, người sử dụng Dịch Vụ (“Bạn” hoặc “Người Dùng”)
              đồng ý với các Điều Khoản và Điều Kiện này, các chính sách liên
              quan tới Sản Phẩm của Nhà Cung Cấp và các chính sách khác được
              thông báo trên website FpolyHotel.Com tại từng thời điểm. Chúng
              Tôi có thể sửa đổi, bổ sung, loại bỏ một số nội dung của Điều
              Khoản Và Điều Kiện này vào bất kỳ thời điểm nào mà không cần thông
              báo trước. Bằng việc tiếp tục đăng nhập, truy cập và sử dụng
              website FpolyHotel.Com, sử dụng Dịch Vụ của Chúng Tôi, Bạn đồng ý
              và chấp thuận với những nội dung thay đổi đó. Nếu Bạn sử dụng Dịch
              Vụ trên website FpolyHotel.Com để đặt Sản Phẩm cho cá nhân/ tổ
              chức khác mà Bạn được ủy quyền hợp pháp để thực hiện yêu cầu
              (“Người Tiêu Dùng Cuối Cùng”), Bạn có nghĩa vụ thông báo các Điều
              khoản và Điều Kiện này cho Người Tiêu Dùng Cuối Cùng.
            </p>
          </Panel>
          <Panel header="Dịch Vụ" key="2">
            <p>
              Thông qua website FpolyHotel.Com, Chúng Tôi cung cấp công cụ trực
              tuyến để Bạn có thể tìm kiếm, đưa ra yêu cầu sử dụng và đặt phòng
              khách sạn, chương trình trải nghiệm; dịch vụ đặt thực phẩm, đặt
              chỗ tại các cơ sở cung cấp thực phẩm, đặt món ăn theo nhu cầu và
              các sản phẩm khác (“Dịch Vụ”) với các hình thức thanh toán nhanh
              chóng, an toàn, tiện lợi. Để tạo thuận lợi cho Bạn trong việc tìm
              kiếm thông tin, Chúng Tôi sẽ hiển thị thông tin về các sản phẩm
              như phòng nghỉ, các chương trình trải nghiệm, các mặt hàng thực
              phẩm, thông tin các nhà hàng… trên website FpolyHotel.Com (“Sản
              Phẩm”). Yêu cầu của Bạn được xử lý và xác nhận khi Bạn nhận được
              một Thông Báo Xác Nhận qua email mà Bạn đã đăng ký trên Sàn
              website FpolyHotel.Com (“Thông Báo Xác Nhận”).
            </p>
          </Panel>
          <Panel header="Thanh toán, đặt cọc" key="3">
            <p>
              Khi bạn sử dụng dịch vụ của chúng tôi thông qua website
              FpolyHotel.Com. Tức bạn đặt phòng khách sạn tại các cơ sở khách
              sạn thuộc quyền sở hữu của Công ty Cổ phần khách sạn Fpoly Hotel
              bạn sẽ phải hoàn thành việc đặt cọc tương ứng với 30% tổng số tiền
              mà bạn phải trả!. Số tiền đặt cọc sẽ được trừ vào tổng số tiền bạn
              phải trả khi bạn trả phòng!
            </p>
          </Panel>
          <Panel header="Không đảm bảo" key="4">
            <p>
              Chúng Tôi sẽ sử dụng những kỹ năng chuyên môn và sự cẩn trọng
              trong việc thực hiện Dịch Vụ. Tuy nhiên, Chúng Tôi không xác nhận
              và không đảm bảo rằng tất cả các thông tin được cung cấp là chính
              xác, đầy đủ, phù hợp và Chúng Tôi không chịu trách nhiệm cho bất
              kỳ sai sót (bao gồm cả lỗi sắp xếp và đánh máy), trở ngại (do sự
              hư hỏng, sửa chữa hoặc nâng cấp tạm thời đối với website
              FpolyHotel.Com), sự nhầm lẫn, thông tin sai lệch hoặc việc không
              thể chuyển thông tin. Mặc dù các thông tin liên quan tới Sản Phẩm
              được hiển thị trên website FpolyHotel.Com của Chúng Tôi, Chúng Tôi
              không tuyên bố hoặc bảo đảm rằng việc sử dụng các Sản Phẩm này là
              nên hoặc không có rủi ro và Chúng Tôi không chịu trách nhiệm pháp
              lý về thiệt hại hay tổn thất có thể xảy ra do việc sử dụng các Sản
              Phẩm đó. Bạn tự chịu trách nhiệm về việc lựa chọn các Sản Phẩm
              theo nhu cầu sử dụng của mình. Nếu Bạn có khiếu nại về Dịch Vụ của
              Chúng Tôi, Bạn có thể liên hệ với bộ phận Chăm sóc Khách Hàng của
              Chúng Tôi.
            </p>
          </Panel>
          <Panel header="Xếp hạng" key="5">
            <p>
              Xếp hạng của các cơ sở trên website FpolyHotel.Com được dựa vào
              thông tin do Bạn, Người Dùng khác, bên thứ ba đánh giá và sẽ được
              xác định cụ thể thông qua các thuật toán tự động. Xếp hạng có thể
              thay đổi tùy từng thời điểm. Chúng Tôi không chịu trách nhiệm về
              tính chính xác, ổn định của các xếp hạng, vì vậy Chúng Tôi sẽ
              khước từ mọi trách nhiệm giải đáp các khiếu nại, thắc mắc liên
              quan tới xếp hạng
            </p>
          </Panel>
          <Panel header="Hủy, đổi lịch, gia hạn phòng" key="6">
            <p>
              Khi thực hiện đặt phòng khách sạn trên website FpolyHotel.Com,
              Trường hợp bạn có nhu cầu hủy phòng thì chúng tôi sẽ không hoàn
              lại tiền cọc (tương đương 30% trên tổng số tiền thanh toán) mà bạn
              đã thanh toán trước đó với bất cứ lý do gì, chúng tôi miễn trừ
              giải thích.!
              <br /> Trường hợp đổi lịch, bạn sẽ chỉ có một lần duy nhất để đổi
              lịch trên website FpolyHotel.Com với điều kiện ngày bạn muốn đổi
              phải thỏa mãn các phòng của cơ sở đó vẫn còn trống đủ ngày và đủ
              số lượng mà bạn muốn đổi, nếu không, bạn sẽ không thể đổi lịch.
              <br />
              Trường hợp gia hạn phòng, bạn sẽ gia hạn phòng trên website
              FpolyHotel.Com với điều kiện ngày bạn muốn gia hạn phải thỏa mãn
              các phòng của cơ sở đó vẫn còn trống đủ ngày và đủ số lượng mà bạn
              muốn gia hạn, nếu không, bạn sẽ không thể gia hạn phòng.
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default AppFaq;
