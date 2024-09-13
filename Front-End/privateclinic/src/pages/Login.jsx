import React from "react";
import backgroundImage from '../assets/img/login-pic.jpg';

const Login = () => {
    return (
        <div className="d-lg-flex half">
            <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="contents order-2 order-md-1">

                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7">
                            <a href="/"><img src="assets/img/clinic-logo.png" alt=""  style={{maxHeight: '36px'}}/></a>
                            <div className="mb-4" style={{margin: '20px', textAlign: 'center'}}>
                                <h3 style={{fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '35px'}}>Đăng Nhập</h3>
                            </div>
                            <form action="form.php" method="post">
                                <div className="form-group first" style={{marginBottom: '20px', border: '1px solid gray', padding: '7px'}}>
                                    <input type="text" className="form-control" id="username" placeholder="Tài Khoản" style={{fontSize: '13px'}}/>
                                </div>
                                <div className="form-group last mb-3" style={{border: '1px solid gray', padding: '7px'}}>
                                    <input type="password" className="form-control" id="password" placeholder="Mật Khẩu" style={{fontSize: '13px'}}/>
                                </div>

                                <div className="d-flex mb-5 align-items-center">
                                    <span><a href="/" style={{color: 'black', fontWeight: '300'}}>Quay Lại Trang Chủ</a></span>
                                    <span className="ml-auto">Chưa có tài khoản ? &nbsp;<a href="/register" className="forgot-pass">Đăng Ký</a></span>
                                </div>

                                <input type="submit" value="Đăng Nhập" className="btn btn-block btn-primary" style={{borderRadius: '15px', height: '45px', marginTop: '-40px'}}/>

                                <span className="d-block text-center my-4 text-muted">&mdash; Hoặc &mdash;</span>

                                <div className="social-login">
                                    <a href="/" className="google btn d-flex justify-content-center align-items-center" style={{borderRadius: '15px', height: '45px'}}>
                                        <span className="icon-google mr-3"></span> Đăng Nhập Với Google
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;