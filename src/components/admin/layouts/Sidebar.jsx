import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../../../services/token.service";
function Sidebar(props) {

    const userAuthen = TokenService.getUser();

    if (userAuthen.roles.includes("ROLE_STAFF")) {
        return (
            <div>
                <div className="leftside-menu">
                    <ul className="side-nav">
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarTasks"
                                aria-expanded="false"
                                aria-controls="sidebarTasks"
                                className="side-nav-link"
                            >
                                <i className="uil-clipboard-alt" />
                                <span> Quản lý hóa đơn </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarTasks">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/dondat">
                                            Danh sách đơn đặt
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to="/admin/datphong">
                                            Đặt Phòng
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to="/admin/booking-history">
                                            Lịch sử đơn đặt
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to="/admin/order-service">
                                            Order dịch vụ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="leftside-menu">
                {/* LOGO */}
                <Link to="/" className="logo text-center logo-light">
                    <span className="logo-lg">
                        <img src="/assets/images/logo.png" aria-hidden="true" alt="" height={16} />
                    </span>
                    <span className="logo-sm">
                        <img src="/assets/images/logo_sm.png" aria-hidden="true" alt="" height={16} />
                    </span>
                </Link>
                {/* LOGO */}
                <Link to="/" className="logo text-center logo-dark">
                    <span className="logo-lg">
                        <img
                            src="/assets/images/logo-dark.png"
                            alt=""
                            height={16}
                        />
                    </span>
                    <span className="logo-sm">
                        <img
                            src="/assets/images/logo_sm_dark.png"
                            alt=""
                            height={16}
                        />
                    </span>
                </Link>
                <div
                    className="h-100"
                    id="leftside-menu-container"
                    data-simplebar
                >
                    {/*- Sidemenu */}
                    <ul className="side-nav">
                        <li className="side-nav-title side-nav-item">
                            Navigation
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarDashboards"
                                aria-expanded="false"
                                aria-controls="sidebarDashboards"
                                className="side-nav-link"
                            >
                                <i className="uil-home-alt" />

                                <span> Thống kê </span>
                            </a>
                            <div className="collapse" id="sidebarDashboards">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <Link to="/admin/thongke">
                                            Thống kê tổng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/thong-ke-theo-co-so">
                                            Thống kê theo cơ sở
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-title side-nav-item">
                            Chức năng quản trị viên
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarUser"
                                aria-expanded="false"
                                aria-controls="sidebarUser"
                                className="side-nav-link"
                            >
                                <i className="uil-horizontal-align-center" />
                                <span> Quản lý cơ sở </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarUser">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/hotel">
                                            Danh sách khách sạn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/hotel/add">
                                            Thêm khách sạn
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarHotel"
                                aria-expanded="false"
                                aria-controls="sidebarHotel"
                                className="side-nav-link"
                            >
                                <i className="uil-users-alt" />
                                <span> Quản lý nhân viên </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarHotel">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/user">
                                            Danh sách tài khoản
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/user/add">
                                            Thêm nhân viên
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarRoom"
                                aria-expanded="false"
                                aria-controls="sidebarRoom"
                                className="side-nav-link"
                            >
                                <i className="uil-web-grid" />
                                <span> Quản lý phòng </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarRoom">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/room">
                                            Danh sách phòng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarTypeRoom"
                                aria-expanded="false"
                                aria-controls="sidebarTypeRoom"
                                className="side-nav-link"
                            >
                                <i className="uil-list-ui-alt" />
                                <span> Quản lý loại phòng </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarTypeRoom">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/type-room">
                                            Danh sách loại phòng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/type-room/add">
                                            Thêm loại phòng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/hote-type-room">
                                            Danh sách phòng khách sạn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/hote-type-room/add">
                                            Thêm phòng khách sạn
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarEcommerce"
                                aria-expanded="false"
                                aria-controls="sidebarEcommerce"
                                className="side-nav-link"
                            >
                                <i className="uil-store" />
                                <span> Quản lý tiện ích </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarEcommerce">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/dstienich">
                                            Danh sách tiện ích
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/themtienich">
                                            Thêm tiện ích
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/themtienichphong">
                                            Thêm tiện ích phòng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarProjects"
                                aria-expanded="false"
                                aria-controls="sidebarProjects"
                                className="side-nav-link"
                            >
                                <i className="uil-briefcase" />
                                <span> Quản lý dịch vụ </span>
                                <span className="menu-arrow" />
                            </a>
                            <div
                                className="collapse"
                                id="sidebarProjects"
                            >
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/dsdichvu">
                                            Danh sách dịch vụ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/themdichvu">
                                            Thêm dịch vụ
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                href="apps-social-feed.html"
                                className="side-nav-link"
                            >
                                <i className="uil-rss" />
                                <span> Quản lý bài viết </span>
                            </a>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarTasks"
                                aria-expanded="false"
                                aria-controls="sidebarTasks"
                                className="side-nav-link"
                            >
                                <i className="uil-clipboard-alt" />
                                <span> Quản lý đơn đặt </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarTasks">
                                <ul className="side-nav-second-level">

                                    <li >
                                        <Link to="/admin/don-dat/lich-su-don-dat">
                                            Lịch sử đơn đặt
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to="/admin/don-dat/cancel-booking">
                                            Đơn đặt đã hủy
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to="/admin/don-dat/check-in">
                                            Đơn đặt đã nhận phòng
                                        </Link>
                                    </li>
                                    <li >
                                        <Link to="/admin/don-dat/check-out">
                                            Đơn đặt đã trả phòng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    {/* Help Box */}
                    <div className="help-box text-white text-center">
                        <a
                            href="#!"
                            className="float-end close-btn text-white"
                        >
                            <i className="mdi mdi-close" />
                        </a>
                        <img
                            src="/assets/images/help-icon.svg"
                            height={90}
                            alt=""
                        />
                        <h5 className="mt-3">Unlimited Access</h5>
                        <p className="mb-3">
                            Upgrade to plan to get access to unlimited reports
                        </p>
                        <a
                            href="#!"
                            className="btn btn-outline-light btn-sm"
                        >
                            Upgrade
                        </a>
                    </div>
                    {/* end Help Box */}
                    {/* End Sidebar */}
                    <div className="clearfix" />
                </div>
                {/* Sidebar -left */}
            </div>
        </div>
    );
}

export default Sidebar;
