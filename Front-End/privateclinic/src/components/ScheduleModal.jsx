import React, { useState, useEffect } from "react";
import '../admin_assets/css/modal.css';

const ScheduleModal = ({ isOpen, onClose, onSubmit, editingSchedule }) => {
    const [doctors, setDoctors] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        doctorId: '',
        treatmentId: ''
    });

    useEffect(() => {
        fetch("https://localhost:7157/api/admin/schedule")
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data.doctors);
                setTreatments(data.treatments);
            })
            .catch((error) => console.error("Error fetching checkup info:", error));
    }, []);

    useEffect(() => {
        if (editingSchedule) {
            setFormData({
                name: editingSchedule.name || '',
                phone: editingSchedule.phone || '',
                email: editingSchedule.email || '',
                date: editingSchedule.date || '',
                doctorId: editingSchedule.doctorId || '',
                treatmentId: editingSchedule.treatmentId || ''
            });
        } else {
            setFormData({
                name: '',
                phone: '',
                email: '',
                date: '',
                doctorId: '',
                treatmentId: ''
            });
        }
    }, [editingSchedule]);


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            doctorId: doctorId // Update doctorId in formData
        }));
    };

    const handleTreatmentChange = (e) => {
        const treatmentId = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            treatmentId: treatmentId
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="popup-modal">
                <h2>{editingSchedule ? 'Chỉnh sửa lịch hẹn khám' : 'Tạo lịch hẹn khám'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tên bệnh nhân"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Số điện thoại"
                        required
                    />
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        placeholder="Ngày hẹn"
                        required
                    />
                    <div className="select-container">
                        <select
                            name="doctorId"
                            value={formData.doctorId}
                            onChange={handleDoctorChange}
                            required
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
                        >
                            <option value="">Chọn dịch vụ</option>
                            {treatments.map((treatment) => (
                                <option key={treatment.id} value={treatment.id}>{treatment.treatmentName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="submit-button">{editingSchedule ? 'Lưu' : 'Đăng Ký'}</button>
                        <button type="button" onClick={onClose} className="close-button">Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleModal;
