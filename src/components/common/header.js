import React, { useState } from "react";
import {
  Menu,
  Dropdown,
  Button,
  Space,
  Anchor,
  Drawer,
  Modal,
  notification,
} from "antd";
import Register from "../register/Register";
import LoginUser from "../loginuser/LoginUser";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import authService from "../../services/auth.service";
import SearchBooking from "../searchbooking/SearchBooking";
const { Link } = Anchor;
function AppHeader(props) {
  /**/
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleRegister, setIsModalVisibleRegister] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = () => {
    authService.logout();
    notification["success"]({
      message: "Đăng xuất thành công",
    });
    setIsModalVisible(false);
  };

  const showModalLogin = () => {
    setIsModalVisible(true);
  };

  const showModalRegister = () => {
    setIsModalVisibleRegister(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleRegister(false);
  };
  /**/
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // modal tìm kiếm
  const [isModalVisibleSearch, setIsModalVisibleSearch] = useState(false);

  function showModalSearch() {
    setIsModalVisibleSearch(true);
  }
  const menu = (
    <Menu>
      {user !== null ? (
        <>
          <Menu.Item key={2}>
            <a href="/ca-nhan" rel="noopener noreferrer">
              Cá Nhân
            </a>
          </Menu.Item>
          <Menu.Item key={3}>
            <a href="/" onClick={logOut} rel="noopener noreferrer">
              Đăng Xuất
            </a>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key={4}>
            <a href="#!" onClick={showModalLogin} rel="noopener noreferrer">
              Đăng Nhập
            </a>
          </Menu.Item>
          <Menu.Item key={5}>
            <a href="#!" onClick={showModalRegister} rel="noopener noreferrer">
              Đăng ký
            </a>
          </Menu.Item>
          <Menu.Item key={6}>
            <a href="#!" onClick={showModalSearch} rel="noopener noreferrer">
              Tìm kiếm đơn đặt
            </a>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-hotel"></i>
          <a href="/">My hotel</a>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="http://localhost:3000/#hero" title="Trang chủ" />
            <Link href="http://localhost:3000/#about" title="Về chúng tôi" />
            <Link href="http://localhost:3000/#feature" title="Khách sạn" />
            <Link href="http://localhost:3000/#works" title="Review" />
            <Link href="http://localhost:3000/#faq" title="Chính sách" />
            {/* <Link href="http://localhost:3000/#pricing" title="Pricing" />
            <Link href="http://localhost:3000/#contact" title="Contact" /> */}

            <Space direction="vertical" className="dropd">
              <Space wrap>
                {user !== null ? (
                  <>
                    <Dropdown
                      overlay={menu}
                      trigger={["click"]}
                      placement="bottomCenter"
                    >
                      <UserOutlined
                        style={{ fontSize: 20 }}
                        onClick={(e) => e.preventDefault()}
                      />
                    </Dropdown>
                    <span style={{ fontSize: 10 }}>{user.username}</span>
                  </>
                ) : (
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomCenter"
                  >
                    <UserOutlined
                      style={{ fontSize: 20 }}
                      onClick={(e) => e.preventDefault()}
                    />
                  </Dropdown>
                )}
              </Space>
            </Space>
          </Anchor>
        </div>
        <div></div>
        <div className="mobileVisible">
          <Button className="hide-button" type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="http://localhost:3000/#hero" title="Trang chủ" />
              <Link href="http://localhost:3000/#about" title="Về chúng tôi" />
              <Link href="http://localhost:3000/#feature" title="Khách sạn" />
              <Link href="http://localhost:3000/#works" title="How it works" />
              <Link href="http://localhost:3000/#faq" title="FAQ" />
              {/* <Link href="http://localhost:3000/#pricing" title="Pricing" />
              <Link href="http://localhost:3000/#contact" title="Contact" /> */}

              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomCenter"
                  >
                    <MenuUnfoldOutlined onClick={(e) => e.preventDefault()} />
                  </Dropdown>
                </Space>
              </Space>
            </Anchor>
          </Drawer>
        </div>
      </div>
      <Modal
        border-radius={300}
        width={450}
        closable={false}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        visible={isModalVisible}
      >
        <LoginUser
          setIsModalVisible={setIsModalVisible}
          handleCancel={handleCancel}
        />
      </Modal>
      <Modal
        border-radius={300}
        width={450}
        closable={false}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        visible={isModalVisibleRegister}
      >
        <Register
          setIsModalVisibleRegister={setIsModalVisibleRegister}
          handleCancel={handleCancel}
        />
      </Modal>

      {isModalVisibleSearch && (
        <SearchBooking
          isModalVisibleSearch={isModalVisibleSearch}
          setIsModalVisibleSearch={setIsModalVisibleSearch}
        ></SearchBooking>
      )}
    </div>
  );
}

export default AppHeader;
