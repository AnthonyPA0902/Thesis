import React, { useEffect, useRef, useState } from "react";

const Dashboard = () => {
	const pieChartRef = useRef(null); // Ref for pie chart
	const lineChartRef = useRef(null); // Ref for line chart
	const barChartRef = useRef(null); // Ref for bar chart
	const doughnutChartRef = useRef(null); // Ref for doughnut chart

	const [counts, setCounts] = useState({ doctorCount: 0, patientCount: 0, medicineCount: 0, equipmentCount: 0 });

	useEffect(() => {
        // Fetch counts data
        fetch("https://localhost:7157/api/admin/counts")
            .then(response => response.json())
            .then(data => {
                setCounts({
                    doctorCount: data.doctorCount,
                    patientCount: data.patientCount,
                    medicineCount: data.medicineCount,
                    equipmentCount: data.equipmentCount
                });
            })
            .catch(error => console.error("Error fetching dashboard counts:", error));
    }, []);


	useEffect(() => {
		const loadChartJs = (callback) => {
			const script = document.createElement("script");
			script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
			script.onload = callback;
			document.head.appendChild(script);
		};

		loadChartJs(() => {
			// Fetch and render pie chart data
			fetch("https://localhost:7157/api/admin/agechart")
				.then(response => response.json())
				.then(data => {
					const labels = data.map(stat => stat.ageGroup);
					const counts = data.map(stat => stat.count);

					const ctx = document.getElementById("pieChart").getContext("2d");

					// Destroy previous pie chart instance if it exists
					if (pieChartRef.current) {
						pieChartRef.current.destroy();
					}

					// Create and save the pie chart instance
					pieChartRef.current = new window.Chart(ctx, {
						type: "pie",
						data: {
							labels: labels,
							datasets: [{
								label: "Number of Patients",
								data: counts,
								backgroundColor: [
									"rgba(75, 192, 192, 0.6)",
									"rgba(255, 99, 132, 0.6)",
									"rgba(54, 162, 235, 0.6)",
									"rgba(255, 206, 86, 0.6)",
									"rgba(153, 102, 255, 0.6)",
									"rgba(255, 159, 64, 0.6)"
								],
								borderColor: "rgba(255, 255, 255, 1)",
								borderWidth: 1
							}]
						},
						options: {
							responsive: true,
							maintainAspectRatio: false
						}
					});
				});

			fetch("https://localhost:7157/api/admin/daily")
				.then(response => response.json())
				.then(data => {
					const labels = data.map(stat => stat.date);
					const revenueData = data.map(stat => Number(stat.totalRevenue)); // Ensure data is a number

					console.log("Labels:", labels);
					console.log("Revenue Data:", revenueData); // Log data to verify correctness

					const ctx = document.getElementById("lineChart").getContext("2d");

					// Destroy previous line chart instance if it exists
					if (lineChartRef.current) {
						lineChartRef.current.destroy();
						lineChartRef.current = null; // Clear reference
					}

					// Create and save the line chart instance
					lineChartRef.current = new window.Chart(ctx, {
						type: "line",
						data: {
							labels: labels,
							datasets: [{
								label: "Daily Revenue",
								data: revenueData,
								borderColor: "rgba(75, 192, 192, 1)",
								backgroundColor: "rgba(75, 192, 192, 0.2)",
								fill: true,
								tension: 0.4
							}]
						},
						options: {
							responsive: true,
							maintainAspectRatio: false,
							scales: {
								xAxes: [{
									scaleLabel: {
										display: true,
										labelString: "Date"
									}
								}],
								yAxes: [{
									scaleLabel: {
										display: true,
										labelString: "Revenue ($)"
									},
									ticks: {
										beginAtZero: true,
										min: 0,
										max: 20000000,
										stepSize: 2000000
									}
								}]
							}
						}
					});
				})
				.catch(error => console.error("Error fetching data:", error));

			// Fetch and render bar chart data
			fetch("https://localhost:7157/api/admin/orders-by-date")
				.then(response => response.json())
				.then(data => {
					// Prepare data for the bar chart
					const labels = data.map(item => item.date);
					const counts = data.map(item => item.orderCount);

					// Get chart context
					const ctx = document.getElementById("barChart").getContext("2d");

					// Destroy previous chart instance if it exists
					if (barChartRef.current) {
						barChartRef.current.destroy();
					}

					// Create a new bar chart and save it to the ref
					barChartRef.current = new window.Chart(ctx, {
						type: "bar",
						data: {
							labels: labels,
							datasets: [{
								label: "Number of Orders",
								data: counts,
								backgroundColor: "rgba(54, 162, 235, 0.6)",
								borderColor: "rgba(54, 162, 235, 1)",
								borderWidth: 1,
							}]
						},
						options: {
							responsive: true,
							maintainAspectRatio: false,
							scales: {
								xAxes: [{
									scaleLabel: {
										display: true,
										labelString: "Date"
									}
								}],
								yAxes: [{
									scaleLabel: {
										display: true,
										labelString: "Revenue ($)"
									},
									ticks: {
										beginAtZero: true,
										min: 0,
										max: 10,
										stepSize: 1
									}
								}]
							}
						}
					});
				})
				.catch(error => console.error("Error fetching orders by date:", error));

			// Fetch and render doughnut chart data for medicine usage
			fetch('https://localhost:7157/api/admin/medicine-usage')
				.then(response => response.json())
				.then(data => {
					console.log(data);
					const labels = data.map(item => item.medicineName);
								const percentages = data.map(item => Math.ceil(item.percentageUsed));

					const ctx = document.getElementById("doughnutChart").getContext("2d");

					// Destroy previous doughnut chart instance if it exists
					if (doughnutChartRef.current) {
						doughnutChartRef.current.destroy();
					}

					// Create and save the doughnut chart instance
					doughnutChartRef.current = new window.Chart(ctx, {
						type: 'doughnut',
						data: {
							labels: labels,
							datasets: [{
								data: percentages,
								backgroundColor: [
									'#FF5733', '#33FF57', '#3357FF', '#FFFF33', // Original colors
									'#FF33A8', '#33FFF9', '#FF8C33', '#8CFF33', '#FF3333', '#FF9933',
									'#33FF99', '#9933FF', '#33A8FF', '#FFC733', '#33FF33', '#B833FF',
									'#FF33C7', '#33FFA8', '#FFB833', '#A8FF33', '#33FF6B', '#33FFBB',
									'#5733FF', '#FF3357', '#33C7FF' // New colors
								  ]								  
							}]
						},
						options: {
							responsive: true,
							plugins: {
								legend: {
									position: 'top',
								},
								tooltip: {
									callbacks: {
										label: function (tooltipItem) {
											return tooltipItem.label + ':' +  Math.ceil(tooltipItem.raw) + '%';
										}
									}
								}
							}
						}
					});
				})
				.catch(error => console.error("Error fetching medicine usage data:", error));
		});

		// Cleanup function to destroy all charts on component unmount
		return () => {
			if (pieChartRef.current) {
				pieChartRef.current.destroy();
			}
			if (lineChartRef.current) {
				lineChartRef.current.destroy();
			}
			if (barChartRef.current) {
				barChartRef.current.destroy();
			}
			if (doughnutChartRef.current) {
				doughnutChartRef.current.destroy();
			}
		};
	}, []);

	return (
		<div className="content">
			<div className="row">
				<div className="row">
					<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
						<div className="dash-widget">
							<span className="dash-widget-bg1"><i className="fa fa-stethoscope" aria-hidden="true"></i></span>
							<div className="dash-widget-info text-right">
								<h3>{counts.doctorCount}</h3>
								<span className="widget-title1">Bác Sĩ <i className="fa fa-check" aria-hidden="true"></i></span>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
						<div className="dash-widget">
							<span className="dash-widget-bg2"><i className="fa fa-user-o"></i></span>
							<div className="dash-widget-info text-right">
								<h3>{counts.patientCount}</h3>
								<span className="widget-title2">Bệnh Nhân <i className="fa fa-check" aria-hidden="true"></i></span>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
						<div className="dash-widget">
							<span className="dash-widget-bg3"><i className="fa fa-user-md" aria-hidden="true"></i></span>
							<div className="dash-widget-info text-right">
								<h3>{counts.medicineCount}</h3>
								<span className="widget-title3">Thuốc <i className="fa fa-check" aria-hidden="true"></i></span>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
						<div className="dash-widget">
							<span className="dash-widget-bg4"><i className="fa fa-heartbeat" aria-hidden="true"></i></span>
							<div className="dash-widget-info text-right">
								<h3>{counts.equipmentCount}</h3>
								<span className="widget-title4">Thiết Bị <i className="fa fa-check" aria-hidden="true"></i></span>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div className="row" style={{ marginBottom: '50px' }}>
				<div className="col-md-6">
					<div style={{ padding: "0 20px" }}>
						<h3 style={{ textAlign: "center", marginBottom: "10px" }}>Biểu Đồ Theo Tuổi</h3>
						<div style={{ margin: '0 auto' }}>
							<canvas id="pieChart" style={{ width: '300px', height: '400px' }}></canvas>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div style={{ padding: "0 20px" }}>
						<h3 style={{ textAlign: "center", marginBottom: "10px" }}>Doanh Thu Theo Ngày</h3>
						<div style={{ margin: '0 auto' }}>
							<canvas id="lineChart" style={{ width: '300px', height: '400px' }}></canvas>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<div style={{ padding: "0 20px" }}>
						<h3 style={{ textAlign: "center", marginBottom: "10px" }}>Số Đơn Theo Ngày</h3>
						<div style={{ margin: '0 auto' }}>
							<canvas id="barChart" style={{ width: '300px', height: '400px' }}></canvas>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div style={{ padding: "0 20px" }}>
						<h3 style={{ textAlign: "center", marginBottom: "10px" }}>Tỷ Lệ Sử Dụng Thuốc</h3>
						<div style={{ margin: '0 auto' }}>
							<canvas id="doughnutChart" style={{ width: '300px', height: '400px' }}></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
