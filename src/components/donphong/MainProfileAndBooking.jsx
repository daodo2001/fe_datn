import React, { useState } from "react";
import "./donphong.css";
import { Layout } from "antd";
import AppHeader from "../common/header";
import { Footer, Header } from "antd/lib/layout/layout";
import AppFooter from "../common/footer";
import Donphong from "./Donphong";
import Profile from "../admin/profile/Profile";
import ChangePasswordUser from "./ChangePasswordUser";

const DONPHONG = 0;
const PROFILE = 1;
const CHANGEPASSWORD = 2;
function MainProfileAndBooking() {
  const [visable, setVisable] = useState(DONPHONG);
  const [title, settitle] = useState("Đơn Đặt");

  const showTab = () => {
    if (visable === DONPHONG) {
      return <Donphong />;
    } else if (visable === PROFILE) {
      return <Profile />;
    } else if (visable === CHANGEPASSWORD) {
      return <ChangePasswordUser />
    }
  };

  return (
    <Layout className="mainLayout">
      <Header>
        <AppHeader />
      </Header>
      <main>
        <div className="MuiBox-root jss4609 jss4464" style={{ marginTop: 80 }}>
          <div className="MuiBox-root jss4610 jss4465">
            <div className="MuiBox-root jss4611 jss2821 jss4467">
              <span className="MuiBox-root jss4615">{title}</span>
            </div>
          </div>
          <div className="MuiBox-root jss4616 jss2821">
            <div className="MuiTabs-root">
              <div className="MuiTabs-scroller MuiTabs-fixed">
                <div aria-label="full width tabs example">
                  <button className="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit jss4469 Mui-selected">
                    <span
                      className="MuiTab-wrapper"
                      onClick={() => {
                        setVisable(DONPHONG);
                        settitle("Đơn Đặt Phòng");
                      }}
                    >
                      Quản lý đơn đặt
                    </span>
                    <span className="MuiTouchRipple-root" />
                  </button>
                  <button className="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit jss4469">
                    <span
                      className="MuiTab-wrapper"
                      onClick={() => {
                        setVisable(PROFILE);
                        settitle("Thông Tin Cá Nhân");
                      }}
                    >
                      Tài khoản
                    </span>
                    <span className="MuiTouchRipple-root" />
                  </button>
                  <button className="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit jss4469">
                    <span
                      className="MuiTab-wrapper"
                      onClick={() => {
                        setVisable(CHANGEPASSWORD);
                        settitle("Đổi Mật Khẩu");
                      }}
                    >
                      Đổi mật khẩu
                    </span>
                    <span className="MuiTouchRipple-root" />
                  </button>
                </div>
                <span
                  className="jss4512 jss4514 MuiTabs-indicator jss4511 jss4470"
                  style={{ left: "0px", width: "160px" }}
                />
              </div>
            </div>
            <hr />
            {showTab()}
          </div>
        </div>
      </main>
      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  );
}
export default MainProfileAndBooking;
