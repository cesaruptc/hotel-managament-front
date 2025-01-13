import React, {useEffect, useState} from "react";
import styles from "./Reservations.module.css";
import SuccessfulMessage from "../SuccesfulMessage/SuccessfulMessage.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import UserModal from "../UserModal/UserModal.jsx";
import {useReservations} from "../../hooks/useReservations.jsx";

const Reservations = () => {
    const { reservations, isLoading, error, fetchReservations } = useReservations();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{`Error: ${error}`}</div>;
    }

    return (
        <div className={styles.usersContainer}>
            <div className={styles.header}>
                <div>
                    <div className={styles.title}>Reservas</div>
                </div>
            </div>
            {successMessage && <SuccessfulMessage message={successMessage} onClose={() => setSuccessMessage("")} />}
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage("")} />}
        </div>
    );
};

export default Reservations;
