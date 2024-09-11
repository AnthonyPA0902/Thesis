import React from 'react';
import styles from '../assets/css/service.module.css';
import Heading from '../components/Heading';
const Service = () => {
    return (
        <main className={styles.main}>
            {/* Header Section */}
           <Heading title="DỊCH VỤ CUNG CẤP"/>

            {/* Services Section */}
            <div id="services" className={`${styles.services}`}>
                <a href='/appointment'><div className={styles.serviceBox}>
                    <div className={styles.serviceImage}>
                        <img src="/assets/img/clinic_services/general-check-up.jpg" alt="service pic" />
                    </div>
                    <div className={styles.serviceContent}>
                        <ul>
                            <li>Liệu Trình: <span class={`${styles.bold}`}>3 buổi/tuần</span></li>
                            <li>Số tiền: <span class={`${styles.bold}`}>2.000.000 đồng</span></li>
                            <li>Đây là phương pháp khám tổng thể để kiểm tra bao quát sức khỏe và đưa ra các chẩn đoán cùng với phương pháp phòng ngừa để bảo vệ sức khỏe.</li>
                        </ul>
                    </div>
                </div></a>
                <a href='/appointment'><div className={styles.serviceBox}>
                    <div className={styles.serviceImage}>
                        <img src="/assets/img/clinic_services/medicine.jpg" alt="service pic" />
                    </div>
                    <div className={styles.serviceContent}>
                        <ul>
                            <li>Liệu Trình: <span class={`${styles.bold}`}>Bất cứ khi nào</span></li>
                            <li>Số tiền: <span class={`${styles.bold}`}>500.000 đồng</span></li>
                            <li>Khám nhanh và được kê đơn thuốc để tiến hành mua thuốc.</li>
                        </ul>
                    </div>
                </div></a>
                <a href='/appointment'><div className={styles.serviceBox}>
                    <div className={styles.serviceImage}>
                        <img src="/assets/img/clinic_services/medical-shot.jpg" alt="service pic" />
                    </div>
                    <div className={styles.serviceContent}>
                        <ul>
                            <li>Liệu Trình: <span class={`${styles.bold}`}>2 buổi/tuần</span></li>
                            <li>Số tiền: <span class={`${styles.bold}`}>2.000.000 đồng</span></li>
                            <li>Đăng ký chích ngừa thường niên đối với các loại bệnh phổ biến và không phổ biến.</li>
                        </ul>
                    </div>
                </div></a>
                <a href='/appointment'><div className={styles.serviceBox}>
                    <div className={styles.serviceImage}>
                        <img src="/assets/img/clinic_services/examination.jpg" alt="service pic" />
                    </div>
                    <div className={styles.serviceContent}>
                        <ul>
                            <li>Liệu Trình: <span class={`${styles.bold}`}>1 buổi/tháng</span></li>
                            <li>Số tiền: <span class={`${styles.bold}`}>5.000.000 đồng</span></li>
                            <li>Kiểm tra và lấy mẫu để xét nghiệm các bệnh khó tìm và đưa ra lộ trình điều trị,</li>
                        </ul>
                    </div>
                </div></a>
            </div>
        </main>
    );
};

export default Service;