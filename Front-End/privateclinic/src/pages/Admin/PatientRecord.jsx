import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

const PatientRecord = () => {
    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const pageSize = 12;

    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const customerId = searchParams.get('id');
    const customerName = searchParams.get('name');
    console.log(customerName);

    useEffect(() => {
        const fetchRecords = async (page = 1) => {
            setIsLoading(true); // Set loading to true when starting to fetch data
            try {
                const response = await fetch(`https://localhost:7157/api/admin/patient/record/${customerId}?&page=${page}&pageSize=${pageSize}`);
                const data = await response.json();
                if (data.success) {
                    console.log(data.records);
                    setRecords(data.records);
                    setTotalRecords(data.totalRecords);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.error('Error fetching records:', error);
            } finally {
                setIsLoading(false); // Set loading to false once the fetch is complete
            }
        };

        fetchRecords(currentPage);
    }, [currentPage, customerId, pageSize]); // Add customerId and pageSize as dependencies

    // Navigate to the /service page
    const goBack = () => {
        navigate('/admin/patient');
    };

    const handleCloseRecordDetail = () => {
        setSelectedRecord(null); // Close the popup by clearing the selected record
    };

    const totalPages = Math.ceil(totalRecords / pageSize);

    return (
        <div className="content">
            <h1>Hồ Sơ Khám Bệnh - {customerName}</h1>
            <button
                style={{
                    backgroundColor: '#4CAF50', // green background
                    color: 'white',             // white text
                    padding: '10px 20px',       // padding for size
                    fontSize: '16px',           // font size
                    border: 'none',             // remove default border
                    borderRadius: '5px',        // rounded corners
                    cursor: 'pointer',          // pointer cursor on hover
                    margin: '10px 0',           // margin for spacing
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // shadow effect
                }}
                onClick={goBack}
            >
                Quay Lại
            </button>
            <div className="record-container">
                {isLoading ? (
                    <p>Loading...</p> // Display loading text or a spinner
                ) : records.length === 0 ? (
                    <p style={{ color: 'red', fontWeight: 'bold', paddingLeft: '380px', fontSize: '30px' }}>
                        HIỆN CHƯA CÓ HỒ SƠ KHÁM BỆNH
                    </p>
                ) : (
                    records.map((record) => (
                        <div
                            className="record-item"
                            key={record.id}
                            onClick={() => setSelectedRecord(record)}  // Show details on click
                        >
                            <span>
                                {record.customerName} - {new Date(record.recordDate).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {selectedRecord && (
                <div className="record-detail-popup">
                    <div className="record-details-container">
                        <button className="record-detail-close-button" onClick={handleCloseRecordDetail}>X</button>
                        <h2><i>Chi Tiết Hồ Sơ</i></h2>
                        <p><strong>Họ Tên:</strong> {selectedRecord.customerName}</p>
                        <p><strong>Ngày Lập Hồ Sơ:</strong> {new Date(selectedRecord.recordDate).toLocaleDateString()}</p>
                        <p><strong>Ca Khám:</strong> {selectedRecord.checkUp}</p>
                        <p><strong>Liệu Trình:</strong> {selectedRecord.treatment}</p>
                        <p><strong>Thông Tin Chi Tiết:</strong> {selectedRecord.description}</p>
                        <p><strong>Toa Thuốc:</strong></p>
                        <ul>
                            {selectedRecord.medicines.map(medicine => (
                                <li key={medicine.medicineId}>
                                    <p>{medicine.medicineName} - Số lượng: {medicine.quantity} - {medicine.note}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PatientRecord;
