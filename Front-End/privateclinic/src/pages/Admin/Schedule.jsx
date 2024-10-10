import React, { useState, useEffect } from 'react';
import '../../admin_assets/css/schedule.css';
import ScheduleModal from '../../components/ScheduleModal';


const Schedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch("https://localhost:7157/api/admin/schedule")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (Array.isArray(data.schedules)) {
                    setSchedule(data.schedules);
                } else {
                    setSchedule([]);
                }
            })
            .catch((error) => console.error("Error fetching checkups:", error));
    }, []);

    const handleAddCheckup = (scheduleData) => {
        console.log("Submitting checkup data:", scheduleData);

        const payload = {
            name: scheduleData.name,
            phone: scheduleData.phone,
            email: scheduleData.email,
            date: scheduleData.date,
            doctorId: parseInt(scheduleData.doctorId),
            treatmentId: parseInt(scheduleData.treatmentId)
        };


        fetch("https://localhost:7157/api/admin/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Refetch schedule list
                    fetch("https://localhost:7157/api/admin/schedule")
                        .then((response) => response.json())
                        .then((updatedData) => {
                            if (Array.isArray(updatedData.schedules)) {
                                setSchedule(updatedData.schedules);
                            }
                        })
                        .catch((error) => console.error("Error fetching updated schedule:", error));
                    setIsModalOpen(false);
                } else {
                    console.error("Failed to add checkup:", data.message);
                }
            })
            .catch((error) => console.error("Error adding checkup:", error));
    };

    return (
        <div className="content">
            <div className="schedule-container">
                <h1>Danh sách lịch hẹn khám</h1>
                <button className="register-button" onClick={() => setIsModalOpen(true)}>
                    Tạo lịch hẹn khám mới
                </button>
                <br />
                <br />
                <input type="text" placeholder="Tìm kiếm theo tên bác sĩ" className="search-bar" />
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(schedule) && schedule.map((schedule, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{schedule.name}</td>
                                <td>{schedule.phone}</td>
                                <td>{schedule.email}</td>
                                <td>{schedule.date}</td>
                                <td>{schedule.doctorName}</td>
                                <td>{schedule.treatmentName}</td>
                                <td style={{ textAlign: 'center' }}><a href='/admin/schedule'><img className="icon" src="/admin_assets/img/icon/edit-icon.png" alt="edit-icon" /></a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='/admin/schedule'><img className="icon" src="/admin_assets/img/icon/delete-icon.png" alt="edit-icon" /></a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ScheduleModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddCheckup}
                />
            </div>
        </div>
    );
};

export default Schedule;