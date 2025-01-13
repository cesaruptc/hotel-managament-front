import React, { useState } from "react";
import styles from "./UserModal.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const UserModal = ({ user, onClose, onEdit, onDelete }) => {
    const [editedUser, setEditedUser] = useState({...user});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (!editedUser.email.trim() || !editedUser.role.trim()) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }
        setErrorMessage("");
        onEdit(editedUser);
    };

    const handleDelete = () => {
        onDelete(editedUser.id);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.modalCloseButton} onClick={onClose}>
                    &times;
                </button>
                <h2 className={styles.createText}>Editar usuario</h2>
                <form>
                    <div>
                        <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                        <input
                            type="text"
                            name = "email"
                            value={editedUser.email || ""}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <label htmlFor="role" className={styles.label}>Rol</label>
                        <select
                            name="role"
                            value={editedUser.role || ""}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
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

export default UserModal;
