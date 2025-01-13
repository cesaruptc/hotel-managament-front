import { useState, useEffect } from "react";

export const useReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservations = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://hotel-managament-back.onrender.com/api/reservations");
            if (!response.ok) {
                throw new Error("Error al cargar las reservas");
            }
            const data = await response.json();
            setReservations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return { reservations, isLoading, error, fetchReservations};
};
