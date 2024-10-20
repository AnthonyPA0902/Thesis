import React, { useState, useEffect } from 'react';
import '../../admin_assets/css/schedule.css';
import DoctorModal from '../../components/DoctorModal';
import Swal from 'sweetalert2';


const Doctor = () => {
    const [doctor, setDoctor] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);

    useEffect(() => {
        fetch("https://localhost:7157/api/admin/doctor")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (Array.isArray(data.doctors)) {
                    setDoctor(data.doctors);
                } else {
                    setDoctor([]);
                }
            })
            .catch((error) => console.error("Error fetching doctors:", error));
    }, []);

    const handleAddDoctor = (doctorData) => {
        console.log("Submitting doctor data:", doctorData);

        const payload = {
            name: doctorData.name,
            age: doctorData.age,
            address: doctorData.address,
            phone: doctorData.phone,
            email: doctorData.email,
            username: doctorData.username,
            password: doctorData.password
        };

        if (editingDoctor) {
            fetch(`https://localhost:7157/api/admin/doctor/${editingDoctor.id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then(() => refetchDoctorData())
                .catch((error) => console.error("Error editing doctor:", error));
        } else {
            fetch("https://localhost:7157/api/admin/doctor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then(() => refetchDoctorData()) 
                .catch((error) => console.error("Error updating doctor:", error));
        }
        setIsModalOpen(false);
    };

    const refetchDoctorData = () => {
        fetch("https://localhost:7157/api/admin/doctor")
        .then((response) => response.json())
        .then((updatedData) => {
            if (Array.isArray(updatedData.doctors)) {
                setDoctor(updatedData.doctors);
            }
        })
        .catch((error) => console.error("Error fetching updated doctor:", error));
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

    const handleDeleteClick = (doctorId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this doctor?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://localhost:7157/api/admin/doctor/${doctorId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        Swal.fire(
                            'Deleted!',
                            'Doctor has been deleted.',
                            'success'
                        );
                        refetchDoctorData();
                    }
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        'There was a problem deleting the doctor.',
                        'error'
                    );
                    console.error('Error deleting doctor:', error);
                });
            }
        });
    };


    return (
        <div className="content">
            <div className="doctor-container">
                <h1>Danh sách bác sĩ</h1>
                <button className="register-button" onClick={() => handleCreateClick()}>
                    Thêm bác sĩ mới
                </button>
                <br />
                <br />
                <input type="text" placeholder="Tìm kiếm theo tên bác sĩ" className="search-bar" />
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
                        {Array.isArray(doctor) && doctor.map((doctor, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.age}</td>
                                <td>{doctor.address}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.username}</td>
                                <td>{doctor.password}</td>
                                <td style={{ textAlign: 'center' }}><button onClick={() => handleEditClick(doctor.id)}><img className="icon" src="/admin_assets/img/icon/edit-icon.png" alt="edit-icon" /></button>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<button onClick={() => handleDeleteClick(doctor.id)}><img className="icon" src="/admin_assets/img/icon/delete-icon.png" alt="edit-icon" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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