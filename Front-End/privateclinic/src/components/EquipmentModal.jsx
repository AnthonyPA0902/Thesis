import React, { useState, useEffect } from "react";
import '../admin_assets/css/modal.css';

const EquipmentModal = ({ isOpen, onClose, onSubmit, editingEquipment }) => {
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        cleaningTime: '',
        maintenance: ''
    });

    useEffect(() => {
        if (editingEquipment) {
            setFormData({
                name: editingEquipment.name || '',
                status: editingEquipment.status || '',
                cleaningTime: editingEquipment.cleaningTime || '',
                maintenance: editingEquipment.maintenance || ''
            });
        } else {
            setFormData({
                name: '',
                status: '',
                cleaningTime: '',
                maintenance: ''
            });
        }
    }, [editingEquipment]);


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
                <h2>{editingEquipment ? 'Chỉnh sửa thông tin thiết bị' : 'Thêm thiết bị'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tên thiết bị"
                        required
                    />
                    <div className="select-container">
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled hidden>Chọn trạng thái</option>
                            <option value="Đang Sử Dụng">Đang Sử Dụng</option>
                            <option value="Có Thể Dùng">Có Thể Dùng</option>
                            <option value="Lau Dọn">Lau Dọn</option>
                            <option value="Bảo Hành">Bảo Hành</option>
                        </select>
                    </div>
                    <input
                        type="date"
                        name="cleaningTime"
                        value={formData.cleaningTime}
                        onChange={handleInputChange}
                        placeholder="Ngày lau dọn"
                        required
                    />
                    <input
                        type="text"
                        name="maintenance"
                        value={formData.maintenance}
                        onChange={handleInputChange}
                        placeholder="Bảo hành"
                        required
                    />
                    <div className="button-container">
                        <button type="submit" className="submit-button">{editingEquipment ? 'Lưu' : 'Thêm'}</button>
                        <button type="button" onClick={onClose} className="close-button">Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EquipmentModal;
