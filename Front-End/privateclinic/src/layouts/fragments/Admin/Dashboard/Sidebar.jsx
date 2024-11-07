import React from "react";

const Sidebar = () => {
    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>
                        <li className="menu-title">Main</li>
                        <li className="active">
                            <a href="/admin/dashboard"><i className="fa fa-dashboard"></i> <span>Bảng Điều Khiển</span></a>
                        </li>
						<li>
                            <a href="/admin/doctor"><i className="fa fa-user-md"></i> <span>Bác sĩ</span></a>
                        </li>
                        <li>
                            <a href="/admin/patient"><i className="fa fa-wheelchair"></i> <span>Bệnh Nhân</span></a>
                        </li>
                        <li>
                            <a href="/admin/schedule"><i className="fa fa-calendar"></i> <span>Lịch Hẹn Khám</span></a>
                        </li>
                        <li>
                            <a href="/admin/checkup"><i className="fa fa-calendar-check-o"></i> <span>Ca Khám</span></a>
                        </li>
                        <li>
                            <a href="/admin/record"><i className="fa fa-archive"></i> <span>Hồ Sơ Khám Bệnh</span></a>
                        </li>
                        <li>
                            <a href="/admin/treatment"><i className="fa fa-medkit"></i> <span>Liệu Trình</span></a>
                        </li>
                        <li>
                            <a href="/admin/medicine"><i className="fa fa-pills"></i> <span>Kho Thuốc</span></a>
                        </li>
                        <li>
                            <a href="/admin/equipment"><i className="fa fa-video-camera"></i> <span>Thiết Bị</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;