import React from "react";
import backgroundImage from '../assets/img/register-background.jpg';

const Register = () => {
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
                            <form action="form.php" method="post">
                                <div className="form-group last mb-3" style={{ border: '1px solid gray', padding: '5px', height: '45px' }}>
                                    <input type="text" className="form-control" id="name" placeholder="Họ Tên" style={{ fontSize: '15px' }} />
                                </div>
                                <div className="form-group last mb-3" style={{ border: '1px solid gray', padding: '5px', height: '45px' }}>
                                    <input type="number" className="form-control" id="age" placeholder="Tuổi" style={{ fontSize: '15px' }} />
                                </div>
                                <div className="form-group last mb-3" style={{ border: '1px solid gray', padding: '5px', height: '45px' }}>
                                    <input type="text" className="form-control" id="address" placeholder="Địa Chỉ" style={{ fontSize: '15px' }} />
                                </div>
                                <div className="form-group last mb-3" style={{ border: '1px solid gray', padding: '5px', height: '45px' }}>
                                    <input type="text" className="form-control" id="email" placeholder="Email" style={{ fontSize: '15px' }} />
                                </div>
                                <div className="form-group last mb-3" style={{ border: '1px solid gray', padding: '5px', height: '45px' }}>
                                    <input type="text" className="form-control" id="phone" placeholder="Số Điện Thoại" style={{ fontSize: '15px' }} />
                                </div>
                                <div className="form-group first" style={{ marginBottom: '20px', border: '1px solid gray', padding: '5px', height: '45px' }}>
                                    <input type="text" className="form-control" id="username" placeholder="Tài Khoản" style={{ fontSize: '15px' }} />
                                </div>
                                <div className="form-group last mb-3" style={{ border: '1px solid gray', padding: '5px', height: '45px' }}>
                                    <input type="password" className="form-control" id="password" placeholder="Mật Khẩu" style={{ fontSize: '15px' }} />
                                </div>

                                <div className="d-flex mb-5 align-items-center">
                                    <span><a href="/" style={{ color: 'black', fontWeight: '300' }}>Quay Lại Trang Chủ</a></span>
                                    <span className="ml-auto">Đã có tài khoản ? &nbsp;<a href="/login" className="forgot-pass">Đăng Nhập</a></span>
                                </div>

                                <button type="submit" className="btn btn-block btn-primary" style={{ borderRadius: '15px', height: '45px', marginTop: '-40px' }}>Đăng Ký</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;