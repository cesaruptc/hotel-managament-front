import React, { useState } from "react";
import styles from "./HotelModal.module.css";

const HotelModal = ({ hotel, onClose, onEdit, onDelete }) => {
    const [editedHotel, setEditedHotel] = useState(hotel);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedHotel((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onEdit(editedHotel);
        onClose();
    };

    const handleDelete = () => {
        onDelete(hotel.id);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Información del Hotel</h2>
                <form>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="name"
                            value={editedHotel.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Ubicación:
                        <input
                            type="text"
                            name="location"
                            value={editedHotel.location}
                            onChange={handleChange}
                        />
                    </label>
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
                <button className={styles.closeButton} onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default HotelModal;
