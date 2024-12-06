import React, { useState, useEffect, useCallback } from 'react';
import '../../admin_assets/css/schedule.css';
import DoctorModal from '../../components/DoctorModal';

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);  // Store all doctors here
    const [passwordVisibility, setPasswordVisibility] = useState({}); // Track visibility for each doctor
    const [filteredDoctors, setFilteredDoctors] = useState([]);  // Store filtered list
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const fetchDoctors = useCallback((page) => {
        fetch(`https://localhost:7157/api/admin/doctor?page=${page}&pageSize=${pageSize}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.doctors)) {
                    setDoctors(data.info);  // Store all doctors
                    setFilteredDoctors(data.doctors);  // Initialize filtered doctors with all doctors
                } else {
                    setDoctors([]);
                    setFilteredDoctors([]);
                }
            })
            .catch((error) => console.error("Error fetching doctors:", error));
    }, []);  // Empty dependency array so that `fetchDoctors` doesn't change

    useEffect(() => {
        fetchDoctors(currentPage);
    }, [currentPage, fetchDoctors]);  // Include `fetchDoctors` in the dependency array

    useEffect(() => {
        // Filter the doctors based on searchTerm when it changes
        const filtered = doctors.filter(d =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDoctors(filtered);
    }, [searchTerm, doctors]);  // Re-run when searchTerm or doctors changes

    const handleAddDoctor = (doctorData) => {
        const payload = {
            name: doctorData.name,
            age: doctorData.age,
            address: doctorData.address,
            phone: doctorData.phone,
            email: doctorData.email,
            username: doctorData.username,
            password: doctorData.password
        };

        const url = editingDoctor
            ? `https://localhost:7157/api/admin/doctor/${editingDoctor.id}`
            : "https://localhost:7157/api/admin/doctor";

        const method = editingDoctor ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then(() => refetchDoctorData())
            .catch((error) => console.error("Error updating doctor:", error));

        setIsModalOpen(false);
    };

    const refetchDoctorData = () => {
        fetchDoctors(currentPage);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleCreateClick = () => {
        setEditingDoctor(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (id) => {
        fetch(`https://localhost:7157/api/admin/doctor/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEditingDoctor(data.doctor);
                setIsModalOpen(true);
            })
            .catch((error) => console.error("Error fetching doctor:", error));
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);  // Update searchTerm state
    };

    // Paginate the filtered doctors
    const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Toggle password visibility for a specific doctor
    const togglePasswordVisibility = (id) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle the visibility for the given id
        }));
    };

    return (
        <div className="content">
            <div className="doctor-container">
                <h1>Danh sách bác sĩ</h1>
                <button className="register-button" onClick={handleCreateClick}>
                    Thêm bác sĩ mới
                </button>
                <br /><br />
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên bác sĩ"
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <table className="doctor-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Tuổi</th>
                            <th>Địa Chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(paginatedDoctors) && paginatedDoctors
                            .map((doctor, index) => (
                                <tr key={index}>
                                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.age}</td>
                                    <td>{doctor.address}</td>
                                    <td>{doctor.phone}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.username}</td>
                                    <td
                                        onClick={() => togglePasswordVisibility(doctor.id)}
                                        style={{ cursor: "pointer", userSelect: "none" }}
                                    >
                                        {passwordVisibility[doctor.id] ? doctor.password : "••••••••"}
                                    </td>

                                    <td style={{ textAlign: 'center' }}>
                                        <button onClick={() => handleEditClick(doctor.id)}>
                                            <img className="icon" src="/admin_assets/img/icon/edit-icon.png" alt="edit-icon" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {Math.ceil(filteredDoctors.length / pageSize)}</span>
                    <button
                        disabled={currentPage === Math.ceil(filteredDoctors.length / pageSize)}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
                <DoctorModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddDoctor}
                    editingDoctor={editingDoctor}
                />
            </div>
        </div>
    );
};

export default Doctor;
