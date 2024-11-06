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
                            <a className="dropdown-item" href="/admin/dashboard">Hồ Sơ</a>
                            <ul>
                                <li className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>Đăng Xuất</li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <div className="dropdown mobile-user-menu float-right">
                    <button className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="/admin/dashboard">Hồ Sơ</a>
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
                    <li className="nav-item dropdown d-none d-sm-block">
                        <button className="dropdown-toggle nav-link" data-toggle="dropdown"><i className="fa fa-bell-o"></i> <span className="badge badge-pill bg-danger float-right">3</span></button>
                        <div className="dropdown-menu notifications">
                            <div className="topnav-dropdown-header">
                                <span>Notifications</span>
                            </div>
                            <div className="drop-scroll">
                                <ul className="notification-list">
                                    <li className="notification-message">
                                        <a href="/admin/dashboard">
                                            <div className="media">
                                                <span className="avatar">
                                                    <img alt="John Doe" src="/admin_assets/img/user.jpg" className="img-fluid" />
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
                                                    <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="activities.html">
                                            <div className="media">
                                                <span className="avatar">V</span>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
                                                    <p className="noti-time"><span className="notification-time">6 mins ago</span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="activities.html">
                                            <div className="media">
                                                <span className="avatar">L</span>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
                                                    <p className="noti-time"><span className="notification-time">8 mins ago</span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="activities.html">
                                            <div className="media">
                                                <span className="avatar">G</span>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
                                                    <p className="noti-time"><span className="notification-time">12 mins ago</span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a href="activities.html">
                                            <div className="media">
                                                <span className="avatar">V</span>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">Bernardo Galaviz</span> added new task <span className="noti-title">Private chat module</span></p>
                                                    <p className="noti-time"><span className="notification-time">2 days ago</span></p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="topnav-dropdown-footer">
                                <a href="activities.html">View all Notifications</a>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown d-none d-sm-block">
                        <a href="/" id="open_msg_box" className="hasnotifications nav-link"><i className="fa fa-comment-o"></i> <span className="badge badge-pill bg-danger float-right">8</span></a>
                    </li>
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