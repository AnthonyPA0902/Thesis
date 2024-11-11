import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../admin_assets/css/checkup.css';
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
    const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        // Get the passed schedule data from the location state
        setPassedScheduleData(location.state?.scheduleData || null);
        if (location.state) {
            window.history.replaceState(null, document.title, window.location.pathname);
        }
    }, [location]);

    useEffect(() => {
        fetch("https://localhost:7157/api/admin/checkup")
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.checkups)) {
                    console.log(data.checkups);
                    setCheckups(data.checkups);
                } else {
                    setCheckups([]);
                }
            })
            .catch((error) => console.error("Error fetching checkups:", error));
    }, []);

    useEffect(() => {
        if (passedScheduleData && flag) {
            console.log(passedScheduleData.id);
            setIsModalOpen(true); // Open the modal automatically if data is passed
        }
    }, [flag, passedScheduleData]);

    const hasTimeConflict = (doctorId, date, startTime, endTime) => {
        return checkups.some(checkup => {

            // Check if it's the same doctor and on the same date
            if (checkup.doctorId === doctorId && checkup.appointmentDate === date) {
                const existingStartTime = new Date(`${checkup.appointmentDate}T${checkup.startTime}`);
                const existingEndTime = new Date(`${checkup.appointmentDate}T${checkup.endTime}`);
                const newStartTime = new Date(`${date}T${startTime}`);
                const newEndTime = new Date(`${date}T${endTime}`);

                // Check if times overlap
                return (newStartTime < existingEndTime && newEndTime > existingStartTime);
            }
            return false;
        });
    };

    const handleAddCheckup = (checkupData) => {
        const doctorId = checkupData.doctorId;
        const date = checkupData.date;
        const startTime = checkupData.startTime;
        const endTime = checkupData.endTime;

        console.log(hasTimeConflict(parseInt(doctorId), date, `${startTime}:00`, `${endTime}:00`));

        // Check for time conflicts
        if (hasTimeConflict(parseInt(doctorId), date, `${startTime}:00`, `${endTime}:00`)) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Bác sĩ đã có lịch vào thời gian đó',
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

    // Map checkups to events for the calendar with different color based on status
    const events = checkups.map((checkup) => ({
        id: `${checkup.id}`,
        title: `${checkup.doctorName}`,
        name: `${checkup.name}`,
        start: new Date(`${checkup.appointmentDate}T${checkup.startTime}`),
        end: new Date(`${checkup.appointmentDate}T${checkup.endTime}`),
        room: checkup.room,
        treatment: checkup.treatmentName,
        phone: checkup.phone,
        status: checkup.status,
        style: {
            backgroundColor: checkup.status === "Hoàn Thành" ? "green" : "red",
            color: "white"
        }

    }));

    // Handler to open the event details popup
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    // Handler to close the event details popup
    const handleCloseEventDetails = () => {
        console.log(selectedEvent); // Không bao giờ được xóa
        setPassedEvent(selectedEvent);
        console.log(passedEvent);
        setSelectedEvent(null);
    };

    // Open the CheckUpRecordModal when clicking "Lập Hồ Sơ"
    const handleOpenRecordModal = () => {
        handleCloseEventDetails();
        setIsRecordModalOpen(true);  // Open the CheckUpRecordModal
    };

    // Handle the button click to mark the schedule as complete
    const handleCompleteEvent = () => {
        // Send a PUT request to update the status of the selected checkup by its ID
        fetch(`https://localhost:7157/api/admin/checkup/${selectedEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(() => {
                // After successful update, update the status locally and refetch data
                setSelectedEvent(prev => ({ ...prev, status: "Hoàn Thành" }));
                refetchCheckUpData(); // Refetch the updated checkups
                setSelectedEvent(null);
            })
            .catch(error => console.error("Error updating checkup status:", error));
    };

    return (
        <div className="content">
            <div className="container">
                <h1>Ca Khám</h1>
                <button className="register-button" onClick={() => setIsModalOpen(true)}>
                    Tạo Ca Khám Mới
                </button>
                <br />
                <br />
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
                    initialData={passedScheduleData}
                />

                <CheckUpRecordModal
                    isOpen={isRecordModalOpen}  // Control visibility with this state
                    onClose={() => setIsRecordModalOpen(false)}
                    onSubmit={handleAddCheckup}
                    recordData={passedEvent}  
                />

                {selectedEvent && (
                    <div className="popup-overlay" onClick={handleCloseEventDetails}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Thông Tin Ca Khám</h3>
                            <p><strong>Tên Bệnh Nhân:</strong> {selectedEvent.name}</p>
                            <p><strong>Số Điện Thoại:</strong> {selectedEvent.phone}</p>
                            <p><strong>Ngày Khám:</strong> {selectedEvent.start.toLocaleDateString()}</p>
                            <p><strong>Tên Bác Sĩ:</strong> {selectedEvent.title}</p>
                            <p><strong>Thời Gian Khám:</strong> {`${selectedEvent.start.toLocaleTimeString()} - ${selectedEvent.end.toLocaleTimeString()}`}</p>
                            <p><strong>Phòng Khám:</strong> {selectedEvent.room}</p>
                            <p><strong>Liệu Trình:</strong> {selectedEvent.treatment}</p>
                            <div className="popup-buttons">
                                <button onClick={handleCompleteEvent}>Hoàn Thành</button>
                                <button onClick={handleOpenRecordModal}>Lập Hồ Sơ</button>  {/* Open the CheckUpRecordModal */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckUp;
