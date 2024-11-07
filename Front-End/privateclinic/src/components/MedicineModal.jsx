import React, { useState, useEffect } from "react";
import '../admin_assets/css/modal.css';
import Swal from 'sweetalert2'; // Import SweetAlert2


const MedicineModal = ({ isOpen, onClose, onSubmit, editingMedicine }) => {
    const [formData, setFormData] = useState({
        name: '',
        available: '',
        total: '',
        expiredDate: ''
    });

    useEffect(() => {
        if (editingMedicine) {
            setFormData({
                name: editingMedicine.name,
                available: editingMedicine.available,
                total: editingMedicine.total,
                expiredDate: editingMedicine.expiredDate,
            });
        }
    }, [editingMedicine]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (parseInt(formData.available) > parseInt(formData.total)) {
            // Show SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Số lượng tồn tại không được lớn hơn số lượng tổng!',
                confirmButtonText: 'OK'
            });
            return; // Stop the submission if the condition is met
        }

        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="popup-modal">
                <h2>{editingMedicine ? 'Chỉnh Sửa Dữ Liệu Thuốc' : 'Thêm Thuốc Mới'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tên Thuốc"
                        required
                    />
                    <input
                        type="number"
                        name="available"
                        value={formData.available}
                        onChange={handleInputChange}
                        placeholder="Số Lượng Còn Lại"
                        required
                    />
                    <input
                        type="number"
                        name="total"
                        value={formData.total}
                        onChange={handleInputChange}
                        placeholder="Tổng Số Lượng"
                        required
                    />
                    <input
                        type="date"
                        name="expiredDate"
                        value={formData.expiredDate}
                        onChange={handleInputChange}
                        placeholder="Ngày Hết Hạn"
                        required
                    />
                    <div className="button-container">
                        <button type="submit" className="submit-button">
                            {editingMedicine ? 'Chỉnh Sửa' : 'Thêm'}
                        </button>
                        <button type="button" onClick={onClose} className="close-button">
                            Đóng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MedicineModal;
