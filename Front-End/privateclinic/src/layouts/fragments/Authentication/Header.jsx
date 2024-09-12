import React, {useEffect} from 'react';

const Header = () => {
    useEffect(() => {
        if(!document.getElementById('main-style')){
            const style1 = document.createElement('link');
            style1.id = 'main-style'
            style1.rel = 'stylesheet'
            style1.href = '/assets/fonts/icomoon/style.css';
            document.head.appendChild(style1);

            const style2 = document.createElement('link');
            style2.rel = 'stylesheet'
            style2.href = '/assets/css/owl.carousel.min.css';
            document.head.appendChild(style2);

            const style3 = document.createElement('link');
            style3.rel = 'stylesheet'
            style3.href = '/assets/css/bootstrap.min.css';
            document.head.appendChild(style3);

            const style4 = document.createElement('link');
            style4.rel = 'stylesheet'
            style4.href = '/assets/css/style.css';
            document.head.appendChild(style4);
        }
    });
    return (
        <div>

        </div>
    );
};

export default Header;