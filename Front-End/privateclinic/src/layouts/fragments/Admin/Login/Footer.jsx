import React, {useEffect} from 'react';
const Footer = () => {
    useEffect(() => {
        const loadScript = (src, callback) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = callback;
            document.head.appendChild(script);
        };

        loadScript('/admin_assets/js/jquery.min.js', () => {
            loadScript('/admin_assets/js/popper.js', () => {
                loadScript('/admin_assets/js/bootstrap.min.js', () => {
                    loadScript('/admin_assets/js/main.js', () => {
                    });
                });
            });
        });
    }, []);
    return (
        <div></div>
    );
};

export default Footer;