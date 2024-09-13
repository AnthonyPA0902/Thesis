import React from "react";
import Header from "./fragments/Admin/Login/Header";
import Footer from "./fragments/Admin/Login/Footer";

function AdminAuthLayout({ children }) {
    return (
        <div>
            <Header />
            <div>
                { children }
            </div>
            <Footer />
        </div>
    );
};

export default AdminAuthLayout;