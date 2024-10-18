import React, { useState, useEffect } from "react"
import '../../admin_assets/css/schedule.css';
import EquipmentModal from '../../components/EquipmentModal';
import Swal from 'sweetalert2';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState(null);

    useEffect(() => {
        fetch("https://localhost:7157/api/admin/equipment")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (Array.isArray(data.equipments)) {
                    setEquipment(data.equipments);
                } else {
                    setEquipment([]);
                }
            })
            .catch((error) => console.error("Error fetching equipments:", error));
    }, []);

    const handleAddEquipment = (equipmentData) => {
        console.log("Submitting equipment data:", equipmentData);

        const payload = {
            name: equipmentData.name,
            status: equipmentData.status,
            cleaningTime: equipmentData.cleaningTime,
            maintenance: equipmentData.maintenance,
        };

        if (editingEquipment) {
            fetch(`https://localhost:7157/api/admin/equipment/${editingEquipment.id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then(() => refetchEquipmentData())
                .catch((error) => console.error("Error editing equipment:", error));
        } else {
            fetch("https://localhost:7157/api/admin/equipment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then(() => refetchEquipmentData()) 
                .catch((error) => console.error("Error updating equipment:", error));
        }
        setIsModalOpen(false);
    };

    const refetchEquipmentData = () => {
        fetch("https://localhost:7157/api/admin/equipment")
        .then((response) => response.json())
        .then((updatedData) => {
            if (Array.isArray(updatedData.equipments)) {
                setEquipment(updatedData.equipments);
            }
        })
        .catch((error) => console.error("Error fetching updated equipments:", error));
    };

    const handleCreateClick = () => {
        setEditingEquipment(null);
        setIsModalOpen(true); 
    };

    const handleEditClick = (id) => {
        fetch(`https://localhost:7157/api/admin/equipment/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEditingEquipment(data.equipment); 
                setIsModalOpen(true); 
            })
            .catch((error) => console.error("Error fetching equipment:", error));
    };

    const handleDeleteClick = (equipmentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this equipment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://localhost:7157/api/admin/equipment/${equipmentId}`, {
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
                            'Equipment has been deleted.',
                            'success'
                        );
                        refetchEquipmentData();
                    }
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        'There was a problem deleting the equipment.',
                        'error'
                    );
                    console.error('Error deleting equipment:', error);
                });
            }
        });
    };


    return (
        <div className="content">
            <div className="equipment-container">
                <h1>Danh sách bác sĩ</h1>
                <button className="register-button" onClick={() => handleCreateClick()}>
                    Thêm bác sĩ mới
                </button>
                <br />
                <br />
                <input type="text" placeholder="Tìm kiếm theo thiết bị" className="search-bar" />
                <table className="equipment-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên thiết bị</th>
                            <th>Tình trạng</th>
                            <th>Ngày dọn dẹp</th>
                            <th>Bảo hành</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(equipment) && equipment.map((equipment, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{equipment.name}</td>
                                <td>{equipment.status}</td>
                                <td>{equipment.cleaningTime}</td>
                                <td>{equipment.maintenance}</td>
                                <td style={{ textAlign: 'center' }}><button onClick={() => handleEditClick(equipment.id)}><img className="icon" src="/admin_assets/img/icon/edit-icon.png" alt="edit-icon" /></button>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<button onClick={() => handleDeleteClick(equipment.id)}><img className="icon" src="/admin_assets/img/icon/delete-icon.png" alt="edit-icon" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <EquipmentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddEquipment}
                    editingEquipment={editingEquipment}
                />
            </div>
        </div>
    );
};

export default Equipment;