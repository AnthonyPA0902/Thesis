import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from '../assets/css/detail.module.css'; // Import the CSS module
import Heading from '../components/Heading';
import backgroundImage from '../assets/img/detail-background.jpg';
import Swal from 'sweetalert2';

const ServiceDetail = () => {
    const [treatment, setTreatment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id'); 

    useEffect(() => {
        if (id) {
            fetch(`https://localhost:7157/api/detail/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setTreatment(data.treatment);
                    } else {
                        setError('Treatment not found');
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setError('Error fetching treatment details');
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Navigate to the /service page
    const goBack = () => {
        navigate('/service');
    };

    const goToAppointment = () => {
        const token = sessionStorage.getItem('token');
    
        if (!token) {
            Swal.fire({
                title: 'Bạn cần phải có tài khoản!',
                text: 'Hãy đăng ký tài khoản để có thể xếp lịch hẹn.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Đăng Ký',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/register');
                }
            });
            return;
        }
        // Pass the selected treatment to the appointment page
        navigate('/appointment', { state: { selectedTreatment: treatment } });
    };

    return (
        <main
            className={styles.main}
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >
            <Heading title="CHI TIẾT DỊCH VỤ" />

            <div className={styles.detailWrapper}>
                <div className={styles.detailImage}>
                    {treatment.image && (
                        <img
                            className={styles.treatmentImage}
                            src={`data:image/jpeg;base64,${treatment.image}`}
                            alt={treatment.name}
                        />
                    )}
                </div>

                <div className={styles.detailBox}>
                    <div className={styles.detailContent}>
                        <p className={styles.detailDescription}>
                            <strong>Tên Dịch Vụ:</strong> <span style={{ fontSize: '20px' }}> {treatment.name}</span>
                        </p>
                        <p className={styles.detailSession}>
                            <strong>Số Buổi:</strong> {treatment.session}
                        </p>
                        <p className={styles.detailPrice}>
                            <strong>Giá:</strong> <span style={{ color: 'red', fontWeight: 'bold' }}> {treatment.price.toLocaleString('en-US')} </span> đồng
                        </p>

                        <h2 className={styles.additionalDetailsHeading}><u>Thông Tin Chi Tiết:</u></h2>
                        <ul className={styles.additionalDetailsList}>
                            {treatment.details &&
                                treatment.details.map(detail => (
                                    <li key={detail.id}>
                                        <p>{detail.details}</p>
                                    </li>
                                ))}
                        </ul>

                        {/* Add the buttons below additional details */}
                        <div className={styles.buttonContainer}>
                            <button className={styles.goBackButton} onClick={goBack}>Quay Lại</button>
                            <button className={styles.makeAppointmentButton} onClick={goToAppointment}>Đặt Lịch Hẹn</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ServiceDetail;
