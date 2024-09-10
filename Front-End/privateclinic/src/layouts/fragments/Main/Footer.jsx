import React, { useEffect } from 'react';

const Footer = () => {
  // Function to load scripts with promises
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true; // or script.defer = true;
      script.onload = () => resolve(src);
      script.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    // Array of script paths
    const scriptPaths = [
      '/assets/js/main.js',
      '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
      '/assets/vendor/php-email-form/validate.js',
      '/assets/vendor/aos/aos.js',
      '/assets/vendor/glightbox/js/glightbox.min.js',
      '/assets/vendor/purecounter/purecounter_vanilla.js',
      '/assets/vendor/swiper/swiper-bundle.min.js'
    ];

    // Load scripts sequentially
    scriptPaths.reduce((promise, path) => {
      return promise.then(() => loadScript(path));
    }, Promise.resolve())
      .catch((error) => {
        console.error('Script loading error:', error);
      });
  }, []);
  return (
    <footer id="footer" className="footer light-background">

      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">Phòng Khám Cleveland</span>
            </a>
            <div className="footer-contact pt-3">
              <p>42/23 Lam Sơn</p>
              <p>Phường 2, Tân Bình, TP.HCM</p>
              <p className="mt-3"><strong>Phone:</strong> <span>0942 256 346</span></p>
              <p><strong>Email:</strong> <span>clevelandclinic@gmail.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="/"><i className="bi bi-twitter-x"></i></a>
              <a href="/"><i className="bi bi-facebook"></i></a>
              <a href="/"><i className="bi bi-instagram"></i></a>
              <a href="/"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Truy Cập</h4>
            <ul>
              <li><a href="/">Trang Chủ</a></li>
              <li><a href="/">Dịch Vụ</a></li>
              <li><a href="/">Đặt Lịch Khám</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Dịch Vụ Của Chúng Tôi</h4>
            <ul>
              <li><a href="/">Tổng Quát</a></li>
              <li><a href="/">Mua Thuốc</a></li>
              <li><a href="/">Chích Ngừa</a></li>
              <li><a href="/">Xét Nghiệm</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Các Bác Sĩ</h4>
            <ul>
              <li><a href="/">Walter White</a></li>
              <li><a href="/">Jhonson</a></li>
              <li><a href="/">William Anderson</a></li>
              <li><a href="/">Amanda Jepson</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Liên Lạc</h4>
            <ul>
              <li><a href="/">Facebook</a></li>
              <li><a href="/">Zalo</a></li>
              <li><a href="/">X</a></li>
              <li><a href="/">Linkedin</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright 2024</span> <strong className="px-1 sitename">Cleveland Clinic</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          Designed by <a href="https://google.com/">PA</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;