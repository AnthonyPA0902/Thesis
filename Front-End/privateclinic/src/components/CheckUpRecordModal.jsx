import React, { useEffect, useState } from 'react';
import styles from '../admin_assets/css/recordmodal.module.css';
import Swal from 'sweetalert2';

const CheckUpRecordModal = ({ isOpen, onClose, onSubmit, recordData }) => {
    const [formData, setFormData] = useState({
        checkup: '',  // For time in the format "startTime - endTime"
        treatment: '',
        description: '',
        recordDate: '',
        customerId: '',
        medicines: [],
    });
    const [checkupId, setCheckupId] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [customers, setCustomers] = useState([]);

    // Prefill form when recordData is passed in
    useEffect(() => {
        if (isOpen && recordData) {
            console.log(recordData);
            setCheckupId(recordData.id);
            // Convert the start and end times to Date objects
            const startDate = new Date(recordData.start);
            const temp = new Date(recordData.start);
            const endDate = new Date(recordData.end);
            const date = temp.toISOString().split('T')[0];

            // Format the times to "HH:mm"
            const formattedStartTime = startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            const formattedEndTime = endDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

            // Find the customerId by matching customer name
            console.log(recordData.name)
            console.log(customers)
            const customer = customers.find(c => c.name === recordData.name);
            console.log(customer)

            setFormData({
                checkup: `${formattedStartTime} - ${formattedEndTime}`,  // Combining start and end time
                treatment: recordData.treatment || '', // Assuming treatment has a name
                description: recordData.description || '',
                recordDate: date || '',
                customerId: customer.id || '', // Assuming customer is an object with id and name
                medicines: recordData.medicines || [],
            });
        } else {
            // Reset form data when modal is closed
            setFormData({
                checkup: '',
                treatment: '',
                description: '',
                recordDate: '',
                customerId: '',
                medicines: [],
            });
        }
    }, [isOpen, customers, recordData]);


    // Fetch medicines on mount
    useEffect(() => {
        fetch("https://localhost:7157/api/admin/medicine")
            .then((response) => response.json())
            .then((data) => setMedicines(data.medicines || []))
            .catch((error) => console.error("Error fetching medicines info:", error));
    }, []);

    // Fetch customers on mount
    useEffect(() => {
        fetch("https://localhost:7157/api/admin/patient")
            .then((response) => response.json())
            .then((data) => setCustomers(data.patients || []))
            .catch((error) => console.error("Error fetching customers:", error));
    }, []);

    // Handle input change for text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle changes in medicine selection and quantity
    const handleMedicineChange = (e, index) => {
        const { name, value } = e.target;
        const updatedMedicines = [...formData.medicines];
        updatedMedicines[index] = {
            ...updatedMedicines[index],
            [name]: value,
        };
        setFormData({ ...formData, medicines: updatedMedicines });
    };

    // Add a new medicine dropdown
    const handleAddMedicine = () => {
        setFormData({
            ...formData,
            medicines: [...formData.medicines, { medicineId: '', quantity: 1 }], // Default quantity is 1
        });
    };

    // Remove a medicine dropdown
    const handleRemoveMedicine = (index) => {
        const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
        setFormData({ ...formData, medicines: updatedMedicines });
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            checkup: formData.checkup,
            treatment: formData.treatment,
            recordDate: formData.recordDate,
            description: formData.description,
            customerId: formData.customerId,
            medicines: formData.medicines.map((med) => ({
                medicineId: med.medicineId,
                quantity: med.quantity,
                note: med.note,
            })),
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
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo Hồ Sơ Khám Bệnh Thành Công',
                    showConfirmButton: false,
                    timer: 2000,
                });
                // After the record is created, call the CompleteCheckUp API to update the status
                const completeResponse = await fetch(`https://localhost:7157/api/admin/checkup/complete/${checkupId}`, {
                    method: 'PUT',
                });

                const completeResult = await completeResponse.json();
                if (completeResult.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Hồ Sơ Được Cập Nhật Thành Công',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: completeResult.message || 'Cập Nhật Hồ Sơ Thất Bại',
                        showConfirmButton: true,
                    });
                }

                // Call onSubmit function passed from parent to update the UI
                onSubmit();
                onClose();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: result.message || 'Tạo Hồ Sơ Thất Bại',
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error('Error submitting the record:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi khi gửi hồ sơ',
                text: 'Vui lòng thử lại sau.',
                showConfirmButton: true,
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['popup-modal']}>
                <h2>Tạo Hồ Sơ Khám Bệnh</h2>
                <div className={styles['modal-body']}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['flex-form']}>
                            <div className={styles['left-side']}>
                                <div className={styles['input-line']}>
                                    <div>
                                        <label>Ca Khám:</label>
                                        <input
                                            type="text"
                                            name="checkup"
                                            className={styles['text-input']}
                                            value={formData.checkup}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label>Liệu Trình:</label>
                                        <input
                                            type="text"
                                            name="treatment"
                                            className={styles['text-input']}
                                            value={formData.treatment}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className={styles['input-line']}>
                                    <div>
                                        <label>Tên Bệnh Nhân:</label>
                                        <select
                                            name="customerId"
                                            value={formData.customerId}
                                            className={styles['name-select']}
                                            onChange={handleInputChange}
                                            disabled
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
                                            value={formData.recordDate}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <label>Thông Tin Chi Tiết:</label><br />
                                <textarea
                                    name="description"
                                    value={formData.description}
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
                                        <input
                                            type="text"
                                            name="note"
                                            className={styles['note-input']}
                                            value={medicine.note || ''}
                                            placeholder="Note"
                                            onChange={(e) => handleMedicineChange(e, index)}
                                        />
                                        <button className={styles['record-modal-button']} type="button" onClick={() => handleRemoveMedicine(index)}>
                                            Xóa
                                        </button>
                                    </div>
                                ))}
                                <button className={styles['record-modal-button']} type="button" onClick={handleAddMedicine}>
                                    Thêm Thuốc
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles['modal-footer']}>
                    <button className={styles['record-modal-button']} style={{ backgroundColor: 'red', color: 'white', border: 'none' }} onClick={onClose}>
                        Đóng
                    </button>
                    <button className={styles['record-modal-button']} style={{ backgroundColor: 'green', color: 'white', border: 'none' }} onClick={handleSubmit}>
                        Lưu Hồ Sơ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckUpRecordModal;
