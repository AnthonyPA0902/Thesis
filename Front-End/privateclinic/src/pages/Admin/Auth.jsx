import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Image from '../../admin_assets/img/clinic-logo.png';
import backgroundImage from '../../admin_assets/img/auth-background.jpg';
import Swal from 'sweetalert2';

const Auth = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('https://localhost:7157/api/admin/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(response => response.json()).then(data => {
                if (data.success) {
                    sessionStorage.setItem("token", data.token)
                    Swal.fire({
                        icon: 'success',
                        title: 'Truy Cập Thành Công',
                        text: 'Chuyển hướng đến bảng điều khiển...',
                        showConfirmButton: false,
                        timer: 3000
                    }).then(() => {
                        navigate('/');
                    });
                }
                else {
                    setError(data.message);
                }
            });
        } catch (error) {
            console.error('Error:', error);
            setError('Lỗi Hệ Thống. Xin Hãy Thử Lại Lần Nữa');
        }
    };

    return (
        <section className="ftco-section" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section" style={{ fontFamily: 'Time News Roman', fontWeight: 'bold', color: 'white', fontSize: '40px' }}>
                            BẢNG ĐIỀU KHIỂN</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="wrap">
                            <a href="/"><div className="img" style={{ backgroundImage: `url(${Image})`, maxHeight: '36px', maxWidth: '300px', marginLeft: '45px', marginTop: '20px' }}></div></a>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4" style={{ fontFamily: 'Time News Roman', textAlign: 'center' }}>Đăng Nhập</h3>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} method="post" className="signin-form">
                                    <div className="form-group mt-3">
                                        <input id="username" type="text" name="username" value={formData.username} className="form-control" required onChange={handleInputChange} />
                                        <label className="form-control-placeholder" htmlFor="username">Tên Tài Khoản</label>
                                    </div>
                                    <div className="form-group">
                                        <input id="password" type={showPassword ? "text" : "password"} name="password" value={formData.password} className="form-control" required onChange={handleInputChange} />
                                        <label className="form-control-placeholder" htmlFor="password">Mật Khẩu</label>
                                        <span className={`fa fa-fw ${showPassword ? "fa-eye-slash" : "fa-eye"} field-icon toggle-password`}
                                            onClick={handlePasswordToggle} style={{ cursor: 'pointer' }}></span>
                                    </div>
                                    {error && <p className="error-text" style={{ fontSize: '16px', color: 'red' }}>{error}</p>}

                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary rounded submit px-3">Đăng Nhập</button>
                                    </div>
                                    <div className="form-group">
                                        <a href="/" style={{ display: 'block', fontFamily: 'Time News Roman', textAlign: 'center', fontSize: '20px', fontStyle: 'italic' }}>
                                            <span> Quay Về Trang Chủ </span>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;