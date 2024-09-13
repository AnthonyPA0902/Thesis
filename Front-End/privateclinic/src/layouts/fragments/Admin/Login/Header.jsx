import React, {useEffect} from 'react';
// Directly imported CSS
import '../../../../admin_assets/css/style.css';

const Header = () => {
    useEffect(() => {
        // Create and append Google Fonts link
        const googleFontsLink = document.createElement("link");
        googleFontsLink.href = "https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap";
        googleFontsLink.rel = "stylesheet";
        document.head.appendChild(googleFontsLink);

        // Create and append Font Awesome link
        const fontAwesomeLink = document.createElement("link");
        fontAwesomeLink.href = "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
        fontAwesomeLink.rel = "stylesheet";
        document.head.appendChild(fontAwesomeLink);

        // Clean up the links when the component is unmounted
        return () => {
            document.head.removeChild(googleFontsLink);
            document.head.removeChild(fontAwesomeLink);
        };
    }, []);
    return (
        <div></div>
    );
};

export default Header;