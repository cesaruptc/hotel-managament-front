import React, { useState } from "react";
import styles from "./CreateHotel.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const CreateHotel = ({ onClose, onCreate }) => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = () => {
        if (!name.trim() || !location.trim()) {
            setErrorMessage("Todos los campos son obligatorios.")
            return;
        }
        setErrorMessage("");
        onCreate({ name: name.trim(), location: location.trim()})
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.modalCloseButton} onClick={onClose}>
                    &times;
                </button>
                <h2 className={styles.createText}>Crear hotel</h2>
                <div className={styles.formCreate}>
                    <label htmlFor={name} className={styles.label}>Nombre del hotel</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                    <label htmlFor={location} className={styles.label}>Ubicación</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.input}
                    />
                    <div className={styles.createContainer}>
                        <button onClick={handleSubmit} className={styles.buttonCreate}>Crear</button>
                    </div>
                </div>
            </div>
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage("")} />}
        </div>
    );
};

export default CreateHotel;
