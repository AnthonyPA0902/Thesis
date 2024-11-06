import React, { useState, useEffect } from "react";
import '../admin_assets/css/modal.css';

const DoctorModal = ({ isOpen, onClose, onSubmit, editingTreatment }) => {
    const [formData, setFormData] = useState({
        name: '',
        session: '',
        image: '',
        priceId: '',
    });

    useEffect(() => {
        if (editingTreatment) {
            setFormData({
                name: editingTreatment.name || '',
                session: editingTreatment.session || '',
                image: editingTreatment.image || '',
                priceId: editingTreatment.priceId || ''
            });
        } else {
            setFormData({
                name: '',
                session: '',
                image: '',
                priceId: '',
            });
        }
    }, [editingTreatment]);


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
                <h2>{editingDoctor ? 'Chỉnh sửa thông tin liệu trình' : 'Tạo liệu trình'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tên liệu trình"
                        required
                    />
                    <input
                        type="text"
                        name="session"
                        value={formData.session}
                        onChange={handleInputChange}
                        placeholder="Số buổi"
                        required
                    />
                    <input
                        type="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="Hình Ảnh"
                        required
                    />
                    <select
                        name="priceId"
                        value={formData.priceId}
                        onChange={handlePriceChange}
                        required
                    >
                        <option value="">Chọn giá cả</option>
                        {treatments.map((treatment) => (
                            <option key={treatment.id} value={treatment.id}>{treatment.treatmentName}</option>
                        ))}
                    </select>
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
