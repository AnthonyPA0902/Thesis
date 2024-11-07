import React, { useState, useEffect } from "react";
import decodeToken from "../../../../components/DecodeToken";
// Directly imported CSS
import '../../../../admin_assets/css/bootstrap/bootstrap.min.css'
import '../../../../admin_assets/css/font-awesome.min.css'
import '../../../../admin_assets/css/dashboard.css'

const Header = () => {
    const [employeeName, setEmployeeName] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setEmployeeName(decodedToken.user_name);
            }
        }

        const googleIconsLink = document.createElement("link");
        googleIconsLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
        googleIconsLink.rel = "stylesheet";
        document.head.appendChild(googleIconsLink);

        return () => {
            document.head.removeChild(googleIconsLink);
        };
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        window.location.href = "/admin/auth";
    };

    const tokenExist = () => {
        const token = sessionStorage.getItem("token");
        return token ? 1 : 0;
    };

   <decodeToken />

    if (tokenExist() === 1) {
        return (
            <div className="dashboard-header">
                <div className="header-left">
                    <a href="/admin/dashboard" className="logo">
                        <img src="/admin_assets/img/clinic-logo.png" width="300px" height="36px" alt="" />
                    </a>
                </div>
                <ul className="nav user-menu float-right">
                    <li className="nav-item dropdown has-arrow">
                        <button className="dropdown-toggle nav-link user-link" data-toggle="dropdown">
                            <span className="user-img">
                                <img className="rounded-circle" src="/admin_assets/img/user.jpg" width="24" alt="Admin" />
                                <span className="status online"></span>
                            </span>
                            <span>{employeeName}</span>
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/admin/info">Chỉnh Sửa Hồ Sơ</a>
                            <ul>
                                <li className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>Đăng Xuất</li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div className="dropdown mobile-user-menu float-right">
                    <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="/admin/info">Chỉnh Sửa Hồ Sơ</a>
                        <ul>
                            <li className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>Đăng Xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="dashboard-header">
                <div className="header-left">
                    <a href="/admin/dashboard" className="logo">
                        <img src="/admin_assets/img/clinic-logo.png" width="300px" height="36px" alt="" />
                    </a>
                </div>
                <ul className="nav user-menu float-right">
                    <li className="nav-item dropdown has-arrow">
                        <button className="dropdown-toggle nav-link user-link" data-toggle="dropdown">
                            <span className="user-img">
                                <img className="rounded-circle" src="/admin_assets/img/user.jpg" width="24" alt="Admin" />
                                <span className="status online"></span>
                            </span>
                            <span>Admin</span>
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="profile.html">My Profile</a>
                            <a className="dropdown-item" href="edit-profile.html">Edit Profile</a>
                            <a className="dropdown-item" href="settings.html">Settings</a>
                            <a className="dropdown-item" href="login.html">Logout</a>
                        </div>
                    </li>
                </ul>
                <div className="dropdown mobile-user-menu float-right">
                    <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="profile.html">My Profile</a>
                        <a className="dropdown-item" href="edit-profile.html">Edit Profile</a>
                        <a className="dropdown-item" href="settings.html">Settings</a>
                        <a className="dropdown-item" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        );
    }

};

export default Header;