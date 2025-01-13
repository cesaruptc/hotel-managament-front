import React, { useEffect } from "react";
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message, onClose }) => {
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

export default ErrorMessage;
