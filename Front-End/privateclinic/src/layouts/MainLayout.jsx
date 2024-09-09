import React from "react";
import Header from "./fragments/Main/Header";
import Footer from "./fragments/Main/Footer";

function MainLayout({ children }) {
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

export default MainLayout;