import React, { useState, useEffect } from "react";
import '../admin_assets/css/modal.css';

const CheckUpModal = ({ isOpen, onClose, onSubmit}) => {
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
            treatmentId: treatmentId // Update treatmentId in formData
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="popup-modal">
                <h2>Tạo lịch hẹn khám</h2>
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
                    <div className="button-container">
                        <button type="submit" className="submit-button">Đăng Ký</button>
                        <button type="button" onClick={onClose} className="close-button">Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckUpModal;
