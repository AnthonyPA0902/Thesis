import React from 'react';
import styles from '../assets/css/heading.module.css';

const Heading = ({ title, color }) => {
    const titleStyle = {
        color: color || 'inherit', // Use the passed color or fallback to default
    };

    return (
        <div id="header" className={styles.header}>
            <h2 className={styles.headerTitle} style={titleStyle}>
                {title}
            </h2>
            <hr className={styles.headerDivider} />
        </div>
    );
}


export default Heading;
