import React, { useEffect, useState } from "react";
import { useReservations } from "../../hooks/useReservations.jsx";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from "./Reservations.module.css";
import SuccessfulMessage from "../SuccesfulMessage/SuccessfulMessage.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import moment from 'moment';
import "./calendarStyles.css"
import {Icon} from "@iconify/react";
import NewReservation from "../NewReservation/NewReservation.jsx";
import ReservationModal from "../ReservationModal/ReservationModal.jsx";

const localizer = momentLocalizer(moment);

const Reservations = () => {
    const { reservations, isLoading, error, fetchReservations } = useReservations();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [hotelNames, setHotelNames] = useState({});
    const [selectedReservation, setSelectedReservation] = useState(null);

    const handleReservationClick = (event) => {
        const reservation = event.reservation;

        const adjustedReservation = {
            ...reservation,
            check_in_date: moment(reservation.check_in_date).add(1, 'day').format('YYYY-MM-DD'),
            check_out_date: moment(reservation.check_out_date).add(1, 'day').format('YYYY-MM-DD'),
        };

        console.log("DEA")

        setSelectedReservation(adjustedReservation);
    };

    const handleCloseModal = () => {
        setSelectedReservation(null);
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
        const fetchHotelNames = async () => {
            const names = {};
            for (let reservation of reservations) {
                try {
                    const response = await fetch(`https://hotel-managament-back.onrender.com/api/hotels/${reservation.hotel_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    const hotelData = await response.json();
                    names[reservation.hotel_id] = hotelData.name;

                } catch (error) {
                    console.error("Error fetching hotel:", error);
                    names[reservation.hotel_id] = "Error al cargar nombre del hotel";
                }
            }
            setHotelNames(names);
        };

        if (reservations.length > 0) {
            fetchHotelNames();
        }
    }, [reservations]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{`Error: ${error}`}</div>;
    }

    const events = reservations.map((reservation) => ({
        title: `Reserva en Hotel: ${hotelNames[reservation.hotel_id] || '......'}`,
        start: moment(reservation.check_in_date).startOf('day').toDate(),
        end: moment(reservation.check_out_date).add(1, 'day').startOf('day').toDate(),
        allDay: true,
        reservation: {
            title: hotelNames[reservation.hotel_id],
            id: reservation.id,
            hotel_id: reservation.hotel_id,
            user_id: reservation.user_id,
            check_in_date: reservation.check_in_date,
            check_out_date: reservation.check_out_date,
        },
    }));

    const handleCreateReservation = async (reservationData) => {
        try  {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No se ha encontrado el token de autenticación.");
            }

            const response = await fetch("https://hotel-managament-back.onrender.com/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                throw new Error("Error al crear la reserva");
            }

            const data = await response.json();
            console.log("Reserva creada exitosamente:", data);
            setSuccessMessage("Reserva creada correctamente");
            setIsCreateModalOpen(false);
            await fetchReservations();
        } catch (error) {
            console.error("Error al crear la reserva:", error);
            throw error;
        }
    };

    const handleDeleteReservation = async (reservationId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No se ha encontrado el token de autenticación.");
            }

            const response = await fetch(`https://hotel-managament-back.onrender.com/api/reservations/${reservationId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la reserva");
            }

            setSuccessMessage("Reserva eliminada correctamente");
            setSelectedReservation(null);
            await fetchReservations();
        } catch (error) {
            console.error("Error al eliminar la reserva:", error);
            setErrorMessage("No se pudo eliminar la reserva. Intenta nuevamente.");
        }
    };

    const handleEditReservation = async (editedReservation) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No se ha encontrado el token de autenticación.");
            }

            const response = await fetch(`https://hotel-managament-back.onrender.com/api/reservations/${editedReservation.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(editedReservation),
            });

            if (!response.ok) {
                throw new Error("Error al modificar la reserva");
            }

            const data = await response.json();
            console.log("Reserva modificada exitosamente:", data);

            setSuccessMessage("Reserva modificada correctamente");
            setSelectedReservation(null);
            await fetchReservations();
        } catch (error) {
            console.error("Error al modificar la reserva:", error);
            setErrorMessage("No se pudo modificar la reserva. Intenta nuevamente.");
        }
    };


    return (
        <div className={styles.reservationsContainer}>
            <div className={styles.header}>
                <div className={styles.title}>Reservas</div>
                <button
                    className={styles.addButton}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <Icon icon="gridicons:add-outline" width="30" height="30" />
                </button>
            </div>

            {successMessage && <SuccessfulMessage message={successMessage} onClose={() => setSuccessMessage("")} />}
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage("")} />}

            <div className={styles.calendarContainer}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={handleReservationClick}
                />
            </div>
            {isCreateModalOpen && (
                <NewReservation
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleCreateReservation}
                />
            )}
            {selectedReservation && (
                <ReservationModal
                    reservation={selectedReservation}
                    onClose={handleCloseModal}
                    onEdit={handleEditReservation}
                    onDelete={handleDeleteReservation}
                />
            )}
        </div>
    );
};

export default Reservations;
