import React, { useState, useEffect, useCallback } from 'react';
import styles from '../assets/css/service.module.css';
import Heading from '../components/Heading';
import backgroundImage from '../assets/img/service-background.jpg';

const Service = () => {
    const [treatments, setTreatments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 3; // You can adjust this based on your design

    // Memoize the fetchTreatments function to avoid unnecessary re-creations
    const fetchTreatments = useCallback(async () => {
        try {
            const response = await fetch(`https://localhost:7157/api/service?pageNumber=${currentPage}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
            const data = await response.json();

            if (response.ok) {
                setTreatments(data.treatments);
                setTotalPages(data.totalPages);
            } else {
                console.error('Error fetching treatments:', data);
            }
        } catch (error) {
            console.error('Error fetching treatments:', error);
        }
    }, [currentPage, searchTerm, pageSize]);

    // Run the fetchTreatments function whenever currentPage or searchTerm changes
    useEffect(() => {
        fetchTreatments(); // Fetch treatments when the page is loaded or when currentPage or searchTerm changes
    }, [fetchTreatments]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    const handlePagination = (page) => {
        if (page < 1 || page > totalPages) return; // Prevent out-of-bounds pagination
        setCurrentPage(page);
    };

    return (
        <main className={styles.main} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <Heading title="DỊCH VỤ CUNG CẤP" />

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên liệu trình"
                    className={styles.searchBar}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div id="services" className={styles.services}>
                {treatments.length > 0 ? (
                    treatments.map((treatment, index) => (
                        <a href="/appointment" key={index}>
                            <div className={styles.serviceBox}>
                                <div className={styles.serviceImage}>
                                    {treatment.image ? (
                                        <img
                                            src={`data:image/jpeg;base64,${treatment.image}`}
                                            alt={`service-${treatment.id}`}
                                        />
                                    ) : (
                                        <p>No Image Available</p>
                                    )}
                                </div>
                                <div className={styles.serviceContent}>
                                    <ul>
                                        <li>Liệu Trình: <span className={styles.bold}>{treatment.name}</span></li>
                                        <li>Số Buổi: <span className={styles.bold}>{treatment.session}</span></li>
                                        <li>Số tiền: <span className={styles.bold} style={{color: 'red'}}>{(treatment.price).toLocaleString('en-US')}</span> đồng</li>
                                    </ul>
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    <p>Không tìm thấy liệu trình</p> // Message if no results match
                )}
            </div>

            <div className={styles.pagination}>
                <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage <= 1}>Prev</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
            </div>
        </main>
    );
};

export default Service;
