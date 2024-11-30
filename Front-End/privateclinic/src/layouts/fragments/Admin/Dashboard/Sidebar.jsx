import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import decodeToken from "../../../../components/DecodeToken";

const Sidebar = () => {
    const location = useLocation();
    const [roleId, setRoleId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setRoleId(decodedToken.user_role);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>
                        <li className="menu-title">Main</li>
                        <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
                            <a href="/admin/dashboard"><i className="fa fa-dashboard"></i> <span>Bảng Điều Khiển</span></a>
                        </li>
                        {roleId === '2' ? (
                            <>
                                <li className={location.pathname === "/admin/patient" ? "active" : ""}>
                                    <a href="/admin/patient"><i className="fa fa-wheelchair"></i> <span>Bệnh Nhân</span></a>
                                </li>
                                <li className={location.pathname === "/admin/checkup" ? "active" : ""}>
                                    <a href="/admin/checkup"><i className="fa fa-calendar-check-o"></i> <span>Ca Khám</span></a>
                                </li>
                                <li className={location.pathname === "/admin/record" ? "active" : ""}>
                                    <a href="/admin/record"><i className="fa fa-archive"></i> <span>Hồ Sơ Khám Bệnh</span></a>
                                </li>
                                <li className={location.pathname === "/admin/medicine" ? "active" : ""}>
                                    <a href="/admin/medicine"><i className="fa fa-pills"></i> <span>Kho Thuốc</span></a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={location.pathname === "/admin/doctor" ? "active" : ""}>
                                    <a href="/admin/doctor"><i className="fa fa-user-md"></i> <span>Bác sĩ</span></a>
                                </li>
                                <li className={location.pathname === "/admin/patient" ? "active" : ""}>
                                    <a href="/admin/patient"><i className="fa fa-wheelchair"></i> <span>Bệnh Nhân</span></a>
                                </li>
                                <li className={location.pathname === "/admin/schedule" ? "active" : ""}>
                                    <a href="/admin/schedule"><i className="fa fa-calendar"></i> <span>Lịch Hẹn Khám</span></a>
                                </li>
                                <li className={location.pathname === "/admin/checkup" ? "active" : ""}>
                                    <a href="/admin/checkup"><i className="fa fa-calendar-check-o"></i> <span>Ca Khám</span></a>
                                </li>
                                <li className={location.pathname === "/admin/record" ? "active" : ""}>
                                    <a href="/admin/record"><i className="fa fa-archive"></i> <span>Hồ Sơ Khám Bệnh</span></a>
                                </li>
                                <li className={location.pathname === "/admin/treatment" ? "active" : ""}>
                                    <a href="/admin/treatment"><i className="fa fa-medkit"></i> <span>Liệu Trình</span></a>
                                </li>
                                <li className={location.pathname === "/admin/medicine" ? "active" : ""}>
                                    <a href="/admin/medicine"><i className="fa fa-pills"></i> <span>Kho Thuốc</span></a>
                                </li>
                                <li className={location.pathname === "/admin/equipment" ? "active" : ""}>
                                    <a href="/admin/equipment"><i className="fa fa-video-camera"></i> <span>Thiết Bị</span></a>
                                </li>
                                <li className={location.pathname === "/admin/report" ? "active" : ""}>
                                    <a href="/admin/report"><i className="fa fa-file"></i> <span>Báo Cáo</span></a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
