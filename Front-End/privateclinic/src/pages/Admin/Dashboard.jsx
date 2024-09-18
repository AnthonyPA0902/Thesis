import React from "react";

const Dashboard = () => {
    return (
        <div className="content">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div className="dash-widget">
							<span className="dash-widget-bg1"><i className="fa fa-stethoscope" aria-hidden="true"></i></span>
							<div className="dash-widget-info text-right">
								<h3>98</h3>
								<span className="widget-title1">Doctors <i className="fa fa-check" aria-hidden="true"></i></span>
							</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div className="dash-widget">
                            <span className="dash-widget-bg2"><i className="fa fa-user-o"></i></span>
                            <div className="dash-widget-info text-right">
                                <h3>1072</h3>
                                <span className="widget-title2">Patients <i className="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div className="dash-widget">
                            <span className="dash-widget-bg3"><i className="fa fa-user-md" aria-hidden="true"></i></span>
                            <div className="dash-widget-info text-right">
                                <h3>72</h3>
                                <span className="widget-title3">Attend <i className="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div className="dash-widget">
                            <span className="dash-widget-bg4"><i className="fa fa-heartbeat" aria-hidden="true"></i></span>
                            <div className="dash-widget-info text-right">
                                <h3>618</h3>
                                <span className="widget-title4">Pending <i className="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="row">
					<div className="col-12 col-md-6 col-lg-6 col-xl-6">
						<div className="card">
							<div className="card-body">
								<div className="chart-title">
									<h4>Patient Total</h4>
									<span className="float-right"><i className="fa fa-caret-up" aria-hidden="true"></i> 15% Higher than Last Month</span>
								</div>	
								<canvas id="linegraph"></canvas>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-6 col-xl-6">
						<div className="card">
							<div className="card-body">
								<div className="chart-title">
									<h4>Patients In</h4>
									<div className="float-right">
										<ul className="chat-user-total">
											<li><i className="fa fa-circle current-users" aria-hidden="true"></i>ICU</li>
											<li><i className="fa fa-circle old-users" aria-hidden="true"></i> OPD</li>
										</ul>
									</div>
								</div>	
								<canvas id="bargraph"></canvas>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6 col-lg-8 col-xl-8">
						<div className="card">
							<div className="card-header">
								<h4 className="card-title d-inline-block">Upcoming Appointments</h4> <a href="appointments.html" className="btn btn-primary float-right">View all</a>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive">
									<table className="table mb-0">
										<thead className="d-none">
											<tr>
												<th>Patient Name</th>
												<th>Doctor Name</th>
												<th>Timing</th>
												<th className="text-right">Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td style={{minWidth: '200px'}}>
													<a className="avatar" href="profile.html">B</a>
													<h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>
												</td>                 
												<td>
													<h5 className="time-title p-0">Appointment With</h5>
													<p>Dr. Cristina Groves</p>
												</td>
												<td>
													<h5 className="time-title p-0">Timing</h5>
													<p>7.00 PM</p>
												</td>
												<td className="text-right">
													<a href="appointments.html" className="btn btn-outline-primary take-btn">Take up</a>
												</td>
											</tr>
											<tr>
                                            <td style={{minWidth: '200px'}}>

													<a className="avatar" href="profile.html">B</a>
													<h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>
												</td>                 
												<td>
													<h5 className="time-title p-0">Appointment With</h5>
													<p>Dr. Cristina Groves</p>
												</td>
												<td>
													<h5 className="time-title p-0">Timing</h5>
													<p>7.00 PM</p>
												</td>
												<td className="text-right">
													<a href="appointments.html" className="btn btn-outline-primary take-btn">Take up</a>
												</td>
											</tr>
											<tr>
                                            <td style={{minWidth: '200px'}}>
                                            <a className="avatar" href="profile.html">B</a>
													<h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>
												</td>                 
												<td>
													<h5 className="time-title p-0">Appointment With</h5>
													<p>Dr. Cristina Groves</p>
												</td>
												<td>
													<h5 className="time-title p-0">Timing</h5>
													<p>7.00 PM</p>
												</td>
												<td className="text-right">
													<a href="appointments.html" className="btn btn-outline-primary take-btn">Take up</a>
												</td>
											</tr>
											<tr>
                                            <td style={{minWidth: '200px'}}>
                                            <a className="avatar" href="profile.html">B</a>
													<h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>
												</td>                 
												<td>
													<h5 className="time-title p-0">Appointment With</h5>
													<p>Dr. Cristina Groves</p>
												</td>
												<td>
													<h5 className="time-title p-0">Timing</h5>
													<p>7.00 PM</p>
												</td>
												<td className="text-right">
													<a href="appointments.html" className="btn btn-outline-primary take-btn">Take up</a>
												</td>
											</tr>
											<tr>
                                            <td style={{minWidth: '200px'}}>
                                            <a className="avatar" href="profile.html">B</a>
													<h2><a href="profile.html">Bernardo Galaviz <span>New York, USA</span></a></h2>
												</td>                 
												<td>
													<h5 className="time-title p-0">Appointment With</h5>
													<p>Dr. Cristina Groves</p>
												</td>
												<td>
													<h5 className="time-title p-0">Timing</h5>
													<p>7.00 PM</p>
												</td>
												<td className="text-right">
													<a href="appointments.html" className="btn btn-outline-primary take-btn">Take up</a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <div className="card member-panel">
							<div className="card-header bg-white">
								<h4 className="card-title mb-0">Doctors</h4>
							</div>
                            <div className="card-body">
                                <ul className="contact-list">
                                    <li>
                                        <div className="contact-cont">
                                            <div className="float-left user-img m-r-10">
                                                <a href="profile.html" title="John Doe"><img src="assets/img/user.jpg" alt="" className="w-40 rounded-circle" /><span className="status online"></span></a>
                                            </div>
                                            <div className="contact-info">
                                                <span className="contact-name text-ellipsis">John Doe</span>
                                                <span className="contact-date">MBBS, MD</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-cont">
                                            <div className="float-left user-img m-r-10">
                                                <a href="profile.html" title="Richard Miles"><img src="assets/img/user.jpg" alt="" className="w-40 rounded-circle" /><span className="status offline"></span></a>
                                            </div>
                                            <div className="contact-info">
                                                <span className="contact-name text-ellipsis">Richard Miles</span>
                                                <span className="contact-date">MD</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-cont">
                                            <div className="float-left user-img m-r-10">
                                                <a href="profile.html" title="John Doe"><img src="assets/img/user.jpg" alt="" className="w-40 rounded-circle" /><span className="status away"></span></a>
                                            </div>
                                            <div className="contact-info">
                                                <span className="contact-name text-ellipsis">John Doe</span>
                                                <span className="contact-date">BMBS</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-cont">
                                            <div className="float-left user-img m-r-10">
                                                <a href="profile.html" title="Richard Miles"><img src="assets/img/user.jpg" alt="" className="w-40 rounded-circle" /><span className="status online"></span></a>
                                            </div>
                                            <div className="contact-info">
                                                <span className="contact-name text-ellipsis">Richard Miles</span>
                                                <span className="contact-date">MS, MD</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-cont">
                                            <div className="float-left user-img m-r-10">
                                                <a href="profile.html" title="John Doe"><img src="assets/img/user.jpg" alt="" className="w-40 rounded-circle" /><span className="status offline"></span></a>
                                            </div>
                                            <div className="contact-info">
                                                <span className="contact-name text-ellipsis">John Doe</span>
                                                <span className="contact-date">MBBS</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-cont">
                                            <div className="float-left user-img m-r-10">
                                                <a href="profile.html" title="Richard Miles"><img src="assets/img/user.jpg" alt="" className="w-40 rounded-circle" /><span className="status away"></span></a>
                                            </div>
                                            <div className="contact-info">
                                                <span className="contact-name text-ellipsis">Richard Miles</span>
                                                <span className="contact-date">MBBS, MD</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-footer text-center bg-white">
                                <a href="doctors.html" className="text-muted">View all Doctors</a>
                            </div>
                        </div>
                    </div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6 col-lg-8 col-xl-8">
						<div className="card">
							<div className="card-header">
								<h4 className="card-title d-inline-block">New Patients </h4> <a href="patients.html" className="btn btn-primary float-right">View all</a>
							</div>
							<div className="card-block">
								<div className="table-responsive">
									<table className="table mb-0 new-patient-table">
										<tbody>
											<tr>
												<td>
													<img width="28" height="28" className="rounded-circle" src="assets/img/user.jpg" alt="" /> 
													<h2>John Doe</h2>
												</td>
												<td>Johndoe21@gmail.com</td>
												<td>+1-202-555-0125</td>
												<td><button className="btn btn-primary btn-primary-one float-right">Fever</button></td>
											</tr>
											<tr>
												<td>
													<img width="28" height="28" className="rounded-circle" src="assets/img/user.jpg" alt="" /> 
													<h2>Richard</h2>
												</td>
												<td>Richard123@yahoo.com</td>
												<td>202-555-0127</td>
												<td><button className="btn btn-primary btn-primary-two float-right">Cancer</button></td>
											</tr>
											<tr>
												<td>
													<img width="28" height="28" className="rounded-circle" src="assets/img/user.jpg" alt="" /> 
													<h2>Villiam</h2>
												</td>
												<td>Richard123@yahoo.com</td>
												<td>+1-202-555-0106</td>
												<td><button className="btn btn-primary btn-primary-three float-right">Eye</button></td>
											</tr>
											<tr>
												<td>
													<img width="28" height="28" className="rounded-circle" src="assets/img/user.jpg" alt="" /> 
													<h2>Martin</h2>
												</td>
												<td>Richard123@yahoo.com</td>
												<td>776-2323 89562015</td>
												<td><button className="btn btn-primary btn-primary-four float-right">Fever</button></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-4 col-xl-4">
						<div className="hospital-barchart">
							<h4 className="card-title d-inline-block">Hospital Management</h4>
						</div>
						<div className="bar-chart">
							<div className="legend">
								<div className="item">
									<h4>Level1</h4>
								</div>
								
								<div className="item">
									<h4>Level2</h4>
								</div>
								<div className="item text-right">
									<h4>Level3</h4>
								</div>
								<div className="item text-right">
									<h4>Level4</h4>
								</div>
							</div>
							<div className="chart clearfix">
								<div className="item">
									<div className="bar">
										<span className="percent">16%</span>
										<div className="item-progress" data-percent="16">
											<span className="title">OPD Patient</span>
										</div>
									</div>
								</div>
								<div className="item">
									<div className="bar">
										<span className="percent">71%</span>
										<div className="item-progress" data-percent="71">
											<span className="title">New Patient</span>
										</div>
									</div>
								</div>
								<div className="item">
									<div className="bar">
										<span className="percent">82%</span>
										<div className="item-progress" data-percent="82">
											<span className="title">Laboratory Test</span>
										</div>
									</div>
								</div>
								<div className="item">
									<div className="bar">
										<span className="percent">67%</span>
										<div className="item-progress" data-percent="67">
											<span className="title">Treatment</span>
										</div>
									</div>
								</div>
								<div className="item">
									<div className="bar">
										<span className="percent">30%</span>									
										<div className="item-progress" data-percent="30">
											<span className="title">Discharge</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					 </div>
				</div>
            </div>
    );
};

export default Dashboard;