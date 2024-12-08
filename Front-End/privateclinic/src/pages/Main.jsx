import React from 'react';

const Main = () => {
    return (
        <main className="main">
            {/* Hero Section */}
            <section id="hero" className="hero section">

                <div id="hero-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">

                    <div className="carousel-item active">
                        <img src="/assets/img/hero-carousel/hero-carousel-1.jpg" alt="" />
                        <div className="container">
                            <h2>Chào Mừng Đến Với Phòng Khám Cleveland</h2>
                            <p>Phòng khám với 5 năm kinh nghiệm trong việc khám bệnh và đưa ra các liệu trình trị bệnh phổ biến. Cùng với đội ngũ y bác sĩ hàng đầu và các trang thiết bị tân tiến trên thế giới, chúng tôi cung cấp cho khách hàng những dịch vụ hiện đại, an toàn và tốt nhất hiện nay.</p>
                            <a href="#about" className="btn-get-started">Đọc Thêm</a>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/assets/img/hero-carousel/hero-carousel-2.jpg" alt="" />
                        <div className="container">
                            <h2>Dịch Vụ Của Chúng Tôi</h2>
                            <p>Chúng tôi cung cấp các dịch vụ khám chữa bệnh hàng đầu, được phổ biến rộng rãi trong các dịch vụ y tế hiện nay. Các dịch vụ này được áp dụng thành công ở nhiều nơi trên thế giới và chúng tôi mang lại quy trình đăng ký dịch vụ tiện lợi và nhanh chóng.</p>
                            <a href="#featured-services" className="btn-get-started">Read More</a>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/assets/img/hero-carousel/hero-carousel-3.jpg" alt="" />
                        <div className="container">
                            <h2>Đội Ngũ Bác Sĩ</h2>
                            <p>Các bác sĩ ở Cleveland là những người có chuyên môn cao và thâm niên trong nghề. Họ được đào tào kỹ càng ở nước ngoài và đạt được nhiều thành tựu cao trong lĩnh vực y tế.</p>
                            <a href="#doctors" className="btn-get-started">Read More</a>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
                    </a>

                    <a className="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
                    </a>

                    <ol className="carousel-indicators"></ol>

                </div>

            </section>
            {/* Hero Section */}

            {/* About Section */}
            <section id="about" className="about section">

                <div className="container section-title">
                    <h2>Về Chúng Tôi<br /></h2>
                    <p>Phòng Khám Đa Khoa Tư Nhân Được Cấp Chứng Chỉ Nhà Nước Trong Lĩnh Vực Y Tế</p>
                </div>

                <div className="container">

                    <div className="row gy-4">
                        <div className="col-lg-6 position-relative align-self-start" data-aos-delay="100">
                            <img src="assets/img/private-clinic.jpg" className="img-fluid" alt="" />
                        </div>
                        <div className="col-lg-6 content" data-aos-delay="200">
                            <h3>Phòng Khám Tư Nhân Chất Lượng Cao Được Công Nhận Bởi Các Chuyên Gia Hàng Đầu Về Chăm Sóc Sức Khỏe</h3>
                            <p className="fst-italic">
                                Được thành lập từ năm 2019 đến nay, chúng tôi đã tiếp nhận hơn 1 triệu bệnh nhân đến từ khắp các tỉnh thành phố trên cả nước
                            </p>
                            <ul>
                                <li><i className="bi bi-check2-all"></i> <span>Dịch vụ y tế chất lượng cao, an toàn và tiện lợi</span></li>
                                <li><i className="bi bi-check2-all"></i> <span>Đội ngũ nhân viên tận tình và chăm sóc tốt khách hàng mọi lúc</span></li>
                                <li><i className="bi bi-check2-all"></i> <span>Áp dụng các công nghệ hiện đại trong việc quản lý phòng khám</span></li>
                            </ul>
                            <p>
                                Chúng tôi làm việc với phương châm "Yên Lòng Khách Đến, Vừa Lòng Khách Đi". Khách hàng khi sử dụng dịch vụ của phòng khám chúng tôi lâu dài sẽ nhận được rất nhiều ưu đãi và tiện ích.
                            </p>
                        </div>
                    </div>

                </div>

            </section>
            {/* About Section */}

            {/* Featured Services Section */}
            <section id="featured-services" className="featured-services section">

            <div className="container section-title">
                    <h2>Dịch Vụ Phổ Biến<br /></h2>
                    <p>Các dịch vụ được tin dùng nhiều nhất hiện nay bởi khách hàng khi đến phòng khám</p>
                </div>

                <div className="container">

                    <div className="row gy-4">

                        <div className="col-xl-3 col-md-6 d-flex" data-aos-delay="100">
                            <div className="service-item position-relative">
                                <div className="icon"><i className="fas fa-heartbeat icon"></i></div>
                                <h4><a href="/" className="stretched-link">Khám Tổng Quát</a></h4>
                                <p>Khám sức khỏe định kỳ với bác sĩ và nhận được chẩn đoán nhanh chóng</p>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 d-flex" data-aos-delay="200">
                            <div className="service-item position-relative">
                                <div className="icon"><i className="fas fa-pills icon"></i></div>
                                <h4><a href="/" className="stretched-link">Mua Thuốc</a></h4>
                                <p>Cung cấp dịch vụ bán thuốc tự do và theo đơn tại phòng khám</p>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 d-flex" data-aos-delay="300">
                            <div className="service-item position-relative">
                                <div className="icon"><i className="fas fa-thermometer icon"></i></div>
                                <h4><a href="/" className="stretched-link">Chích Ngừa</a></h4>
                                <p>Có các lựa chọn chích ngừa cho các loại bệnh phố biến hiện nay</p>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 d-flex" data-aos-delay="400">
                            <div className="service-item position-relative">
                                <div className="icon"><i className="fas fa-dna icon"></i></div>
                                <h4><a href="/" className="stretched-link">Xét Nghiệm</a></h4>
                                <p>Quy trình xét nghiệm và điều trị các bệnh lý từ đơn giản tới phức tạp</p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
            {/* Featured Services Section */}

            {/* Doctor Section */}
            <section id="doctors" className="doctors section light-background">

                <div className="container section-title" >
                    <h2>Bác Sĩ</h2>
                    <p>Các bác sĩ hàng đầu tốt nghiệp từ các trường đại học danh tiếng về Y Dược trong và ngoài nước</p>
                </div>

                <div className="container">

                    <div className="row gy-4">

                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos-delay="100">
                            <div className="team-member">
                                <div className="member-img">
                                    <img src="assets/img/doctors/doctors-1.jpg" className="img-fluid" alt="" />
                                        <div className="social">
                                            <a href="/"><i className="bi bi-twitter-x"></i></a>
                                            <a href="/"><i className="bi bi-facebook"></i></a>
                                            <a href="/"><i className="bi bi-instagram"></i></a>
                                            <a href="/"><i className="bi bi-linkedin"></i></a>
                                        </div>
                                </div>
                                <div className="member-info">
                                    <h4>Ngô Thanh Hải</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos-delay="200">
                            <div className="team-member">
                                <div className="member-img">
                                    <img src="assets/img/doctors/doctors-2.jpg" className="img-fluid" alt="" />
                                        <div className="social">
                                            <a href="/"><i className="bi bi-twitter-x"></i></a>
                                            <a href="/"><i className="bi bi-facebook"></i></a>
                                            <a href="/"><i className="bi bi-instagram"></i></a>
                                            <a href="/"><i className="bi bi-linkedin"></i></a>
                                        </div>
                                </div>
                                <div className="member-info">
                                    <h4>Nguyễn Thùy Dương</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos-delay="300">
                            <div className="team-member">
                                <div className="member-img">
                                    <img src="assets/img/doctors/doctors-3.jpg" className="img-fluid" alt="" />
                                        <div className="social">
                                            <a href="/"><i className="bi bi-twitter-x"></i></a>
                                            <a href="/"><i className="bi bi-facebook"></i></a>
                                            <a href="/"><i className="bi bi-instagram"></i></a>
                                            <a href="/"><i className="bi bi-linkedin"></i></a>
                                        </div>
                                </div>
                                <div className="member-info">
                                    <h4>Nguyễn Văn Tài</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos-delay="400">
                            <div className="team-member">
                                <div className="member-img">
                                    <img src="assets/img/doctors/doctors-4.jpg" className="img-fluid" alt="" />
                                        <div className="social">
                                            <a href="/"><i className="bi bi-twitter-x"></i></a>
                                            <a href="/"><i className="bi bi-facebook"></i></a>
                                            <a href="/"><i className="bi bi-instagram"></i></a>
                                            <a href="/"><i className="bi bi-linkedin"></i></a>
                                        </div>
                                </div>
                                <div className="member-info">
                                    <h4>Phan Thị Thanh</h4>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
            {/* Doctor Section */}
        </main>
    );
};

export default Main;