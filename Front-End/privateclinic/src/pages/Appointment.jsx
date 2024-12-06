import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import styles from '../assets/css/appointment.module.css';
import Heading from '../components/Heading';
import backgroundImage from '../assets/img/appointment-background.jpg';
import decodeToken from '../components/DecodeToken';
import Swal from 'sweetalert2';

const Appointment = () => {
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
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
    const [isFormDisabled, setIsFormDisabled] = useState(false); // New state to track if form is pre-filled


    const location = useLocation(); 
    const navigate = useNavigate();

    const { selectedTreatment } = location.state || {};  // Retrieve selected treatment

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                setCustomerId(decodedToken.user_id);
                setName(decodedToken.user_name);
                setEmail(decodedToken.user_email);
                setPhone(decodedToken.user_phone);
                console.log(customerId);
                setFormData(prev => ({
                    ...prev,
                    name: name || '',
                    email: email || '',
                    phone: phone || '',
                }));
                setIsFormDisabled(true);
            }
        };

        fetch("https://localhost:7157/api/admin/schedule")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDoctors(data.doctors);
                setTreatments(data.treatments);
            })
            .catch((error) => console.error("Error fetching doctors/treatments:", error));
    }, [customerId, name, email, phone]);

        // Pre-fill the treatment input if available
        useEffect(() => {
            if (selectedTreatment) {
                setFormData(prev => ({
                    ...prev,
                    treatmentId: selectedTreatment.id,
                }));
            }
        }, [selectedTreatment]);


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
                title: 'Bạn cần phải có tài khoản!',
                text: 'Hãy đăng nhập để có thể xếp lịch hẹn.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Đăng Nhập',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        const initialFormData = {
            name: name,
            email: email,
            phone: phone,
            date: '',
            doctorId: '',
            treatmentId: ''
        };

        const today = new Date();
        const selectedDate = new Date(formData.date);
    
        // Validation for future date
        if (!formData.date || selectedDate <= today) {
            Swal.fire({
                title: 'Ngày không hợp lệ!',
                text: 'Bạn phải hẹn lịch bắt đầu từ ngày mai.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
    
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
                        <strong>Họ Tên:</strong> ${formData.name}<br>
                        <strong>Email:</strong> ${formData.email}<br>
                        <strong>Số Điện Thoại:</strong> ${formData.phone}<br>
                        <strong>Ngày Tháng:</strong> ${formData.date}<br>
                        <strong>Bác Sĩ:</strong> ${selectedDoctor ? selectedDoctor.name : 'N/A'}<br>
                        <strong>Liệu Trình:</strong> ${selectedTreatment ? selectedTreatment.treatmentName : 'N/A'}<br>
                        <strong>Gía tiền:</strong> ${fetchedPrice} VND
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
        <Heading title="HẸN LỊCH KHÁM" color="black" />
        <section id="appointment" className="appointment section light-background">
            <div className="container" data-aos-delay="100">
                <form method="post" className="php-email-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 form-group">
                            <label htmlFor="name">Họ Tên</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required=""
                                autoComplete='true'
                                disabled={isFormDisabled}
                            />
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required=""
                                autoComplete='true'
                                disabled={isFormDisabled}
                            />
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required=""
                                autoComplete='true'
                                disabled={isFormDisabled}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 form-group mt-3">
                            <label htmlFor="date">Ngày Hẹn Khám</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control datepicker"
                                id="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required=""
                            />
                        </div>
                        <div className="col-md-4 form-group mt-3">
                            <label htmlFor="doctorId">Chọn bác sĩ</label>
                            <select
                                name="doctorId"
                                className="form-select"
                                id="doctorId"
                                value={formData.doctorId}
                                onChange={handleInputChange}
                            >
                                <option value=""></option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 form-group mt-3">
                            <label htmlFor="treatmentId">Chọn dịch vụ</label>
                            <select
                                name="treatmentId"
                                className="form-select"
                                id="treatmentId"
                                value={formData.treatmentId}
                                onChange={handleInputChange}
                            >
                                <option value=""></option>
                                {treatments.map((treatment) => (
                                    <option key={treatment.id} value={treatment.id}>
                                        {treatment.treatmentName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button type="submit">ĐẶT LỊCH</button>
                    </div>
                </form>
            </div>
        </section>
    </main>
    );
};

export default Appointment;