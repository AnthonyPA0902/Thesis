import React, { useEffect, useState, useCallback } from 'react';
import '../../admin_assets/css/medicalrecord.css';
import RecordModal from '../../components/RecordModal';

const MedicalRecord = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [info, setInfo] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedName, setSelectedName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [uniqueNames, setUniqueNames] = useState([]);
    const [uniqueDates, setUniqueDates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [setTotalRecords] = useState(0);
    const pageSize = 12;

    // Memoize the fetchRecords function to avoid unnecessary re-creations
    const fetchRecords = useCallback(async (page = 1) => {
        try {
            const response = await fetch(`https://localhost:7157/api/admin/record?page=${page}&pageSize=${pageSize}`);
            const data = await response.json();
            if (data.success) {
                setInfo(data.info);
                setRecords(data.records);
                setTotalRecords(data.totalRecords);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    }, [setTotalRecords]); // Empty dependency array means this function is memoized only once

    // Initial fetch on component mount
    useEffect(() => {
        fetchRecords(currentPage);
    }, [currentPage, fetchRecords]); // Now it includes fetchRecords

    // Update the list of unique names and dates based on the records
    useEffect(() => {
        const getUniqueNames = info => Array.from(new Set(info.map(record => record.customerName)));
        const getUniqueDates = info => Array.from(new Set(info.map(record => new Date(record.recordDate).toLocaleDateString())));
        setUniqueNames(getUniqueNames(info));
        setUniqueDates(getUniqueDates(info));
    }, [info]);

    // Handle search and filter logic
    useEffect(() => {
        const filtered = info.filter(record => {
            const nameMatch = selectedName ? record.customerName.includes(selectedName) : true;
            const recordDate = new Date(record.recordDate).toLocaleDateString();
            const dateMatch = selectedDate ? recordDate === selectedDate : true;
            const regexMatch = searchQuery ? new RegExp(searchQuery, 'i').test(record.customerName) : true;

            return nameMatch && dateMatch && regexMatch;
        });

        setFilteredRecords(filtered);

        // If filtered records have fewer results than the current page, adjust the page
        const totalPages = Math.ceil(filtered.length / pageSize);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);  // Set to the last page if current exceeds the total pages
        } else if (filtered.length === 0) {
            setCurrentPage(1);  // Reset to first page if no results
        }
    }, [records, searchQuery, selectedName, selectedDate, currentPage, info]);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        const totalPages = Math.ceil(filteredRecords.length / pageSize);
        if (pageNumber < 1) {
            setCurrentPage(1);
        } else if (pageNumber > totalPages) {
            setCurrentPage(totalPages);
        } else {
            setCurrentPage(pageNumber);
        }
    };

    // Get the records for the current page after filtering
    const getRecordsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredRecords.slice(startIndex, endIndex);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseRecordDetail = () => {
        setSelectedRecord(null); // Close the popup by clearing the selected record
    };

    const totalPages = Math.ceil(filteredRecords.length / pageSize);

    return (
        <div className="content">
            <h1>Hồ Sơ Khám Bệnh</h1>
            <div className="modal-open-button">
                <button className="record-button" onClick={handleOpenModal}>Tạo Hồ Sơ</button>
            </div>
            <br />
            <div className="search-bar-container">
                <label htmlFor="searchInput">Tìm Kiếm Hồ Sơ:</label>
                <input
                    type="text"
                    id="searchInput"
                    className="search-input"
                    placeholder="Nhập tên hồ sơ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="filter-container">
                <div className="dropdown-container">
                    <label htmlFor="nameDropdown">Theo Tên Hồ Sơ:</label>
                    <select
                        className="record-select"
                        id="nameDropdown"
                        onChange={(e) => setSelectedName(e.target.value)}
                        value={selectedName}
                    >
                        <option value="">Tất Cả</option>
                        {uniqueNames.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="dropdown-container">
                    <label htmlFor="dateDropdown">Theo Ngày :</label>
                    <select
                        className="record-select"
                        id="dateDropdown"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        value={selectedDate}
                    >
                        <option value="">Tất Cả</option>
                        {uniqueDates.map((date, index) => (
                            <option key={index} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="record-container">
                {getRecordsForCurrentPage().map((record) => (
                    <div
                        className="record-item"
                        key={record.id}
                        onClick={() => setSelectedRecord(record)}  // Show details on click
                    >
                        <span>
                            {record.customerName} - {new Date(record.recordDate).toLocaleDateString()}
                        </span>
                    </div>
                ))}
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
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            <RecordModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default MedicalRecord;
