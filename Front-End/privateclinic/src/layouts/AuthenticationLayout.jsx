import React from "react";
import Header from "./fragments/Authentication/Header";
import Footer from "./fragments/Authentication/Footer";

function AuthenticationLayout({ children }) {
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

export default AuthenticationLayout;