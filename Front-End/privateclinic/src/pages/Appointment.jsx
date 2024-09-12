import React from 'react';
import styles from '../assets/css/appointment.module.css';
import Heading from '../components/Heading';
import backgroundImage from '../assets/img/appointment-background.jpg';

const Appointment = () => {
    return (
        <main className={styles.main} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
            {/* Header Section */}
            <Heading title="HẸN LỊCH KHÁM" color="black" />
            {/* Appointment Section */}
            <section id="appointment" className="appointment section light-background">
                <div className="container" data-aos-delay="100">

                    <form action="forms/appointment.php" method="post" className="php-email-form">
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Họ và Tên" required="" autoComplete='true'/>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email" required="" autoComplete='true'/>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input type="tel" className="form-control" name="phone" id="phone" placeholder="Số điện thoại" required="" autoComplete='true'/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group mt-3">
                                <input type="datetime-local" name="date" className="form-control datepicker" id="date" placeholder="Ngày Hẹn Khám" required="" />
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select name="department" id="department" className="form-select" required="">
                                    <option value="">Chọn dịch vụ</option>
                                    <option value="Department 1">Khám tổng quát</option>
                                    <option value="Department 2">Xét nghiệm</option>
                                    <option value="Department 3">Chích ngừa</option>
                                </select>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select name="doctor" id="doctor" className="form-select" required="">
                                    <option value="">Chọn bác sĩ</option>
                                    <option value="Doctor 1">Bác sĩ Sarah</option>
                                    <option value="Doctor 2">Bác sĩ Johnson</option>
                                    <option value="Doctor 3">Bác sĩ Guy</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <textarea className="form-control" name="message" rows="5" placeholder="Ghi Chú (Tùy Chọn)"></textarea>
                        </div>
                        <div className="mt-3">
                            <div className="loading">Đang tải thông tin</div>
                            <div className="error-message">Có lỗi xảy ra trong quá trình cập nhật thông tin</div>
                            <div className="sent-message">Lịch hẹn khám của bạn đã được cập nhật thành công !</div>
                            <div className="text-center"><button type="submit">Tạo Lịch Hẹn</button></div>
                        </div>
                    </form>

                </div>

            </section>

        </main>
    );
};

export default Appointment;