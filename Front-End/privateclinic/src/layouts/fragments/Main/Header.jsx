import React from 'react';

const Header = () => {
    return (
        <header id="header" className="header sticky-top">

            <div className="topbar d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="d-none d-md-flex align-items-center">
                        <i className="bi bi-clock me-1"></i> Thứ 2 - Thứ 7, 8:00 - 22:00
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-person-fill me-1"></i><a href="/login" style={{color: 'white', fontWeight: 'bold'}}> Đăng Nhập </a>
                        &nbsp;&nbsp;&nbsp;
                        <i className="bi bi-person-plus me-1"></i><a href="/register" style={{color: 'white', fontWeight: 'bold'}}> Đăng Ký </a>
                    </div>
                </div>
            </div>

            <div className="branding d-flex align-items-center">

                <div className="container position-relative d-flex align-items-center justify-content-end">
                    <a href="/" className="logo d-flex align-items-center me-auto">
                        <img src="assets/img/clinic-logo.png" alt="" />
                    </a>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><a href="/">Trang Chủ</a></li>
                            <li><a href="/service">Dịch Vụ</a></li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>

                    <a className="cta-btn" href="/appointment">ĐẶT LỊCH KHÁM</a>
                    <a href="/admin/login" style={{color: 'black', fontWeight: 'bold', width: '100px', marginLeft: '20px'}}><img src="/assets/img/icon/gear.png" alt="gear pic"/></a>

                </div>

            </div>

        </header>
    );
};

export default Header;