import React, {useEffect, useState} from "react";
import styles from "./NewReservation.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useHotels} from "../../hooks/useHotels.jsx";
import {jwtDecode} from "jwt-decode";

const NewReservation = ({ onClose, onCreate }) => {
    const [hotel, setHotel] = useState("");
    const [check_in_date, setCheck_In_Date] = useState("");
    const [check_out_date, setCheck_Out_Date] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const { hotels, isLoading, error } = useHotels();

    useEffect(() => {
        if (error) {
            setErrorMessage("Error al cargar los hoteles");
        }
    }, [error]);

    const handleSubmit = async () => {
        if (!hotel || !check_in_date || !check_out_date) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        const today = new Date();
        if (check_in_date <= today) {
            setErrorMessage("La fecha de Check-In debe ser mayor al día de hoy.");
            return;
        }

        if (check_out_date <= check_in_date) {
            setErrorMessage("La fecha de Check-Out no puede ser menor a la de Check-In.");
            return;
        }

        setErrorMessage("");
        const formattedCheckInDate = check_in_date.toISOString().split('T')[0];
        const formattedCheckOutDate = check_out_date.toISOString().split('T')[0]

        const token = localStorage.getItem("token");
        if (!token) {
            setErrorMessage("No se ha encontrado el token de autenticación.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;
            if (!userId) {
                setErrorMessage("No se encontró el ID de usuario en el token.");
                return;
            }

            const reservationData = {
                hotel_id: hotel,
                check_in_date: formattedCheckInDate,
                check_out_date: formattedCheckOutDate,
                user_id: userId,
            };

            console.log("Datos a enviar: ", reservationData);

            await onCreate(reservationData);
            onClose();
        } catch (error) {
            setErrorMessage("Error al crear la reserva. Intenta nuevamente.");
        }
    };

    if (isLoading) {
        return <div>Cargando hoteles...</div>;

    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.modalCloseButton} onClick={onClose}>
                    &times;
                </button>
                <h2 className={styles.createText}>Nueva reserva</h2>
                <div className={styles.formCreate}>
                    <label htmlFor="hotel" className={styles.label}>Seleccionar Hotel</label>
                    <select
                        id="hotel"
                        value={hotel}
                        onChange={(e) => setHotel(e.target.value)}
                        className={styles.input}
                        required
                    >
                        <option value="">Seleccione un hotel</option>
                        {hotels.map((hotel) => (
                            <option key={hotel.id} value={hotel.id}>
                                {hotel.name} - {hotel.location}
                            </option>
                        ))}
                    </select>
                    <div>
                        <label htmlFor="check_in_date" className={styles.label}>Fecha de Check In</label>
                        <DatePicker
                            id="check_in_date"
                            selected={check_in_date}
                            onChange={(date) => setCheck_In_Date(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Selecciona la fecha"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div>
                        <label htmlFor="check_out_date" className={styles.label}>Fecha de Check Out</label>
                        <DatePicker
                            id="check_out_date"
                            selected={check_out_date}
                            onChange={(date) => setCheck_Out_Date(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Selecciona la fecha"
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.createContainer}>
                        <button onClick={handleSubmit} className={styles.buttonCreate}>Crear</button>
                    </div>
                </div>
            </div>
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage("")} />}
        </div>
    );
};

export default NewReservation;
