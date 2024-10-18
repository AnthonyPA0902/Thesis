import React, { useState, useEffect } from 'react';
import styles from '../assets/css/appointment.module.css';
import Heading from '../components/Heading';
import backgroundImage from '../assets/img/appointment-background.jpg';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        doctorId: '',
        treatmentId: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:7157/api/admin/schedule")
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data.doctors);
                setTreatments(data.treatments);
            })
            .catch((error) => console.error("Error fetching doctors/treatments:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        if (!token) {
            Swal.fire({
                title: 'You need to login!',
                text: 'Please login to set an appointment.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
    
        const payload = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            date: formData.date,
            doctorId: parseInt(formData.doctorId),
            treatmentId: parseInt(formData.treatmentId)
        };
    
        fetch("https://localhost:7157/api/admin/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Appointment created:", data);
    
            // Fetch price based on treatmentId
            return fetch(`https://localhost:7157/api/appointment/${formData.treatmentId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
        })
        .then((response) => response.json())
        .then((data) => {
            const fetchedPrice = data.result; 
            const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(formData.doctorId));
            const selectedTreatment = treatments.find(treatment => treatment.id === parseInt(formData.treatmentId));
    
            Swal.fire({
                title: 'Xác Nhận Thông Tin Lịch Hẹn',
                html: `
                    <strong>Name:</strong> ${formData.name}<br>
                    <strong>Email:</strong> ${formData.email}<br>
                    <strong>Phone:</strong> ${formData.phone}<br>
                    <strong>Date:</strong> ${formData.date}<br>
                    <strong>Doctor:</strong> ${selectedDoctor ? selectedDoctor.name : 'N/A'}<br>
                    <strong>Treatment:</strong> ${selectedTreatment ? selectedTreatment.treatmentName : 'N/A'}<br>
                    <strong>Price:</strong> ${fetchedPrice} VND
                `,
                showCancelButton: true,
                confirmButtonText: 'THANH TOÁN',
                cancelButtonText: 'HỦY',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://localhost:7157/api/appointment/vnpay/${formData.treatmentId}`)
                        .then((response) => response.text())
                        .then((paymentUrl) => {
                            window.location.href = paymentUrl;
                        })
                        .catch((error) => {
                            console.error("Error redirecting to VnPay:", error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Payment failed',
                                text: 'Could not proceed to payment. Please try again later.'
                            });
                        });
                }
            });
        })
        .catch((error) => {
            console.error("Error creating appointment or fetching price:", error);
        });
    };

    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let m;
    
        while ((m = regex.exec(queryString))) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    }

    window.onload = function () {
        const params = getQueryParams();
    
        if (params.payment === 'true') {
            const customerName = localStorage.getItem('customerName');
            const treatmentId = localStorage.getItem('treatmentId');
    
            const orderData = {
                customerName: customerName,
                treatmentId: treatmentId,
                total: someTotalAmount, 
                date: new Date().toISOString(), 
                method: 'VnPay' 
            };
    
            fetch('https://localhost:7157/api/appointment/processCheckout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: data.message
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Payment Failed',
                        text: data.message
                    });
                }
            })
            .catch(error => {
                console.error('Error processing order:', error);
            });
        }
    }


    return (
        <main className={styles.main} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            {/* Header Section */}
            <Heading title="HẸN LỊCH KHÁM" color="black" />
            {/* Appointment Section */}
            <section id="appointment" className="appointment section light-background">
                <div className="container" data-aos-delay="100">

                    <form method="post" className="php-email-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Họ Tên" value={formData.name} onChange={handleInputChange} required="" autoComplete='true' />
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required="" autoComplete='true' />
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input type="tel" className="form-control" name="phone" id="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleInputChange} required="" autoComplete='true' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group mt-3">
                                <input type="date" name="date" className="form-control datepicker" id="date" placeholder="Ngày Hẹn Khám" value={formData.date} onChange={handleInputChange} required="" />
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select
                                    name="doctorId"
                                    className="form-select"
                                    value={formData.doctorId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn bác sĩ</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select
                                    name="treatmentId"
                                    className="form-select"
                                    value={formData.treatmentId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn dịch vụ</option>
                                    {treatments.map((treatment) => (
                                        <option key={treatment.id} value={treatment.id}>
                                            {treatment.treatmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <textarea className="form-control" name="message" rows="5" placeholder="Ghi Chú (Tùy Chọn)"></textarea>
                        </div>
                        <div className="mt-3">
                            <div className="text-center"><button type="submit">Tạo Lịch Hẹn</button></div>
                        </div>
                    </form>

                </div>

            </section>

        </main>
    );
};

export default Appointment;