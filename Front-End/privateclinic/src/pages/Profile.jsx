import React, { useState, useEffect } from 'react';
import styles from '../assets/css/profile.module.css';
import Heading from '../components/Heading';
import decodeToken from '../components/DecodeToken';
import backgroundImage from '../assets/img/profile-background.jpg';
import Swal from 'sweetalert2';

const Profile = () => {
    const [schedule, setSchedule] = useState([]);
    const [records, setRecords] = useState([]);  // State to store the medical records
    const [activeSection, setActiveSection] = useState('schedule'); // State to manage active section
    const [schedulePage, setSchedulePage] = useState(1);  // New state for schedule pagination
    const [recordsPage, setRecordsPage] = useState(1);  // New state for medical records pagination
    const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility
    const [selectedRecord, setSelectedRecord] = useState(null); // State to store the selected record
    const rowsPerPage = 5; // Number of rows to display per page
    const rowsInPage = 1; // Number of rows to display per page

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                const customerId = decodedToken.user_id;

                // Fetching schedule data
                fetch(`https://localhost:7157/api/profile/${customerId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (Array.isArray(data.schedules)) {
                            setSchedule(data.schedules);
                        } else {
                            setSchedule([]); // Ensure schedule is an empty array if data is not as expected
                        }
                    })
                    .catch((error) => console.error("Error fetching schedule:", error));

                // Fetching medical records data
                fetch(`https://localhost:7157/api/admin/record`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            const filteredRecords = data.records.filter(record => String(record.customerId) === String(customerId));
                            setRecords(filteredRecords); // Set the filtered records
                        } else {
                            setRecords([]); // If no records, set an empty array
                        }
                    })
                    .catch((error) => console.error("Error fetching medical records:", error));
            }
        }

        // Check the 'payment' parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment'); // Get the 'payment' param

        if (paymentStatus) {
            if (paymentStatus === 'true') {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    text: 'Your payment has been successfully processed.',
                    confirmButtonText: 'OK',
                    timer: 5000,
                }).then(() => {
                    window.history.pushState({}, '', window.location.pathname);
                    window.location.reload(); // Refresh the page
                });
            } else if (paymentStatus === 'false') {
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Unsuccessful',
                    text: 'There was an issue with processing your payment.',
                    confirmButtonText: 'OK',
                    timer: 5000,
                }).then(() => {
                    window.history.pushState({}, '', window.location.pathname);
                    window.location.reload(); // Refresh the page
                });
            }
        }
    }, []);

    const handleSubmit = (scheduleId, price) => {
        fetch(`https://localhost:7157/api/profile/vnpay/${scheduleId}/${price}`)
            .then((response) => response.text())
            .then((paymentUrl) => {
                window.location.href = paymentUrl;
            })
            .catch((error) => {
                console.error("Error redirecting to VnPay:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Payment failed',
                    text: 'Could not proceed to payment. Please try again later.'
                });
            });
    };

    // Handle button clicks to show specific sections
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    // Handle opening the popup with the record information
    const handleCardClick = (record) => {
        setSelectedRecord(record);
        setShowPopup(true);
    };

    // Handle closing the popup
    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedRecord(null); // Reset selected record
    };

    // Pagination logic for schedule
    const indexOfLastScheduleRow = schedulePage * rowsPerPage;
    const indexOfFirstScheduleRow = indexOfLastScheduleRow - rowsPerPage;
    const currentScheduleRows = schedule.slice(indexOfFirstScheduleRow, indexOfLastScheduleRow);
    const totalSchedulePages = Math.ceil(schedule.length / rowsPerPage);

    // Pagination logic for medical records
    const indexOfLastRecordRow = recordsPage * rowsInPage;
    const indexOfFirstRecordRow = indexOfLastRecordRow - rowsInPage;
    const currentRecordRows = records.slice(indexOfFirstRecordRow, indexOfLastRecordRow);
    const totalRecordPages = Math.ceil(records.length / rowsInPage);

    const handleSchedulePageChange = (page) => {
        if (page >= 1 && page <= totalSchedulePages) {
            setSchedulePage(page);
        }
    };

    const handleRecordPageChange = (page) => {
        if (page >= 1 && page <= totalRecordPages) {
            setRecordsPage(page);
        }
    };

    return (
        <main className={styles.main} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <Heading title="HỒ SƠ KHÁCH HÀNG" />

            <div className={styles.buttonContainer}>
                <button
                    className={styles.toggleButton}
                    onClick={() => handleSectionChange('schedule')}
                >
                    Xem Lịch Hẹn
                </button>
                <button
                    className={styles.toggleButton}
                    onClick={() => handleSectionChange('profile')}
                >
                    Xem Hồ Sơ Khám Bệnh
                </button>
            </div>

            {activeSection === 'schedule' && (
                <div className={styles.scheduleContent}>
                    <table className={styles.profileTable}>
                        <thead>
                            <tr>
                                <th>STT Lịch Hẹn</th>
                                <th>Ngày hẹn</th>
                                <th>Bác sĩ khám</th>
                                <th>Dịch vụ khám</th>
                                <th>Số tiền</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(currentScheduleRows) && currentScheduleRows.map((schedule, index) => (
                                <tr key={index}>
                                    <td>{index + 1 + indexOfFirstScheduleRow}</td>
                                    <td>{schedule.date}</td>
                                    <td>{schedule.doctorName}</td>
                                    <td>{schedule.treatmentName}</td>
                                    <td>{schedule.price}</td>
                                    <td>{schedule.status}</td>
                                    <td>
                                        {schedule.status === "Chưa Thanh Toán" ? (
                                            <button
                                                className={styles.paymentButton}
                                                onClick={() => handleSubmit(schedule.id, schedule.price)}
                                            >
                                                Thanh Toán
                                            </button>
                                        ) : ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls for Schedule */}
                    <div className={styles.pagination}>
                        <button
                            onClick={() => handleSchedulePageChange(schedulePage - 1)}
                            disabled={schedulePage === 1}
                        >
                            Prev
                        </button>
                        <span>Page {schedulePage} of {totalSchedulePages}</span>
                        <button
                            onClick={() => handleSchedulePageChange(schedulePage + 1)}
                            disabled={schedulePage === totalSchedulePages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {activeSection === 'profile' && (
                <div className={styles.profileContent}>
                    <div className={styles.cardGrid}>
                        {records.length > 0 ? (
                            currentRecordRows.map((record) => (
                                <div
                                    key={record.Id}
                                    className={styles.card}
                                    onClick={() => handleCardClick(record)}
                                >
                                    <h3>
                                        <p><strong>Ngày:</strong> {new Date(record.recordDate).toLocaleDateString()}</p>
                                    </h3>
                                </div>
                            ))
                        ) : (
                            <p>No medical records found.</p>
                        )}
                    </div>

                    {/* Pagination Controls for Records */}
                    <div className={styles.pagination}>
                        <button
                            onClick={() => handleRecordPageChange(recordsPage - 1)}
                            disabled={recordsPage === 1}
                        >
                            Prev
                        </button>
                        <span>Page {recordsPage} of {totalRecordPages}</span>
                        <button
                            onClick={() => handleRecordPageChange(recordsPage + 1)}
                            disabled={recordsPage === totalRecordPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Conditional Popup */}
            {showPopup && selectedRecord && (
                <div className={styles.popupOverlay} onClick={handleClosePopup}>
                    <div className={styles.popupContent}>
                        <h3>Chi Tiết Hồ Sơ</h3>
                        <p><strong>Họ Tên:</strong> {selectedRecord.customerName}</p>
                        <p><strong>Ngày Lập:</strong> {new Date(selectedRecord.recordDate).toLocaleDateString()}</p>
                        <p><strong>Thông Tin Chi Tiết:</strong> {selectedRecord.description}</p>
                        <p><strong>Đơn Thuốc:</strong>
                            <div>
                                {selectedRecord.medicines.map((medicine) => (
                                    <ul key={medicine.medicineId}>
                                        <li>
                                            <p>Tên Thuốc: {medicine.medicineName} - Số Lượng: {medicine.quantity}</p>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Profile;
