import React from "react";
import backgroundImage from '../assets/img/login-img.jpg';

const Login = () => {
    return (
        <div class="d-lg-flex half">
            <div class="bg order-1 order-md-2" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div class="contents order-2 order-md-1">

                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-7">
                            <img src="assets/img/clinic-logo.png" alt=""  style={{maxHeight: '36px'}}/>
                            <div class="mb-4" style={{margin: '20px', textAlign: 'center'}}>
                                <h3 style={{fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '35px'}}>Đăng Nhập</h3>
                            </div>
                            <form action="form.php" method="post">
                                <div class="form-group first" style={{marginBottom: '20px', border: '1px solid gray'}}>
                                    <input type="text" class="form-control" id="username" placeholder="Tài Khoản" style={{fontSize: '13px'}}/>

                                </div>
                                <div class="form-group last mb-3" style={{border: '1px solid gray'}}>
                                    <input type="password" class="form-control" id="password" placeholder="Mật Khẩu" style={{fontSize: '13px'}}/>

                                </div>

                                <div class="d-flex mb-5 align-items-center">
                                    <span class="ml-auto"><a href="/" class="forgot-pass">Forgot Password ?</a></span>
                                </div>

                                <input type="submit" value="Đăng Nhập" class="btn btn-block btn-primary" style={{borderRadius: '15px'}}/>

                                <span class="d-block text-center my-4 text-muted">&mdash; or &mdash;</span>

                                <div class="social-login">
                                    <a href="/" class="google btn d-flex justify-content-center align-items-center" style={{borderRadius: '15px'}}>
                                        <span class="icon-google mr-3"></span> Đăng Nhập Với Google
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