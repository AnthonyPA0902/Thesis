import React, { useState, useEffect } from "react";
import '../admin_assets/css/modal.css';

const TreatmentModal = ({ isOpen, onClose, onSubmit, editingTreatment }) => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(editingTreatment?.image ? `data:image/jpeg;base64,${editingTreatment.image}` : null);
    const [formData, setFormData] = useState({
        name: '',
        session: '',
        price: '',
        image: null,
    });

    useEffect(() => {
        if (editingTreatment) {
            setFormData({
                name: editingTreatment.name || '',
                session: editingTreatment.session || '',
                price: editingTreatment.price || '',
                image: null, // Keep this null to avoid overwriting if no new image is selected
            });
            setPreviewImage(editingTreatment.image ? `data:image/jpeg;base64,${editingTreatment.image}` : null);
        } else {
            setFormData({
                name: '',
                session: '',
                price: '',
                image: null,
            });
            setPreviewImage(null);
        }
    }, [editingTreatment]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));  // Preview the newly selected image
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, image }); // Pass the form data with the updated or existing image
        setPreviewImage(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="popup-modal">
                <h2>{editingTreatment ? 'Chỉnh sửa thông tin liệu trình' : 'Tạo liệu trình'}</h2>
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
                        type="number"
                        name="session"
                        value={formData.session}
                        onChange={handleInputChange}
                        placeholder="Số buổi"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Giá tiền"
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                    {previewImage && (
                        <div className="image-preview-container">
                            <p>Hình ảnh hiện tại:</p>
                            <img src={previewImage} alt="Treatment Preview" className="image-preview" />
                        </div>
                    )}

                    <div className="button-container">
                        <button type="submit" className="submit-button">{editingTreatment ? 'Lưu' : 'Thêm'}</button>
                        <button type="button" onClick={onClose} className="close-button">Đóng</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TreatmentModal;
