import React, { useEffect } from 'react';

const Header = () => {
    useEffect(() => {
        const style1 = document.createElement('link');
        style1.rel = 'stylesheet'
        style1.href = '/assets/vendor/bootstrap/css/bootstrap.min.css'
        document.head.appendChild(style1);

        const style2 = document.createElement('link');
        style2.rel = 'stylesheet'
        style2.href = '/assets/vendor/bootstrap-icons/bootstrap-icons.css'
        document.head.appendChild(style2);

        const style3 = document.createElement('link');
        style3.rel = 'stylesheet'
        style3.href = '/assets/vendor/aos/aos.css'
        document.head.appendChild(style3);

        const style4 = document.createElement('link');
        style4.rel = 'stylesheet'
        style4.href = '/assets/vendor/fontawesome-free/css/all.min.css'
        document.head.appendChild(style4);

        const style5 = document.createElement('link');
        style5.rel = 'stylesheet'
        style5.href = '/assets/vendor/glightbox/css/glightbox.min.css'
        document.head.appendChild(style5);

        const style6 = document.createElement('link');
        style6.rel = 'stylesheet'
        style6.href = '/assets/vendor/swiper/swiper-bundle.min.css'
        document.head.appendChild(style6);

        const style7 = document.createElement('link');
        style7.rel = 'stylesheet'
        style7.href = '/assets/vendor/swiper/swiper-bundle.min.css'
        document.head.appendChild(style7);

        const style8 = document.createElement('link');
        style8.rel = 'stylesheet'
        style8.href = '/assets/css/main.css'
        document.head.appendChild(style8);

        const style9 = document.createElement('link');
        style9.rel = 'icon'
        style9.icon = 'image/gif'
        style9.href = '/assets/img/favicon.png';
        document.head.appendChild(style9);

        const style10 = document.createElement('link');
        style10.rel = 'icon'
        style10.icon = 'image/gif'
        style10.href = '/assets/img/apple-touch-icon.png';
        document.head.appendChild(style10);
    });
    return (
        <header id="header" className="header sticky-top">

            <div className="topbar d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="d-none d-md-flex align-items-center">
                        <i className="bi bi-clock me-1"></i> Monday - Saturday, 8AM to 10PM
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-phone me-1"></i> Call us now +1 5589 55488 55
                    </div>
                </div>
            </div>

            <div className="branding d-flex align-items-center">

                <div className="container position-relative d-flex align-items-center justify-content-end">
                    <a href="/" className="logo d-flex align-items-center me-auto">
                        <img src="assets/img/logo.png" alt="" />
                    </a>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><a href="/" className="active">Home</a></li>
                            <li><a href="/">About</a></li>
                            <li><a href="/">Services</a></li>
                            <li><a href="/">Departments</a></li>
                            <li><a href="/">Doctors</a></li>
                            <li className="dropdown"><a href="/"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><a href="/">Dropdown 1</a></li>
                                    <li className="dropdown"><a href="/"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                        <ul>
                                            <li><a href="/">Deep Dropdown 1</a></li>
                                            <li><a href="/">Deep Dropdown 2</a></li>
                                            <li><a href="/">Deep Dropdown 3</a></li>
                                            <li><a href="/">Deep Dropdown 4</a></li>
                                            <li><a href="/">Deep Dropdown 5</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="/">Dropdown 2</a></li>
                                    <li><a href="/">Dropdown 3</a></li>
                                    <li><a href="/">Dropdown 4</a></li>
                                </ul>
                            </li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>

                    <a className="cta-btn" href="index.html#appointment">Make an Appointment</a>

                </div>

            </div>

        </header>
    );
};

export default Header;