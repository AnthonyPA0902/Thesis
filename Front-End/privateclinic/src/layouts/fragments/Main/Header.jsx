import React, { useState, useEffect } from 'react';

const Header = () => {
    const [customerName, setCustomerName] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setCustomerName(decodedToken.user_name);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const tokenExist = () => {
        const token = localStorage.getItem("token");
        return token ? 1 : 0;
    };

    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    if (tokenExist() === 1) {
        return (
            <header id="header" className="header sticky-top">

                <div className="topbar d-flex align-items-center">
                    <div className="container d-flex justify-content-center justify-content-md-between">
                        <div className="d-none d-md-flex align-items-center">
                            <i className="bi bi-clock me-1"></i> Thứ 2 - Thứ 7, 8:00 - 22:00
                        </div>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-person-circle me-1"></i><a href="/login" style={{ color: 'white', fontWeight: 'bold' }}> Chào Mừng, {customerName} </a>
                            &nbsp;&nbsp;&nbsp;
                            <i className="bi bi-box-arrow-in-right me-1"></i><a href="/" onClick={handleLogout} style={{ color: 'white', fontWeight: 'bold' }}> Đăng Xuất </a>
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
                        <a href="/admin/auth" style={{ color: 'black', fontWeight: 'bold', width: '100px', marginLeft: '20px' }}><img src="/assets/img/icon/gear.png" alt="gear pic" /></a>

                    </div>

                </div>

            </header>
        );
    }
    else {
        return (
            <header id="header" className="header sticky-top">

                <div className="topbar d-flex align-items-center">
                    <div className="container d-flex justify-content-center justify-content-md-between">
                        <div className="d-none d-md-flex align-items-center">
                            <i className="bi bi-clock me-1"></i> Thứ 2 - Thứ 7, 8:00 - 22:00
                        </div>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-person-fill me-1"></i><a href="/login" style={{ color: 'white', fontWeight: 'bold' }}> Đăng Nhập </a>
                            &nbsp;&nbsp;&nbsp;
                            <i className="bi bi-person-plus me-1"></i><a href="/register" style={{ color: 'white', fontWeight: 'bold' }}> Đăng Ký </a>
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
                        <a href="/admin/login" style={{ color: 'black', fontWeight: 'bold', width: '100px', marginLeft: '20px' }}><img src="/assets/img/icon/gear.png" alt="gear pic" /></a>

                    </div>

                </div>

            </header>
        );
    }
};

export default Header;