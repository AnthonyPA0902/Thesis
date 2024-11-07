import React, { useEffect, useState } from 'react';
import styles from '../admin_assets/css/recordmodal.module.css';

const RecordModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        description: '',
        recordDate: '',
        customerId: '',
        medicines: [], // Array to hold selected medicines and quantities
    });

    const [medicines, setMedicines] = useState([]); // State to hold the fetched medicines
    const [customers, setCustomers] = useState([]); // State to hold the fetched customers

    // Fetch medicines from API when the component mounts
    useEffect(() => {
        fetch("https://localhost:7157/api/admin/medicine")
            .then((response) => response.json())
            .then((data) => {
                setMedicines(data.medicines || []); // Ensure there is a fallback in case of no medicines
            })
            .catch((error) => console.error("Error fetching medicines info:", error));
    }, []); // Empty dependency array to run only once on mount

    // Fetch customers from API
    useEffect(() => {
        fetch("https://localhost:7157/api/admin/patient")
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data.patients || []); // Ensure there is a fallback in case of no customers
            })
            .catch((error) => console.error("Error fetching customers:", error));
    }, []); // Empty dependency array to run only once on mount

    // Handle input change for text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle medicine selection (add new dropdown)
    const handleMedicineChange = (e, index) => {
        const { name, value } = e.target;
        const updatedMedicines = [...formData.medicines];
        updatedMedicines[index] = {
            ...updatedMedicines[index],
            [name]: value, // Update selected medicine or quantity
        };
        setFormData({ ...formData, medicines: updatedMedicines });
    };

    // Add a new medicine dropdown
    const handleAddMedicine = () => {
        setFormData({
            ...formData,
            medicines: [...formData.medicines, { medicineId: '', quantity: 1 }], // Add empty medicine with default quantity
        });
    };

    // Remove a medicine dropdown
    const handleRemoveMedicine = (index) => {
        const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
        setFormData({ ...formData, medicines: updatedMedicines });
    };

    // Submit the form
    const handleSubmit = async () => {
        // Prepare the data for submission
        const data = {
            recordDate: formData.recordDate,
            description: formData.description,
            customerId: formData.customerId, // Assuming this is the selected record's customer ID
            medicines: formData.medicines.map(med => ({
                medicineId: med.medicineId,
                quantity: med.quantity,
            })),  // Include both medicineId and quantity
        };

        try {
            const response = await fetch('https://localhost:7157/api/admin/record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                alert('Medical Record Created Successfully');
                onSubmit(result); // Call the parent handler to update the list or perform other actions
                onClose(); // Close the modal
            } else {
                alert(result.message || 'Failed to create the record');
            }
        } catch (error) {
            console.error('Error submitting the record:', error);
            alert('An error occurred while submitting the record');
        }
    };


    if (!isOpen) return null;

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['popup-modal']}>
                <h2>Chi Tiết Hồ Sơ</h2>
                <div className={styles['modal-body']}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['flex-form']}>
                            <div className={styles['left-side']}>
                                <div className={styles['input-line']}>
                                    <div>
                                        <label>Tên Bệnh Nhân:</label>
                                        <select
                                            name="customerId"
                                            value={formData.customerId}
                                            className={styles['name-select']}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>Chọn Bệnh Nhân</option>
                                            {customers.map((customer) => (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label>Ngày Lập Hồ Sơ:</label>
                                        <input
                                            type="date"
                                            name="recordDate"
                                            value={formData.recordDate || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <label>Thông Tin Chi Tiết:</label><br />
                                <textarea
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', height: '150px' }}
                                />
                                <br />
                            </div>

                            <div className={styles['right-side']}>
                                <label>Toa Thuốc (Chọn Thuốc):</label>
                                {formData.medicines.map((medicine, index) => (
                                    <div key={index} className={styles['medicine-select-container']}>
                                        <select
                                            name="medicineId"
                                            value={medicine.medicineId}
                                            onChange={(e) => handleMedicineChange(e, index)}
                                        >
                                            <option value="" disabled>Chọn Thuốc</option>
                                            {medicines.map((medicineOption) => (
                                                <option key={medicineOption.id} value={medicineOption.id}>
                                                    {medicineOption.name}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={medicine.quantity}
                                            onChange={(e) => handleMedicineChange(e, index)}
                                            min="1"
                                        />
                                        <button className={styles['record-modal-button']} type="button" onClick={() => handleRemoveMedicine(index)}>
                                            Xóa
                                        </button>
                                    </div>
                                ))}

                                {/* Button to add another dropdown for medicine selection */}
                                <button className={styles['record-modal-button']} type="button" onClick={handleAddMedicine}>
                                    Thêm Thuốc
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles['modal-footer']}>
                    <button className={styles['record-modal-button']} style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }} onClick={onClose}>Hủy</button>
                    <button className={styles['record-modal-button']} style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} onClick={handleSubmit}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default RecordModal;
