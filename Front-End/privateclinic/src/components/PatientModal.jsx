import React, { useState, useEffect } from "react";
import styles from '../admin_assets/css/patientModal.module.css';

const PatientModal = ({ isOpen, onClose, onSubmit, editingPatient }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (editingPatient) {
            setFormData({
                name: editingPatient.name || '',
                age: editingPatient.age || '',
                address: editingPatient.address || '',
                phone: editingPatient.phone || '',
                email: editingPatient.email || ''
            });
        } else {
            setFormData({
                name: '',
                age: '',
                address: '',
                phone: '',
                email: ''
            });
        }
    }, [editingPatient]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://localhost:7157/api/admin/patient/${editingPatient.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.success) {
                onSubmit({ ...editingPatient, ...formData });
                onClose();
            } else {
                alert(data.message || 'Failed to update patient');
            }
        } catch (error) {
            alert('An error occurred while updating patient data');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.popupModal}>
                <h2>Edit Patient Information</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
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
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.submitButton}>Save</button>
                        <button type="button" onClick={onClose} className={styles.closeButton}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientModal;
