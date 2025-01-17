import { useState, useEffect } from "react";

export const useHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHotels = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://hotel-managament-back.onrender.com/api/hotels");
            if (!response.ok) {
                throw new Error("Error al cargar los hoteles");
            }
            const data = await response.json();
            setHotels(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    return { hotels, isLoading, error, fetchHotels };
};
