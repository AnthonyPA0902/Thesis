import React, { useState } from "react";
import backgroundImage from '../assets/img/register-background.jpg';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    });
    const navigate = useNavigate(); // For navigation


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Tên không được để trống'
        }

        // if (!formData.age) {
        //     newErrors.age = 'Tuổi không được để trống'
        // }

        // if (!formData.address) {
        //     newErrors.address = 'Địa chỉ không được để trống'
        // }

        if (!formData.email) {
            newErrors.email = 'Email không được để trống'
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        } else if (formData.email.length < 10 || formData.email.length > 50) {
            newErrors.email = 'Email phải từ 10 đến 50 ký tự';
        }

        if (!formData.phone) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại phải có 10 số';
        }

        if (!formData.username) {
            newErrors.username = 'Tên tài khoản không được để trống';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu không được để trống';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log('Form submiited:', formData);
            try {
                await fetch('https://localhost:7157/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }).then(response => response.json()).then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đăng Ký Thành Công',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            setFormData({
                                name: '',
                                age: '',
                                address: '',
                                email: '',
                                phone: '',
                                username: '',
                                password: '',
                            });
                            navigate('/login');
                        });
                    }
                    else {
                        console.error("Register failed");
                    }
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    return (
        <div className="d-lg-flex half">
            <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="contents order-2 order-md-1">

                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7">
                            <a href="/"><img src="/assets/img/clinic-logo.png" alt="" style={{ maxHeight: '36px' }} /></a>
                            <div className="mb-4" style={{ margin: '20px', textAlign: 'center' }}>
                                <h3 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '35px' }}>Đăng Ký</h3>
                            </div>
                            <form onSubmit={handleSubmit} method="post">
                                <div className="form-group-custom">
                                    <input
                                        type="text"
                                        className="input-custom"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        placeholder="Họ Tên *"
                                        onChange={handleInputChange}
                                    />
                                    {errors.name && <div className="error-text">{errors.name}</div>}
                                </div>

                                <div className="form-group-custom">
                                    <input
                                        type="number"
                                        className="input-custom"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        placeholder="Tuổi"
                                        onChange={handleInputChange}
                                    />
                                    {errors.age && <div className="error-text">{errors.age}</div>}
                                </div>

                                <div className="form-group-custom">
                                    <input
                                        type="text"
                                        className="input-custom"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        placeholder="Địa Chỉ"
                                        onChange={handleInputChange}
                                    />
                                    {errors.address && <div className="error-text">{errors.address}</div>}
                                </div>

                                <div className="form-group-custom">
                                    <input
                                        type="text"
                                        className="input-custom"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Email *"
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <div className="error-text">{errors.email}</div>}
                                </div>

                                <div className="form-group-custom">
                                    <input
                                        type="text"
                                        className="input-custom"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        placeholder="Số Điện Thoại *"
                                        onChange={handleInputChange}
                                    />
                                    {errors.phone && <div className="error-text">{errors.phone}</div>}
                                </div>

                                <div className="form-group-custom">
                                    <input
                                        type="text"
                                        className="input-custom"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        placeholder="Tài Khoản *"
                                        onChange={handleInputChange}
                                    />
                                    {errors.username && <div className="error-text">{errors.username}</div>}
                                </div>

                                <div className="form-group-custom">
                                    <input
                                        type="password"
                                        className="input-custom"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        placeholder="Mật Khẩu *"
                                        onChange={handleInputChange}
                                    />
                                    {errors.password && <div className="error-text">{errors.password}</div>}
                                </div>

                                <div className="d-flex mb-5 align-items-center">
                                    <span>
                                        <a href="/" className="back-link">Quay Lại Trang Chủ</a>
                                    </span>
                                    <span className="ml-auto">
                                        Đã có tài khoản?&nbsp;<a href="/login" className="forgot-pass">Đăng Nhập</a>
                                    </span>
                                </div>

                                <button type="submit" className="btn btn-block btn-primary" style={{ borderRadius: '15px', height: '45px', marginTop: '-40px' }}>
                                    Đăng Ký
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;