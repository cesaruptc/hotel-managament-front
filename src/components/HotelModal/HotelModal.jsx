import React, { useState } from "react";
import styles from "./HotelModal.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const HotelModal = ({ hotel, onClose, onEdit, onDelete }) => {
    const [editedHotel, setEditedHotel] = useState({...hotel});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedHotel((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (!editedHotel.name.trim() || !editedHotel.location.trim()) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }
        setErrorMessage("");
        onEdit(editedHotel);
    };

    const handleDelete = () => {
        onDelete(editedHotel.id);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.modalCloseButton} onClick={onClose}>
                    &times;
                </button>
                <h2 className={styles.createText}>Editar hotel</h2>
                <form>
                    <div className={styles.formEdit}>
                        <label htmlFor="name" className={styles.label}>Nombre del hotel</label>
                        <input
                            type="text"
                            name = "name"
                            value={editedHotel.name || ""}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <label htmlFor="location" className={styles.label}>Ubicación</label>
                        <input
                            type="text"
                            name="location"
                            value={editedHotel.location || ""}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button
                            type="button"
                            onClick={handleSave}
                            className={styles.saveButton}
                        >
                            Modificar
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className={styles.deleteButton}
                        >
                            Eliminar
                        </button>
                    </div>
                </form>
            </div>
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage("")} />}
        </div>
    );
};

export default HotelModal;
