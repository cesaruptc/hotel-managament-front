import React, { useState } from "react";
import styles from "./ReservationModal.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationModal = ({ reservation, onClose, onEdit, onDelete }) => {
    const [editedReservation, setEditedReservation] = useState({ ...reservation });
    const [errorMessage, setErrorMessage] = useState("");

    const handleDateChange = (date, field) => {
        setEditedReservation((prev) => ({
            ...prev,
            [field]: date,
        }));
    };

    const handleSave = () => {
        if (!editedReservation.check_in_date || !editedReservation.check_out_date) {
            setErrorMessage("Las fechas son obligatorias.");
            return;
        }
        const today = new Date();
        if (editedReservation.check_in_date <= today) {
            setErrorMessage("La fecha de Check-In debe ser mayor al día de hoy.");
            return;
        }

        if (editedReservation.check_out_date <= editedReservation.check_in_date) {
            setErrorMessage("La fecha de Check-Out no puede ser menor a la de Check-In.");
            return;
        }

        setErrorMessage("");
        onEdit(editedReservation);
    };

    const handleDelete = () => {
        onDelete(editedReservation.id);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.modalCloseButton} onClick={onClose}>
                    &times;
                </button>
                <h2 className={styles.createText}>Editar reserva</h2>
                <form>
                    <div>
                        <label htmlFor="hotel" className={styles.label}>Hotel</label>
                        <input
                            type="text"
                            name="hotel"
                            value={reservation.title}
                            disabled
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label htmlFor="check_in_date" className={styles.label}>Fecha de Check In</label>
                        <DatePicker
                            selected={editedReservation.check_in_date}
                            onChange={(date) => handleDateChange(date, "check_in_date")}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Selecciona la fecha"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label htmlFor="check_out_date" className={styles.label}>Fecha de Check Out</label>
                        <DatePicker
                            selected={editedReservation.check_out_date}
                            onChange={(date) => handleDateChange(date, "check_out_date")}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Selecciona la fecha"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.buttonsContainer}>
                        <button
                            type="button"
                            onClick={handleSave}
                            className={styles.saveButton}
                        >
                            Guardar
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

export default ReservationModal;
