import React, { useState, useEffect } from 'react';
import '../../admin_assets/css/schedule.css';
import TreatmentModal from '../../components/TreatmentModal';
import Swal from 'sweetalert2';

const Treatment = () => {
    const [treatment, setTreatment] = useState([]);
    const [totalPages, setTotalPages] = useState(1);  // Add state to store totalPages
    const [currentPage, setCurrentPage] = useState(1);  // Track the current page
    const [searchTerm, setSearchTerm] = useState('');  // Store the search term
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTreatment, setEditingTreatment] = useState(null);
    const treatmentsPerPage = 3;  // Same value used in the backend

    // Fetch treatments with pagination and search functionality
    useEffect(() => {
        fetchTreatments(currentPage, searchTerm);
    }, [currentPage, searchTerm]); // Re-fetch when page or search term changes

    const fetchTreatments = (page, search) => {
        const searchParam = search ? `&search=${search}` : '';  // Add search term to query string
        fetch(`https://localhost:7157/api/admin/treatment?page=${page}&pageSize=${treatmentsPerPage}${searchParam}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setTreatment(data.treatments);
                    setTotalPages(data.totalPages);  // Set total pages from API response
                } else {
                    setTreatment([]);
                    setTotalPages(1);  // If no treatments, set total pages to 1
                }
            })
            .catch((error) => console.error("Error fetching treatments:", error));
    };

    const handleAddTreatment = (treatmentData) => {
        const formData = new FormData();
        formData.append("name", treatmentData.name);
        formData.append("session", treatmentData.session);
        formData.append("price", treatmentData.price);
        if (treatmentData.image) {
            formData.append("image", treatmentData.image); // Add the image file to FormData
        }

        const url = editingTreatment
            ? `https://localhost:7157/api/admin/treatment/${editingTreatment.id}`
            : "https://localhost:7157/api/admin/treatment";

        const method = editingTreatment ? "PUT" : "POST";

        fetch(url, {
            method: method,
            body: formData,
        })
            .then((response) => response.json())
            .then(() => refetchTreatmentData())
            .catch((error) => console.error("Error updating treatment:", error));

        setIsModalOpen(false);
    };

    const refetchTreatmentData = () => {
        fetchTreatments(currentPage, searchTerm); // Re-fetch data after adding/editing
    };

    const handleCreateClick = () => {
        setEditingTreatment(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (id) => {
        fetch(`https://localhost:7157/api/admin/treatment/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEditingTreatment(data.treatment);
                setIsModalOpen(true);
            })
            .catch((error) => console.error("Error fetching treatment:", error));
    };

    const handleDeleteClick = (treatmentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this treatment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://localhost:7157/api/admin/treatment/${treatmentId}`, {
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
                                'Treatment has been deleted.',
                                'success'
                            );
                            // Optimistically update state by removing the deleted treatment from the list
                            setTreatment(prevTreatments => prevTreatments.filter(t => t.id !== treatmentId));

                            // Check if the current page has treatments left; if not, load the previous page
                            if (treatment.length === 1 && currentPage > 1) {
                                setCurrentPage(currentPage - 1); // Go to the previous page if the last treatment is deleted
                            } else {
                                refetchTreatmentData(); // Otherwise, just refresh the data
                            }
                        }
                    })
                    .catch((error) => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the treatment.',
                            'error'
                        );
                        console.error('Error deleting treatment:', error);
                    });
            }
        });
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setCurrentPage(1); // Reset to first page when search changes
    };

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="content">
            <div className="treatment-container">
                <h1>Danh sách liệu trình</h1>
                <button className="register-button" onClick={() => handleCreateClick()}>
                    Thêm liệu trình mới
                </button>
                <br />
                <br />
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên liệu trình"
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <table className="treatment-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Liệu Trình</th>
                            <th>Số Buổi</th>
                            <th>Giá Tiền</th>
                            <th>Hình Ảnh</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(treatment) && treatment.map((treatment, index) => (
                            <tr key={index}>
                                <td>{index + 1 + (currentPage - 1) * treatmentsPerPage}</td>
                                <td>{treatment.name}</td>
                                <td>{treatment.session}</td>
                                <td>{treatment.price}</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {treatment.image && (
                                        <img
                                            src={`data:image/jpeg;base64,${treatment.image}`}
                                            alt="Treatment"
                                            style={{ width: "50%", height: "100px" }}
                                        />
                                    )}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button onClick={() => handleEditClick(treatment.id)}>
                                        <img className="icon" src="/admin_assets/img/icon/edit-icon.png" alt="edit-icon" />
                                    </button>
                                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                                    <button onClick={() => handleDeleteClick(treatment.id)}>
                                        <img className="icon" src="/admin_assets/img/icon/delete-icon.png" alt="edit-icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="pagination">
                    {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <TreatmentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddTreatment}
                    editingTreatment={editingTreatment}
                />
            </div>
        </div>
    );
};

export default Treatment;
