import React from "react";
import Image from '../../admin_assets/img/clinic-logo.png';
import backgroundImage from '../../admin_assets/img/private-clinic.jpg';

const Auth = () => {
    return (
        <section className="ftco-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section">Bảng Điều Khiển</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="wrap">
                            <div className="img" style={{ backgroundImage: `url(${Image})`, maxHeight: '36px', maxWidth: '300px', marginLeft: '45px', marginTop: '20px' }}></div>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Đăng Nhập</h3>
                                    </div>
                                </div>
                                <form action="/" className="signin-form">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" required />
                                        <label className="form-control-placeholder" for="username">Tên Tài Khoản</label>
                                    </div>
                                    <div className="form-group">
                                        <input id="password-field" type="password" className="form-control" required />
                                        <label className="form-control-placeholder" for="password">Mật Khẩu</label>
                                        <span toggle="/password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary rounded submit px-3">Đăng Nhập</button>
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