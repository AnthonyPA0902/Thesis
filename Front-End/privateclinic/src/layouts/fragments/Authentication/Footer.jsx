import React, {useEffect} from 'react';

const Footer = () => {
    useEffect(() => {
        const loadScript = (src, callback) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = callback;
            document.head.appendChild(script);
        };

        loadScript('/assets/js/jquery-3.3.1.min.js', () => {
            loadScript('/assets/js/popper.min.js', () => {
                loadScript('/assets/js/bootstrap.min.js', () => {
                    loadScript('/assets/js/main.js', () => {
                    });
                });
            });
        });
    }, []);
    return (
        <div>

        </div>
    );
};

export default Footer;