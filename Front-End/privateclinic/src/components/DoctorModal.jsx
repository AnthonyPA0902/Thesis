import React, { useState, useEffect } from "react";
import '../admin_assets/css/modal.css';

const DoctorModal = ({ isOpen, onClose, onSubmit, editingDoctor }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: ''
    });

    useEffect(() => {
        if (editingDoctor) {
            setFormData({
                name: editingDoctor.name || '',
                age: editingDoctor.age || '',
                address: editingDoctor.address || '',
                phone: editingDoctor.phone || '',
                email: editingDoctor.email || '',
                username: editingDoctor.username || '',
                password: editingDoctor.password || ''
            });
        } else {
            setFormData({
                name: '',
                age: '',
                address: '',
                phone: '',
                email: '',
                username: '',
                password: ''
            });
        }
    }, [editingDoctor]);


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

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="popup-modal">
                <h2>{editingDoctor ? 'Chỉnh sửa thông tin bác sĩ' : 'Thêm bác sĩ'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tên bác sĩ"
                        required
                    />
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Tuổi"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Địa chỉ"
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
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Tên tài khoản"
                        required
                    />
                       <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Mật khẩu"
                        required
                    />
                    <div className="button-container">
                        <button type="submit" className="submit-button">{editingDoctor ? 'Lưu' : 'Thêm'}</button>
                        <button type="button" onClick={onClose} className="close-button">Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorModal;
