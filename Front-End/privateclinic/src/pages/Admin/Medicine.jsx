import React, { useState, useEffect, useCallback } from 'react';
import '../../admin_assets/css/medicine.css';
import MedicineModal from '../../components/MedicineModal';

const Medicine = () => {
    const [medicines, setMedicines] = useState([]); // All medicines
    const [filteredMedicines, setFilteredMedicines] = useState([]); // Medicines after filtering
    const [uniqueMedicines, setUniqueMedicines] = useState([]); // Unique medicine names
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [page, setPage] = useState(1); // Pagination state
    const [pageSize] = useState(10); // Number of items per page

    // Move the function declaration here to avoid the ESLint warning
    const fetchMedicines = useCallback(async () => {
        try {
            const response = await fetch(`https://localhost:7157/api/admin/medicine/query?page=${page}&pageSize=${pageSize}`);
            const data = await response.json();
            if (data.success) {
                setMedicines(data.medicines);
                setUniqueMedicines(getUniqueMedicines(data.medicines)); // Get unique medicine names
                setFilteredMedicines(data.medicines); // Initialize filtered medicines
            } else {
                alert("No medicines found.");
            }
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    }, [page, pageSize]);

    const getUniqueMedicines = (medicines) => {
        const uniqueNames = [...new Set(medicines.map(medicine => medicine.name))];
        return uniqueNames;
    };

    const handleFilterChange = (event) => {
        const selectedName = event.target.value;
        if (selectedName === "") {
            setFilteredMedicines(medicines); // Show all medicines if no filter is selected
        } else {
            const filtered = medicines.filter(medicine => medicine.name === selectedName);
            setFilteredMedicines(filtered);
        }
    };

    const handleOpenModal = (medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedMedicine(null);
        setIsModalOpen(false);
    };

    const handleAddMedicine = async (formData) => {
        const payload = {
            name: formData.name,
            available: formData.available,
            total: formData.total,
            expiredDate: formData.expiredDate,
        };

        try {
            const response = await fetch('https://localhost:7157/api/admin/medicine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (data.success) {
                fetchMedicines(); // Refresh medicine list
            } else {
                alert("Failed to add medicine.");
            }
        } catch (error) {
            console.error("Error adding medicine:", error);
        }
    };

    const handleEditMedicine = async (formData) => {
        const payload = {
            id: selectedMedicine.id,
            name: formData.name,
            available: formData.available,
            total: formData.total,
            expiredDate: formData.expiredDate,
        };

        try {
            const response = await fetch(`https://localhost:7157/api/admin/medicine/${selectedMedicine.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (data.success) {
                fetchMedicines(); // Refresh medicine list
            } else {
                alert("Failed to update medicine.");
            }
        } catch (error) {
            console.error("Error updating medicine:", error);
        }
    };

    // Pagination controls
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // This is where you are calling fetchMedicines
    useEffect(() => {
        fetchMedicines();
    }, [fetchMedicines, page]); // Add fetchMedicines to the dependency array

    return (
        <div className="medicine-container">
            <h2>Kho Thuốc</h2>
            <button onClick={() => handleOpenModal(null)} className="create-medicine-button">
                Thêm Thuốc Vào Kho
            </button>

            {/* Dropdown for selecting unique medicine names */}
            <div className="medicine-filter">
                <select onChange={handleFilterChange}>
                    <option value="">All Medicines</option>
                    {uniqueMedicines.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
            </div>

            <div className="medicine-grid">
                {filteredMedicines.map((medicine) => (
                    <div key={medicine.id} className="medicine-card" onClick={() => handleOpenModal(medicine)}>
                        <h3>{medicine.name}</h3>
                        <p>Còn lại: <span style={{ color: 'red', fontSize: '20px' }}>{medicine.available}</span></p>
                        <p>Tổng Số: {medicine.total}</p>
                        <p>Ngày Hết Hạn: {medicine.expiredDate}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="medicine-pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                <span>Page {page}</span>
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>

            {/* Medicine Modal */}
            <MedicineModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={selectedMedicine ? handleEditMedicine : handleAddMedicine}
                editingMedicine={selectedMedicine}
            />
        </div>
    );
};

export default Medicine;
