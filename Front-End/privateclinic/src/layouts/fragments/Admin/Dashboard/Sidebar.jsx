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
                            <a href="/admin/dashboard"><i className="fa fa-user-md"></i> <span>Doctors</span></a>
                        </li>
                        <li>
                            <a href="/admin/dashboard"><i className="fa fa-wheelchair"></i> <span>Patients</span></a>
                        </li>
                        <li>
                            <a href="/admin/schedule"><i className="fa fa-calendar"></i> <span>Lịch Hẹn Khám</span></a>
                        </li>
                        <li>
                            <a href="/admin/checkup"><i className="fa fa-calendar-check-o"></i> <span>Ca Khám</span></a>
                        </li>
                        <li>
                            <a href="/admin/dashboard"><i className="fa fa-hospital-o"></i> <span>Departments</span></a>
                        </li>
						<li className="submenu">
							<a href="/"><i className="fa fa-user"></i> <span> Employees </span> <span className="menu-arrow"></span></a>
							<ul style={{display: 'none'}}>
								<li><a href="/">Employees List</a></li>
								<li><a href="/">Leaves</a></li>
								<li><a href="/">Holidays</a></li>
								<li><a href="/">Attendance</a></li>
							</ul>
						</li>
						<li className="submenu">
							<a href="/"><i className="fa fa-money"></i> <span> Accounts </span> <span className="menu-arrow"></span></a>
							<ul style={{display: 'none'}}>
								<li><a href="/">Invoices</a></li>
								<li><a href="/">Payments</a></li>
								<li><a href="/">Expenses</a></li>
								<li><a href="/">Taxes</a></li>
								<li><a href="/">Provident Fund</a></li>
							</ul>
						</li>
						<li className="submenu">
							<a href="/"><i className="fa fa-book"></i> <span> Payroll </span> <span className="menu-arrow"></span></a>
							<ul style={{display: 'none'}}>
								<li><a href="/"> Employee Salary </a></li>
								<li><a href="/"> Payslip </a></li>
							</ul>
						</li>
                        <li>
                            <a href="/"><i className="fa fa-comments"></i> <span>Chat</span> <span className="badge badge-pill bg-primary float-right">5</span></a>
                        </li>
                        <li className="submenu">
                            <a href="/"><i className="fa fa-video-camera camera"></i> <span> Calls</span> <span className="menu-arrow"></span></a>
                            <ul style={{display: 'none'}}>
                                <li><a href="/">Voice Call</a></li>
                                <li><a href="/">Video Call</a></li>
                                <li><a href="/">Incoming Call</a></li>
                            </ul>
                        </li>
                        <li className="submenu">
                            <a href="/"><i className="fa fa-envelope"></i> <span> Email</span> <span className="menu-arrow"></span></a>
                            <ul style={{display: 'none'}}>
                                <li><a href="/">Compose Mail</a></li>
                                <li><a href="/">Inbox</a></li>
                                <li><a href="/">Mail View</a></li>
                            </ul>
                        </li>
                        <li className="submenu">
                            <a href="/"><i className="fa fa-commenting-o"></i> <span> Blog</span> <span className="menu-arrow"></span></a>
                            <ul style={{display: 'none'}}>
                                <li><a href="/">Blog</a></li>
                                <li><a href="/">Blog View</a></li>
                                <li><a href="/">Add Blog</a></li>
                                <li><a href="/">Edit Blog</a></li>
                            </ul>
                        </li>
						<li>
							<a href="/"><i className="fa fa-cube"></i> <span>Assets</span></a>
						</li>
						<li>
							<a href="/"><i className="fa fa-bell-o"></i> <span>Activities</span></a>
						</li>
						<li className="submenu">
							<a href="/"><i className="fa fa-flag-o"></i> <span> Reports </span> <span className="menu-arrow"></span></a>
							<ul style={{display: 'none'}}>
								<li><a href="/"> Expense Report </a></li>
								<li><a href="/"> Invoice Report </a></li>
							</ul>
						</li>
                        <li>
                            <a href="/"><i className="fa fa-cog"></i> <span>Settings</span></a>
                        </li>
                        <li className="menu-title">UI Elements</li>
                        <li className="submenu">
                            <a href="/"><i className="fa fa-laptop"></i> <span> Components</span> <span className="menu-arrow"></span></a>
                            <ul style={{display: 'none'}}>
                                <li><a href="/">UI Kit</a></li>
                                <li><a href="/">Typography</a></li>
                                <li><a href="/">Tabs</a></li>
                            </ul>
                        </li>
                        <li className="submenu">
                            <a href="/"><i className="fa fa-edit"></i> <span> Forms</span> <span className="menu-arrow"></span></a>
                            <ul style={{display: 'none'}}>
                                <li><a href="/">Basic Inputs</a></li>
                                <li><a href="/">Input Groups</a></li>
                                <li><a href="/">Horizontal Form</a></li>
                                <li><a href="/">Vertical Form</a></li>
                            </ul>
                        </li>
                        <li className="submenu">
                            <a href="/"><i className="fa fa-table"></i> <span> Tables</span> <span className="menu-arrow"></span></a>
                            <ul style={{display: 'none'}}>
                                <li><a href="/">Basic Tables</a></li>
                                <li><a href="/">Data Table</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/"><i className="fa fa-calendar"></i> <span>Calendar</span></a>
                        </li>
                        <li className="menu-title">Extras</li>
                        <li className="submenu">
                            <a href="/"><i className="fa fa-columns"></i> <span>Pages</span> <span className="menu-arrow"></span></a>
                            <ul style={{display: 'none'}}>
                                <li><a href="/"> Login </a></li>
                                <li><a href="/l"> Register </a></li>
                                <li><a href="/"> Forgot Password </a></li>
                                <li><a href="/"> Change Password </a></li>
                                <li><a href="/"> Lock Screen </a></li>
                                <li><a href="/"> Profile </a></li>
                                <li><a href="/"> Gallery </a></li>
                                <li><a href="/">404 Error </a></li>
                                <li><a href="/">500 Error </a></li>
                                <li><a href="/"> Blank Page </a></li>
                            </ul>
                        </li>
                        <li className="submenu">
                            <a href="/"><i className="fa fa-share-alt"></i> <span>Multi Level</span> <span className="menu-arrow"></span></a>
                            <ul style={{display: 'none'}}>
                                <li className="submenu">
                                    <a href="/"><span>Level 1</span> <span className="menu-arrow"></span></a>
                                    <ul style={{display: 'none'}}>
                                        <li><a href="/"><span>Level 2</span></a></li>
                                        <li className="submenu">
                                            <a href="/"> <span> Level 2</span> <span className="menu-arrow"></span></a>
                                            <ul style={{display: 'none'}}>
                                                <li><a href="/">Level 3</a></li>
                                                <li><a href="/">Level 3</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="/"><span>Level 2</span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="/"><span>Level 1</span></a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;