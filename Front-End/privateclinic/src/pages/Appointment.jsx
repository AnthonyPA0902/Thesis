import React from 'react';
import styles from '../assets/css/appointment.module.css';
import Heading from '../components/Heading';
import backgroundImage from '../assets/img/appointment.jpg';


const Appointment = () => {
    return (
        <main className={styles.main} style={{ backgroundImage: `url(${backgroundImage})` }}>
            {/* Header Section */}
            <Heading title="HẸN LỊCH KHÁM" color="white" />
            {/* Appointment Section */}
            <section id="appointment" className="appointment section light-background">
                <div className="container"  data-aos-delay="100">

                    <form action="forms/appointment.php" method="post" className="php-email-form">
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required="" />
                            </div>
                            <div class="col-md-4 form-group mt-3 mt-md-0">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required="" />
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input type="tel" className="form-control" name="phone" id="phone" placeholder="Your Phone" required="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group mt-3">
                                <input type="datetime-local" name="date" className="form-control datepicker" id="date" placeholder="Appointment Date" required="" />
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select name="department" id="department" className="form-select" required="">
                                    <option value="">Select Service</option>
                                    <option value="Department 1">Service 1</option>
                                    <option value="Department 2">Service 2</option>
                                    <option value="Department 3">Service 3</option>
                                </select>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select name="doctor" id="doctor" className="form-select" required="">
                                    <option value="">Select Doctor</option>
                                    <option value="Doctor 1">Doctor Sarah</option>
                                    <option value="Doctor 2">Doctor Johnson</option>
                                    <option value="Doctor 3">Doctor Guy</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <textarea className="form-control" name="message" rows="5" placeholder="Message (Optional)"></textarea>
                        </div>
                        <div className="mt-3">
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                            <div className="text-center"><button type="submit">Make an Appointment</button></div>
                        </div>
                    </form>

                </div>

            </section>

        </main>
    );
};

export default Appointment;