import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../admin_assets/css/checkup.css';
import decodeToken from '../../components/DecodeToken';
import CheckUpModal from '../../components/CheckUpModal';
import CheckUpRecordModal from '../../components/CheckUpRecordModal';

const localizer = momentLocalizer(moment);

const CheckUp = () => {
    const [checkups, setCheckups] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event
    const [passedEvent, setPassedEvent] = useState(null); // State to hold the selected event
    const location = useLocation();
    const [passedScheduleData, setPassedScheduleData] = useState(null); // State for passed schedule data
    const [eventData, setEventData] = useState(null); // State for passed schedule data
    const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
    const [flag, setFlag] = useState(true);
    const [roleId, setRoleId] = useState(null);

    useEffect(() => {
        // Get the passed schedule data from the location state
        setPassedScheduleData(location.state?.scheduleData || null);
        if (location.state) {
            window.history.replaceState(null, document.title, window.location.pathname);
        }
    }, [location]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                const doctorId = decodedToken.user_id;
                setRoleId(decodedToken.user_role);

                if (roleId === '2') {
                    fetch(`https://localhost:7157/api/admin/checkup/doctor/${doctorId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (Array.isArray(data.checkups)) {
                                console.log(data.checkups);
                                setCheckups(data.checkups);
                            } else {
                                setCheckups([]);
                            }
                        })
                        .catch((error) => console.error("Error fetching checkups:", error))
                } else {
                    fetch(`https://localhost:7157/api/admin/checkup`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (Array.isArray(data.checkups)) {
                                console.log(data.checkups);
                                setCheckups(data.checkups);
                            } else {
                                setCheckups([]);
                            }
                        })
                        .catch((error) => console.error("Error fetching checkups:", error))
                }
            }
        }
    }, [roleId]);

    useEffect(() => {
        if (passedScheduleData && flag) {
            setIsModalOpen(true); // Open the modal automatically if data is passed
        }
    }, [flag, passedScheduleData]);

    const hasTimeConflict = (doctorId, date, startTime, endTime, currentCheckupId) => {
        // Filter out the checkup being adjusted
        const otherCheckups = checkups.filter(checkup => checkup.id !== currentCheckupId);
        console.log(otherCheckups);

        // Check for time conflict with the remaining checkups
        return otherCheckups.some(checkup => {
            // Check if it's the same doctor and on the same date
            if (checkup.doctorId === doctorId && checkup.appointmentDate === date) {
                const existingStartTime = new Date(`${checkup.appointmentDate}T${checkup.startTime}`);
                const existingEndTime = new Date(`${checkup.appointmentDate}T${checkup.endTime}`);
                const newStartTime = new Date(`${date}T${startTime}`);
                const newEndTime = new Date(`${date}T${endTime}`);

                // Check if times overlap
                return newStartTime < existingEndTime && newEndTime > existingStartTime;
            }
            return false;
        });
    };

    const handleAddEvent = () => {
        setEventData(null);
        setPassedScheduleData(null);
        setIsModalOpen(true);  // Open the CheckUpModal
    };

    const handleAddCheckup = (checkupData) => {
        const checkupId = checkupData.id;
        const doctorId = checkupData.doctorId;
        const date = checkupData.date;
        const startTime = checkupData.startTime;
        const endTime = checkupData.endTime;
        const today = new Date();
        const currentTimePlusOneHour = new Date(today.getTime() + 60 * 60 * 1000); 

        // Check if start time and end time are within the allowed range
        const startTimeInRange = new Date(`${date}T${startTime}:00`);
        const endTimeInRange = new Date(`${date}T${endTime}:00`);
        const minTime = new Date(`${date}T08:00:00`);
        const maxTime = new Date(`${date}T22:00:00`);

        if (startTimeInRange < minTime || startTimeInRange > maxTime) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Thời gian bắt đầu phải trong khoảng từ 08:00 đến 22:00.',
            });
            return;
        }

        if (endTimeInRange < minTime || endTimeInRange > maxTime) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Thời gian kết thúc phải trong khoảng từ 08:00 đến 22:00.',
            });
            return;
        }

        // Check if the duration is exactly 30 minutes
        const durationInMinutes = (endTimeInRange - startTimeInRange) / (1000 * 60);
        if (durationInMinutes !== 30) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Thời gian khám phải là 30 phút.',
            });
            return;
        }

        // New validation to check if start time is later than end time
        if (new Date(`${date}T${startTime}:00`) > new Date(`${date}T${endTime}:00`)) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Thời gian bắt đầu không thể lớn hơn thời gian kết thúc.',
            });
            return;
        }

        // Validate that the start time is at least 1 hour from the current time
        if (date === today.toDateString() && startTime < currentTimePlusOneHour) {
            Swal.fire({
                title: 'Thời gian không hợp lệ!',
                text: 'Giờ bắt đầu phải ít nhất sau 1 giờ từ thời gian hiện tại.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Validate that the selected date is today or later
        if (date < new Date(today.toDateString())) {
            Swal.fire({
                title: 'Ngày không hợp lệ!',
                text: 'Ca khám phải bắt đầu từ hôm nay trở đi.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Check for time conflicts
        if (hasTimeConflict(parseInt(doctorId), date, `${startTime}:00`, `${endTime}:00`, checkupId)) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Bác sĩ đã có lịch vào thời gian đó',
            });
            return;
        }

        const formattedStartTime = `${checkupData.startTime}:00`;
        const formattedEndTime = `${checkupData.endTime}:00`;

        const payload = {
            name: checkupData.name,
            phone: checkupData.phone,
            date: checkupData.date,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            room: checkupData.room,
            doctorId: parseInt(checkupData.doctorId),
            treatmentId: parseInt(checkupData.treatmentId)
        };

        fetch("https://localhost:7157/api/admin/checkup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success === true) {
                    if (passedScheduleData) {
                        fetch(`https://localhost:7157/api/admin/schedule/condition/${passedScheduleData.id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        })
                    }
                    setPassedScheduleData(null);
                    setIsModalOpen(false);
                    refetchCheckUpData();
                    setFlag(false);
                }
            })
            .catch((error) => console.error("Error adding checkup:", error));
    };

    const handleEditCheckup = (checkupData) => {
        console.log(checkupData);
        setIsModalOpen(false);
        refetchCheckUpData();
    }

    const refetchCheckUpData = () => {
        fetch("https://localhost:7157/api/admin/checkup")
            .then((response) => response.json())
            .then((updatedData) => {
                if (Array.isArray(updatedData.checkups)) {
                    setCheckups(updatedData.checkups);
                }
            })
            .catch((error) => console.error("Error fetching updated schedule:", error));
    };

    const refetchCheckUpDoctorData = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                const doctorId = decodedToken.user_id;
                fetch(`https://localhost:7157/api/admin/checkup/doctor/${doctorId}`)
                    .then((response) => response.json())
                    .then((updatedData) => {
                        if (Array.isArray(updatedData.checkups)) {
                            setCheckups(updatedData.checkups);
                        }
                    })
                    .catch((error) => console.error("Error fetching updated schedule:", error));
            }
        }
    };

    // Map checkups to events for the calendar with different color based on status
    const events = checkups.map((checkup) => ({
        id: `${checkup.id}`,
        doctor: `${checkup.doctorName}`,
        name: `${checkup.name}`,
        start: new Date(`${checkup.appointmentDate}T${checkup.startTime}`),
        end: new Date(`${checkup.appointmentDate}T${checkup.endTime}`),
        room: checkup.room,
        treatment: checkup.treatmentName,
        phone: checkup.phone,
        status: checkup.status,
        doctorId: checkup.doctorId,
        treatmentId: checkup.treatmentId,
        style: {
            backgroundColor: checkup.status === "Hoàn Thành" ? "green" : "red",
            color: "white"
        }

    }));

    // Handler to open the event details popup
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleEditEvent = (event) => {
        if (selectedEvent.status !== "Chưa Hoàn Thành") {
            Swal.fire({
                icon: 'error',
                title: 'Không thể sửa ca khám đã hoàn thành',
                text: 'Ca khám này đã hoàn thành, bạn không thể xóa.',
            });
            return; // Prevent further action if status is not "Chưa Hoàn Thành"
        }

        setEventData(event); // Pass the selected event data to CheckUpModal
        setSelectedEvent(null);
        setPassedScheduleData(null);
        setIsModalOpen(true);  // Open the CheckUpModal
    };

    const handleDeleteEvent = () => {
        if (selectedEvent.status !== "Chưa Hoàn Thành") {
            Swal.fire({
                icon: 'error',
                title: 'Không thể xóa ca khám đã hoàn thành',
                text: 'Ca khám này đã hoàn thành, bạn không thể chỉnh sửa.',
            });
            return; // Prevent further action if status is not "Chưa Hoàn Thành"
        }

        Swal.fire({
            title: 'Bạn có chắc muốn xóa ca khám này không?',
            text: 'Hãy xem xét kỹ thông tin trước khi xóa!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with the delete operation
                fetch(`https://localhost:7157/api/admin/checkup/${selectedEvent.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then((data) => {
                        if (data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thành công',
                                text: 'Ca khám đã được xóa thành công.',
                            });
                            // Refetch the checkup data to update the calendar
                            refetchCheckUpData();
                            setSelectedEvent(null);  // Close the event details popup
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Lỗi',
                                text: 'Xóa ca khám không thành công.',
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting checkup:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Có lỗi xảy ra khi xóa ca khám.',
                        });
                    });
            }
        });
    };

    // Handler to close the event details popup
    const handleCloseEventDetails = () => {
        setPassedEvent(selectedEvent);
        setSelectedEvent(null);
    };

    // Open the CheckUpRecordModal when clicking "Lập Hồ Sơ"
    const handleOpenRecordModal = () => {
        if (selectedEvent.status !== "Hoàn Thành") {
            Swal.fire({
                icon: 'error',
                title: 'Không Thể Lập Hồ Sơ',
                text: 'Ca khám này chưa hoàn thành hoặc đã lập hồ sơ.',
            });
            return; // Prevent further action if status is not "Chưa Hoàn Thành"
        }

        handleCloseEventDetails();
        setIsRecordModalOpen(true);  // Open the CheckUpRecordModal
    };

    // Handle the button click to mark the schedule as complete for employee
    // const handleCompleteEvent = () => {
    //     // Send a PUT request to update the status of the selected checkup by its ID
    //     fetch(`https://localhost:7157/api/admin/checkup/finish/${selectedEvent.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(() => {
    //             // After successful update, update the status locally and refetch data
    //             setSelectedEvent(prev => ({ ...prev, status: "Hoàn Thành" }));
    //             refetchCheckUpData(); // Refetch the updated checkups
    //             setSelectedEvent(null);
    //         })
    //         .catch(error => console.error("Error updating checkup status:", error));
    // };


    // Handle the button click to mark the schedule as complete for doctor
    const handleComplete = () => {
        if (selectedEvent.status === "Hoàn Thành" || selectedEvent.status === "Hoàn Thành Tốt") {
            Swal.fire({
                icon: 'error',
                title: 'Đã Xác Nhận',
                text: 'Ca khám đã được hoàn thành.',
            });
            return; // Prevent further action if status is not "Chưa Hoàn Thành"
        }

        const currentDate = new Date(); // Current date and time
        const appointmentDate = new Date(selectedEvent.start); // Parse appointment date
        const endTime = new Date(selectedEvent.end); // Parse appointment end time
        console.log(currentDate);
        console.log(appointmentDate);
        console.log(endTime);
        // Validation: Check if the date is in the past
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const appointmentDateWithoutTime = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());
        console.log(currentDateWithoutTime);
        console.log(appointmentDateWithoutTime);
        if (appointmentDateWithoutTime > currentDateWithoutTime) {
            Swal.fire({
                icon: 'warning',
                title: 'Không Thể Xác Nhận Hoàn Thành',
                text: 'Ca khám chưa được tiến hành.',
                confirmButtonText: 'OK',
            });
            return; // Stop execution
        }

        // If the date is today, validate the end time
        if (appointmentDateWithoutTime.getTime() === currentDateWithoutTime.getTime()) {
            if (endTime > currentDate) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Không Thể Xác Nhận Hoàn Thành',
                    text: 'Chưa đến thời gian kết thúc ca khám',
                    confirmButtonText: 'OK',
                });
                return; // Stop execution
            }
        }

        // Send a PUT request to update the status of the selected checkup by its ID
        fetch(`https://localhost:7157/api/admin/checkup/finish/${selectedEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(() => {
                // After successful update, update the status locally and refetch data
                setSelectedEvent(prev => ({ ...prev, status: "Hoàn Thành" }));
                refetchCheckUpDoctorData(); // Refetch the updated checkups
                setSelectedEvent(null);
            })
            .catch(error => console.error("Error updating checkup status:", error));
    };

    const handleCreateRecordForDoctor = () => {
        refetchCheckUpDoctorData();
    }

    // const handleCreateRecord = () => {
    //     refetchCheckUpData();
    // }

    if (roleId === '2') {
        return (
            <div className="content">
                <div className="container">
                    <h1>Ca Khám</h1>
                    <br />
                    <br />
                    {/* Add the new section with the colored circles below the heading */}
                    <div className="status-circles" style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '20px' }}>
                        <div className="circle blue" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10px', height: '10px', borderRadius: '50%', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '10px', fontSize: '14px', backgroundColor: 'blue' }}>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: 'blue' }}>
                            Chưa Hoàn Thành
                        </div>

                        <div className="circle green" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10px', height: '10px', borderRadius: '50%', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '10px', fontSize: '14px', backgroundColor: 'green' }}>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: 'green' }}>
                            Đã Hoàn Thành
                        </div>

                        <div className="circle orange" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10px', height: '10px', borderRadius: '50%', color: 'black', fontWeight: 'bold', textAlign: 'center', padding: '10px', fontSize: '14px', backgroundColor: 'orange' }}>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: 'orange' }}>
                            Đã Hoàn Thành & Lập Hồ Sơ
                        </div>
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        defaultView="week"
                        views={['week', 'day']}
                        onSelectEvent={handleSelectEvent}
                        eventPropGetter={(event) => {
                            // Customize the styles for events
                            let backgroundColor = 'blue'; // default color
                            let color = 'white'; // text color

                            // Change the color based on event properties, e.g., status
                            if (event.status === 'Hoàn Thành') {
                                backgroundColor = 'green'; // Completed events
                            } else if (event.status === 'Hoàn Thành Tốt') {
                                backgroundColor = 'orange'; // Not completed events
                            }

                            return {
                                style: {
                                    backgroundColor,
                                    color,
                                },
                            };
                        }}
                    />

                    <CheckUpRecordModal
                        isOpen={isRecordModalOpen}  // Control visibility with this state
                        onClose={() => setIsRecordModalOpen(false)}
                        onSubmit={handleCreateRecordForDoctor}
                        recordData={passedEvent}
                    />

                    {selectedEvent && (
                        <div className="popup-overlay" onClick={handleCloseEventDetails}>
                            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                <h3>Thông Tin Ca Khám</h3>
                                <p><strong>Tên Bệnh Nhân:</strong> {selectedEvent.name}</p>
                                <p><strong>Số Điện Thoại:</strong> {selectedEvent.phone}</p>
                                <p><strong>Ngày Khám:</strong> {selectedEvent.start.toLocaleDateString()}</p>
                                <p><strong>Tên Bác Sĩ:</strong> {selectedEvent.doctor}</p>
                                <p><strong>Thời Gian Khám:</strong> {`${selectedEvent.start.toLocaleTimeString()} - ${selectedEvent.end.toLocaleTimeString()}`}</p>
                                <p><strong>Phòng Khám:</strong> {selectedEvent.room}</p>
                                <p><strong>Liệu Trình:</strong> {selectedEvent.treatment}</p>
                                <div className="popup-buttons">
                                    <button onClick={handleComplete}>Hoàn Thành</button>
                                    <button onClick={handleOpenRecordModal}>Lập Hồ Sơ</button>  {/* Open the CheckUpRecordModal */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className="content">
                <div className="container">
                    <h1>Ca Khám</h1>
                    <button className="register-button" onClick={handleAddEvent}>
                        Tạo Ca Khám Mới
                    </button>
                    <br />
                    <br />
                    {/* Add the new section with the colored circles below the heading */}
                    <div className="status-circles" style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '20px' }}>
                        <div className="circle blue" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10px', height: '10px', borderRadius: '50%', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '10px', fontSize: '14px', backgroundColor: 'blue' }}>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: 'blue' }}>
                            Chưa Hoàn Thành
                        </div>

                        <div className="circle green" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10px', height: '10px', borderRadius: '50%', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '10px', fontSize: '14px', backgroundColor: 'green' }}>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: 'green' }}>
                            Đã Hoàn Thành
                        </div>

                        <div className="circle orange" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10px', height: '10px', borderRadius: '50%', color: 'black', fontWeight: 'bold', textAlign: 'center', padding: '10px', fontSize: '14px', backgroundColor: 'orange' }}>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', color: 'orange' }}>
                            Đã Hoàn Thành & Lập Hồ Sơ
                        </div>
                    </div>
                    {/* Calendar for checkups */}
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        defaultView="week"
                        views={['week', 'day']}
                        onSelectEvent={handleSelectEvent}
                        eventPropGetter={(event) => {
                            // Customize the styles for events
                            let backgroundColor = 'blue'; // default color
                            let color = 'white'; // text color

                            // Change the color based on event properties, e.g., status
                            if (event.status === 'Hoàn Thành') {
                                backgroundColor = 'green'; // Completed events
                            } else if (event.status === 'Hoàn Thành Tốt') {
                                backgroundColor = 'orange'; // Not completed events
                            }

                            return {
                                style: {
                                    backgroundColor,
                                    color,
                                },
                            };
                        }}
                    />

                    <CheckUpModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleAddCheckup}
                        onEdit={handleEditCheckup}
                        initialData={passedScheduleData}
                        currentData={eventData}
                        hasTimeConflict={hasTimeConflict} // Pass the function here
                    />

                    {/* <CheckUpRecordModal
                        isOpen={isRecordModalOpen}  // Control visibility with this state
                        onClose={() => setIsRecordModalOpen(false)}
                        onSubmit={handleCreateRecord}
                        recordData={passedEvent}
                    /> */}

                    {selectedEvent && (
                        <div className="popup-overlay" onClick={handleCloseEventDetails}>
                            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                <div className="new-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <button onClick={() => handleEditEvent(selectedEvent)}>Chỉnh Sửa</button> {/* Edit button */}
                                    <button onClick={handleDeleteEvent}>Xóa</button>  {/* Delete Button */}
                                </div>
                                <h3>Thông Tin Ca Khám</h3>
                                <p><strong>Tên Bệnh Nhân:</strong> {selectedEvent.name}</p>
                                <p><strong>Số Điện Thoại:</strong> {selectedEvent.phone}</p>
                                <p><strong>Ngày Khám:</strong> {selectedEvent.start.toLocaleDateString()}</p>
                                <p><strong>Tên Bác Sĩ:</strong> {selectedEvent.doctor}</p>
                                <p><strong>Thời Gian Khám:</strong> {`${selectedEvent.start.toLocaleTimeString()} - ${selectedEvent.end.toLocaleTimeString()}`}</p>
                                <p><strong>Phòng Khám:</strong> {selectedEvent.room}</p>
                                <p><strong>Liệu Trình:</strong> {selectedEvent.treatment}</p>
                                {/* <div className="popup-buttons">
                                    <button onClick={handleCompleteEvent}>Hoàn Thành</button>
                                    <button onClick={handleOpenRecordModal}>Lập Hồ Sơ</button>  
                                </div> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };
};

export default CheckUp;
