import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/img/login-pic.jpg';
import Swal from 'sweetalert2';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
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
            await fetch('https://localhost:7157/api/login', {
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
                        title: 'Đăng Nhập Thành Công',
                        text: 'Chuyển hướng về trang chủ...',
                        showConfirmButton: false,
                        timer: 2000
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

    const handleGoogleSuccess = async (response) => {
        const decoded = jwtDecode(response.credential); 
        console.log(decoded);
        try {
            await fetch('https://localhost:7157/api/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenId: response.credential }),
            }).then(response => response.json()).then(data => {
                if (data.success) {
                    sessionStorage.setItem("token", data.token);
                    console.log(data.token)
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng Nhập Thành Công',
                        text: 'Chuyển hướng về trang chủ...',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        navigate('/');
                    });
                } else {
                    setError(data.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Tài Khoản Chưa Được Đăng Ký',
                        text: 'Chuyển hướng tới đăng ký...',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        navigate('/register');
                    });
                }
            });
        } catch (error) {
            console.error('Google Login Error:', error);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google Login Failure:', error);
        setError('Google Login Failed');
    };

    return (
        <GoogleOAuthProvider clientId="286539281396-jib6851bvv8c9kjja1fin33k0c7aqvmo.apps.googleusercontent.com">
            <div className="d-lg-flex half">
                <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="contents order-2 order-md-1">

                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7">
                                <a href="/"><img src="assets/img/clinic-logo.png" alt="" style={{ maxHeight: '36px' }} /></a>
                                <div className="mb-4" style={{ margin: '20px', textAlign: 'center' }}>
                                    <h3 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '35px' }}>Đăng Nhập</h3>
                                </div>
                                <form onSubmit={handleSubmit} method="post">
                                    <div className="form-group first" style={{ marginBottom: '20px', border: '1px solid gray', padding: '7px' }}>
                                        <input type="text" className="form-control" id="username" name="username" value={formData.username} placeholder="Tài Khoản" style={{ fontSize: '16px' }} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group last mb-3" style={{ border: '1px solid gray', padding: '7px' }}>
                                        <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={formData.password} placeholder="Mật Khẩu" style={{ fontSize: '16px' }} onChange={handleInputChange} />
                                        <span className={`fa fa-fw ${showPassword ? "fa-eye-slash" : "fa-eye"} field-icon toggle-password`}
                                            onClick={handlePasswordToggle} style={{ cursor: 'pointer' }}></span>
                                    </div>
                                    {error && <div className="error-text" style={{ fontSize: '16px' }}>{error}</div>}

                                    <div className="d-flex mb-5 align-items-center">
                                        <span><a href="/" style={{ color: 'black', fontWeight: '300' }}>Quay Lại Trang Chủ</a></span>
                                        <span className="ml-auto">Chưa có tài khoản ? &nbsp;<a href="/register" className="forgot-pass">Đăng Ký</a></span>
                                    </div>

                                    <button type="submit" className="btn btn-block btn-primary" style={{ borderRadius: '15px', height: '45px', marginTop: '-40px' }}>Đăng Nhập</button>

                                    <span className="d-block text-center my-4 text-muted">&mdash; Hoặc &mdash;</span>

                                    <div className="social-login">
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={handleGoogleFailure}
                                            render={(renderProps) => (
                                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google btn d-flex justify-content-center align-items-center" style={{ borderRadius: '15px', height: '45px' }}>
                                                    <span className="icon-google mr-3"></span> Đăng Nhập Với Google
                                                </button>
                                            )}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;