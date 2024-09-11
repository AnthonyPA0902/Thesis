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
                        <i className="bi bi-phone me-1"></i> Gọi chúng tôi - 0942 256 346
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

                    <a className="cta-btn" href="/appointment">Đặt Lịch Khám</a>

                </div>

            </div>

        </header>
    );
};

export default Header;