import React, { useState, useEffect, useMemo } from "react";
import '../admin_assets/css/modal.css';

const CheckUpModal = ({ isOpen, onClose, onSubmit, onEdit, initialData, currentData }) => {
    const [doctors, setDoctors] = useState([]);
    const [treatments, setTreatments] = useState([]);

    // Memoize the initial form state to avoid recreating it on every render
    const initialFormState = useMemo(() => ({
        name: '',
        phone: '',
        date: '',
        startTime: '',
        endTime: '',
        room: '',
        doctorId: '',
        treatmentId: ''
    }), []);

    const [formData, setFormData] = useState(initialFormState);
    const [isSetMode, setIsSetMode] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Function to format the time as "HH:mm"
    const formatTime = (date) => {
        // If the input is a Date object, use it directly
        const d = new Date(date);
        // Get the hours and minutes and format them as "HH:mm"
        const hours = d.getHours().toString().padStart(2, '0'); // Ensure 2 digits for hours
        const minutes = d.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits for minutes
        const seconds = d.getSeconds().toString().padStart(2, '0'); // Ensure 2 digits for minutes
        return `${hours}:${minutes}:${seconds}`; 
    };

    // Format the date (if needed, depending on the input format expected)
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Converts to "YYYY-MM-DD"
    };

    useEffect(() => {
        fetch("https://localhost:7157/api/admin/checkup")
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data.doctors);
                setTreatments(data.treatments);
            })
            .catch((error) => console.error("Error fetching checkup info:", error));
    }, []);

    useEffect(() => {
        console.log(currentData);
        console.log(initialData);
        if (initialData) {
            setFormData({
                ...initialData,
                startTime: '',
                endTime: '',
                room: ''
            });
            setIsSetMode(true);
        } else if (currentData) {
            setFormData({
                id: currentData.id,
                name: currentData.name,
                phone: currentData.phone,
                date: formatDate(currentData.start), // Format the date properly
                startTime: formatTime(currentData.start), // Format the start time
                endTime: formatTime(currentData.end), // Format the end time
                room: currentData.room,
                doctorId: currentData.doctorId,
                treatmentId: currentData.treatmentId
            });
            setIsEditMode(true);
        } else {
            setFormData(initialFormState);
            setIsSetMode(false);
            setIsEditMode(false);
        }
    }, [initialData, currentData, initialFormState]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            doctorId
        }));
    };

    const handleTreatmentChange = (e) => {
        const treatmentId = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            treatmentId
        }));
    };

    const removeVietnameseAccents = (text) => {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/\s+/g, "")
            .toLowerCase();
    };

    const createUserAndCheckup = async () => {
        const { name, phone } = formData;
        const nameParts = name.split(" ");
        const lastName = nameParts.pop();
        const secondLastName = nameParts.pop() || '';
        const baseUsername = removeVietnameseAccents(`${secondLastName}${lastName}`);

        const newUser = {
            name,
            phone,
            age: null,
            address: null,
            email: `${baseUsername}@gmail.com`,
            username: baseUsername,
            password: `${baseUsername}123`
        };

        try {
            const response = await fetch("https://localhost:7157/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            const result = await response.json();

            if (result.success) {
                onSubmit(formData); // proceed with checkup creation
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to register user.");
        }
    };

    const formatToHHMMSS = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const seconds = '00'; // Adding seconds as '00' if not provided
        return `${hours}:${minutes}:${seconds}`;
    };

    // API call to update an existing checkup
    const updateCheckup = async () => {
        const edit = {
            name: formData.name,
            phone: formData.phone,
            date: formData.date,
            startTime: formatToHHMMSS(formData.startTime),
            endTime: formatToHHMMSS(formData.endTime),
            room: formData.room,
            doctorId: formData.doctorId,
            treatmentId: formData.treatmentId,
        };

        try {
            const response = await fetch(`https://localhost:7157/api/admin/checkup/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(edit)
            });
            const result = await response.json();

            if (result.success) {
                onEdit(formData);
            } else {
                console.log(result.message);
            }
        } catch (error) {
            console.error("Error updating checkup:", error);
            alert("Cập nhật ca khám thất bại.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!initialData && !currentData) {
            createUserAndCheckup();
            console.log("1");
        } else if (!initialData && currentData) {
            updateCheckup();
            console.log("2");
        } else {
            onSubmit(formData);
            console.log("3");
        }
    };

    const handleClose = () => {
        setFormData(initialFormState);
        setIsSetMode(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="popup-modal">
                <h2>{isEditMode ? "Chỉnh sửa ca khám" : "Đăng ký ca khám"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tên bệnh nhân"
                        required
                        disabled={isSetMode}
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Số điện thoại"
                        required
                        disabled={isSetMode}
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        disabled={isSetMode}
                    />
                    <div className="time-inputs">
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="select-container">
                        <select
                            name="doctorId"
                            value={formData.doctorId}
                            onChange={handleDoctorChange}
                            required
                            disabled={isSetMode}
                        >
                            <option value="">Chọn bác sĩ</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                            ))}
                        </select>

                        <select
                            name="treatmentId"
                            value={formData.treatmentId}
                            onChange={handleTreatmentChange}
                            required
                            disabled={isSetMode}
                        >
                            <option value="">Chọn dịch vụ</option>
                            {treatments.map((treatment) => (
                                <option key={treatment.id} value={treatment.id}>{treatment.treatmentName}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="text"
                        name="room"
                        value={formData.room}
                        onChange={handleInputChange}
                        placeholder="Phòng khám"
                        required
                    />
                    <div className="button-container">
                        <button type="submit" className="submit-button">Đăng Ký</button>
                        <button type="button" onClick={handleClose} className="close-button">Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckUpModal;
