import { useState, useEffect } from 'react';
import axios from 'axios';

export const useHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("https://hotel-managament-back.onrender.com/api/hotels");
                setHotels(response.data);
            } catch (error) {
                setError(error.response?.data?.error || error.message || "Error al cargar los hoteles");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHotels();
    }, []);

    return { hotels, isLoading, error };
};