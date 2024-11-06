import React, { useState, useEffect } from 'react';
import styles from '../assets/css/appointment.module.css';
import Heading from '../components/Heading';
import backgroundImage from '../assets/img/appointment-background.jpg';
import decodeToken from '../components/DecodeToken';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
    const [customerId, setCustomerId] = useState([]);
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
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setCustomerId(decodedToken.user_id);
                console.log(customerId);
            }
        };

        fetch("https://localhost:7157/api/admin/schedule")
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data.doctors);
                setTreatments(data.treatments);
            })
            .catch((error) => console.error("Error fetching doctors/treatments:", error));
    }, [customerId]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const token = sessionStorage.getItem('token');
    
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

        const initialFormData = {
            name: '',
            phone: '',
            email: '',
            date: '',
            doctorId: '',
            treatmentId: ''
        };
    
        const payload = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            date: formData.date,
            doctorId: parseInt(formData.doctorId),
            customerId: customerId,
            treatmentId: parseInt(formData.treatmentId)
        };
    
        // Fetch treatment data first to get the price before confirmation
        fetch(`https://localhost:7157/api/appointment/${formData.treatmentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const fetchedPrice = data.result;
                const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(formData.doctorId));
                const selectedTreatment = treatments.find(treatment => treatment.id === parseInt(formData.treatmentId));
    
                // Confirmation dialog with fetched data
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
                    confirmButtonText: 'XÁC NHẬN',
                    cancelButtonText: 'HỦY',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Now perform the POST request to create the appointment
                        fetch("https://localhost:7157/api/appointment/schedule", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(payload),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                                if (data.success === true) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Đặt Lịch Hẹn Thành Công',
                                        confirmButtonText: 'OK'
                                    })
                                    .then(() => {
                                        // Reset the form data to clear the input fields
                                        setFormData(initialFormData);
                                    });
                                }
                            })
                            .catch((error) => {
                                console.error("Error creating appointment:", error);
                            });
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching price:", error);
            });
    };

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