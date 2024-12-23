import React, { useState, useEffect } from 'react';
import '../../admin_assets/css/schedule.css';
import ScheduleModal from '../../components/ScheduleModal';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Schedule = () => {
    const [schedule, setSchedule] = useState([]); // Schedule data state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
    const [editingSchedule, setEditingSchedule] = useState(null); // For editing a schedule
    const [searchTerm, setSearchTerm] = useState(""); // For search input
    const [currentPage, setCurrentPage] = useState(1); // For current page
    const [totalRecords, setTotalRecords] = useState(0); // Total records for pagination
    const [pageSize] = useState(5); // Page size for pagination (Fixed size)
    const [selectedDate, setSelectedDate] = useState(""); // For the date filter
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        // Fetch schedule data with pagination, search term, and selected date
        refetchScheduleData(searchTerm, currentPage, pageSize, selectedDate);
    }, [currentPage, pageSize, searchTerm, selectedDate]); // Include selectedDate in the dependencies array

    const refetchScheduleData = (search = "", page = 1, pageSize = 5, date = "") => {
        fetch(`https://localhost:7157/api/admin/schedule?search=${encodeURIComponent(search)}&page=${page}&pageSize=${pageSize}&date=${encodeURIComponent(date)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setSchedule(data.schedules);
                    setTotalRecords(data.totalRecords);
                }
            })
            .catch((error) => console.error("Error fetching updated schedule:", error));
    };

    const handleCheckupClick = (scheduleData) => {
        navigate('/admin/checkup', { state: { scheduleData } });
    };

    const handleAddSchedule = (scheduleData) => {
        const payload = {
            name: scheduleData.name,
            phone: scheduleData.phone,
            email: scheduleData.email,
            date: scheduleData.date,
            doctorId: parseInt(scheduleData.doctorId),
            treatmentId: parseInt(scheduleData.treatmentId),
        };

        if (editingSchedule) {
            fetch(`https://localhost:7157/api/admin/schedule/${editingSchedule.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then(() => refetchScheduleData(searchTerm, currentPage, pageSize, selectedDate))
                .catch((error) => console.error("Error editing schedule:", error));
        } else {
            fetch("https://localhost:7157/api/admin/schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then(() => refetchScheduleData(searchTerm, currentPage, pageSize, selectedDate))
                .catch((error) => console.error("Error adding schedule:", error));
        }
        setIsModalOpen(false);
    };


    const handleCreateClick = () => {
        setEditingSchedule(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (id) => {
        fetch(`https://localhost:7157/api/admin/schedule/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEditingSchedule(data.schedule);
                setIsModalOpen(true);
            })
            .catch((error) => console.error("Error fetching schedule:", error));
    };

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(totalRecords / pageSize); // Total number of pages

    // Calculate the range of pages to display (4 pages at a time)
    const maxPagesToShow = 4;

    // Ensure that there are always 4 pages displayed at most, even when near the last page
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust the startPage if the endPage is close to the totalPages
    if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    // Create an array of page numbers to display
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const handleDeleteClick = (scheduleId) => {
        // Show SweetAlert2 confirmation dialog
        Swal.fire({
            title: 'Xác nhận thông tin?',
            text: "Bạn có muốn xóa lịch hẹn này không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://localhost:7157/api/admin/schedule/${scheduleId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        Swal.fire(
                            'Deleted!',
                            'Lịch hẹn đã bị hủy.',
                            'success'
                        );
                        refetchScheduleData(searchTerm, currentPage, pageSize, selectedDate)
                    } 
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        'There was a problem deleting the schedule.',
                        'error'
                    );
                    console.error('Error deleting schedule:', error);
                });
            }
        });
    };

    return (
        <div className="content">
            <div className="schedule-container">
                <h1>Danh sách lịch hẹn khám</h1>
                <button className="register-button" style={{ display: 'none' }} onClick={() => handleCreateClick()}>
                    Tạo lịch hẹn khám mới
                </button>
                <br />
                <br />
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên bác sĩ"
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Date filter input */}
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setCurrentPage(1); // Reset to the first page whenever the date filter changes
                    }}
                    className="date-filter"
                />

                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Ngày hẹn</th>
                            <th>Bác sĩ khám</th>
                            <th>Dịch vụ khám</th>
                            <th>Trạng Thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(schedule) && schedule.map((schedule, index) => (
                            <tr key={index}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td> {/* Adjust for pagination */}
                                <td>{schedule.name}</td>
                                <td>{schedule.phone}</td>
                                <td>{schedule.email}</td>
                                <td>{new Date(schedule.date).toLocaleDateString('en-GB')}</td>
                                <td>{schedule.doctorName}</td>
                                <td>{schedule.treatmentName}</td>
                                <td style={{ textAlign: 'center', fontWeight: '700', color: schedule.condition === "Đã Xếp Ca" ? 'green' : schedule.condition === "Chưa Xếp Ca" ? 'red' : 'black' }}>
                                    {schedule.condition}
                                    <br />
                                    {schedule.condition === "Chưa Xếp Ca" && (
                                        <button onClick={() => handleCheckupClick(schedule)}>
                                            <img className="icon" src="/admin_assets/img/icon/checkup-icon.png" alt="checkup-icon" />
                                        </button>
                                    )}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button style={{ marginRight: '10px', marginBottom: '5px' }} onClick={() => handleEditClick(schedule.id)}>
                                        <img className="icon" src="/admin_assets/img/icon/edit-icon.png" alt="edit-icon" />
                                    </button>
                                    <button onClick={() => handleDeleteClick(schedule.id)}>
                                        <img className="icon" src="/admin_assets/img/icon/delete-icon.png" alt="edit-icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => handlePaginationClick(currentPage - 1)} disabled={currentPage === 1}>
                        Trước
                    </button>
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePaginationClick(page)}
                            className={page === currentPage ? "active" : ""}
                        >
                            {page}
                        </button>
                    ))}

                    <button onClick={() => handlePaginationClick(currentPage + 1)} disabled={currentPage === totalPages}>
                        Sau
                    </button>
                </div>
                <ScheduleModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddSchedule}
                    editingSchedule={editingSchedule}
                />
            </div>
        </div>
    );
};

export default Schedule;
