import React, { useEffect, useState } from 'react';
import PatientModal from '../../components/PatientModal';
import styles from '../../admin_assets/css/patient.module.css';

const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [expanded, setExpanded] = useState(null); // Track expanded patient ID
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const pageSize = 5; // Number of records per page

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('https://localhost:7157/api/admin/patient');
                const data = await response.json();

                if (data.success) {
                    setPatients(data.patients);
                    setFilteredPatients(data.patients); // Initialize filtered patients
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Failed to fetch patient data');
            }
        };

        fetchPatients();
    }, []);

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
        
        // Create a regex pattern to search for the query in the patient's name
        const regex = new RegExp(query, 'i'); // 'i' for case-insensitive search

        // Filter patients by name using regex
        const filtered = patients.filter((patient) => regex.test(patient.name));
        setFilteredPatients(filtered);

        // Reset the current page to 1 when search query changes
        setCurrentPage(1);
    };

    // Get the current page data
    const currentPatients = filteredPatients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEditClick = async (patient) => {
        try {
            const response = await fetch(`https://localhost:7157/api/admin/patient/${patient.id}`);
            const data = await response.json();

            if (data.success) {
                setSelectedPatient(data.patient);
                setIsModalOpen(true);
            } else {
                setError('Failed to load patient details');
            }
        } catch (error) {
            setError('Failed to fetch patient details');
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPatient(null);
    };

    const handleUpdatePatient = (updatedPatient) => {
        setPatients((prevPatients) =>
            prevPatients.map((patient) =>
                patient.id === updatedPatient.id ? updatedPatient : patient
            )
        );
        
        setFilteredPatients((prevFilteredPatients) =>
            prevFilteredPatients.map((patient) =>
                patient.id === updatedPatient.id ? updatedPatient : patient
            )
        );
    };
    const toggleExpanded = (patientId) => {
        setExpanded(expanded === patientId ? null : patientId);
    };

    // Calculate total pages
    const totalPages = Math.ceil(filteredPatients.length / pageSize);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Danh Sách Bệnh Nhân</h2>
            {error && <div className={styles.error}>{error}</div>}

            {/* Search bar */}
            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Tìm kiếm theo tên..."
                    className={styles.searchInput}
                />
            </div>

            {currentPatients.map((patient) => (
                <div key={patient.id} className={styles.accordionItem}>
                    <div className={styles.accordionHeader}>
                        <div>
                            <span>{patient.name}</span>
                        </div>
                        <div>
                            <button
                                className={styles.editButton}
                                onClick={() => handleEditClick(patient)}
                            >
                                Cập Nhật
                            </button>&nbsp;&nbsp;
                            <button
                                className={styles.expandButton}
                                onClick={() => toggleExpanded(patient.id)}
                            >
                                <span>{expanded === patient.id ? '-' : '+'}</span>
                            </button>
                        </div>
                    </div>
                    {expanded === patient.id && (
                        <div className={styles.accordionContent}>
                            <p className={styles.infoItem}><strong>Name:</strong> {patient.name}</p>
                            <p className={styles.infoItem}><strong>Age:</strong> {patient.age}</p>
                            <p className={styles.infoItem}><strong>Phone:</strong> {patient.phone}</p>
                            <p className={styles.infoItem}><strong>Email:</strong> {patient.email}</p>
                            <p className={styles.infoItem}><strong>Address:</strong> {patient.address}</p>
                        </div>
                    )}
                </div>
            ))}

            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            <PatientModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleUpdatePatient}
                editingPatient={selectedPatient}
            />
        </div>
    );
};

export default Patient;
