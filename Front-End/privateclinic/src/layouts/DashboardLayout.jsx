import React from "react";
import Header from "./fragments/Admin/Dashboard/Header";
import Footer from "./fragments/Admin/Dashboard/Footer";
import Sidebar from "./fragments/Admin/Dashboard/Sidebar";

function DashboardLayout({ children }) {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="page-wrapper">
                { children }
            </div>
            <Footer />
            <div className="sidebar-overlay" data-reff=""></div>
        </div>
    );
};

export default DashboardLayout;