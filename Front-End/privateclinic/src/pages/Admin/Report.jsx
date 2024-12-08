import React, { useState, useEffect } from 'react';
import styles from '../../admin_assets/css/report.module.css'; // Import the CSS module


const Report = () => {
    // State variables to manage selected values
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [doctorName, setDoctorName] = useState('');

    // Fetch doctors (assumed API endpoint)
    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('https://localhost:7157/api/admin/report/doctors');
            const data = await response.json();
            if (data.success) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.error('Failed to fetch doctors:', error);
        }
    };

    // Fetch doctor name based on selected doctorId
    const fetchDoctorName = async (id) => {
        try {
            const response = await fetch(`https://localhost:7157/api/admin/report/doctor/${id}`);
            const data = await response.json();
            if (data.success) {
                setDoctorName(data.doctor[0].name);
            }
        } catch (error) {
            console.error('Failed to fetch doctor name:', error);
        }
    };

    // Handle report generation
    const handleGenerateReport = async () => {
        setLoading(true);

        await fetchDoctorName(selectedDoctor);

        try {
            const response = await fetch(
                `https://localhost:7157/api/admin/report/generateReport?doctorId=${selectedDoctor}&month=${selectedMonth}&year=${selectedYear}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to generate report');
            }

            // Create a download link for the Excel file
            const blob = await response.blob();
            const link = document.createElement('a');
            // Create the report file name dynamically
            const reportFileName = `Báo Cáo Khám Bệnh ${String(selectedMonth).padStart(2, '0')}-${selectedYear} - ${doctorName}`;

            // Set the download attribute with the dynamic filename
            link.href = URL.createObjectURL(blob);
            link.download = `${reportFileName}.xlsx`; // Dynamic file name
            link.click();
        } catch (error) {
            console.error('Error generating report:', error);
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h1>Báo Cáo Thống Kê</h1>

            {/* Doctor Dropdown */}
            <div className={styles['form-group']}>
                <label htmlFor="doctor">Chọn Bác Sĩ:</label>
                <select
                    id="doctor"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                    <option value="">Chọn Bác Sĩ</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Month Dropdown */}
            <div className={styles['form-group']}>
                <label htmlFor="month">Chọn Tháng:</label>
                <select
                    id="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {[...Array(12).keys()].map((month) => (
                        <option key={month + 1} value={month + 1}>
                            {month + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Year Dropdown */}
            <div className={styles['form-group']}>
                <label htmlFor="year">Chọn Năm:</label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {[new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1].map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Generate Report Button */}
            <button  className={styles['report-button']} onClick={handleGenerateReport} disabled={loading}>
                {loading ? 'Đang Tạo...' : 'Tạo Báo Cáo'}
            </button>

            {/* Loading State */}
            {loading && <div className={styles.loading}>Xin đợi giây lát, hệ thống đang kiểm tra dữ liệu...</div>}
        </div>
    );
};

export default Report;
