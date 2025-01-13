import React, { useEffect } from "react";
import styles from './SuccessfulMessage.module.css';

const SuccessfulMessage = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.messageContainer}>
            <p>{message}</p>
        </div>
    );
};

export default SuccessfulMessage;
