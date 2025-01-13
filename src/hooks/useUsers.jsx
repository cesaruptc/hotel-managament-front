import { useState, useEffect } from "react";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://hotel-managament-back.onrender.com/api/auth/users");
            if (!response.ok) {
                throw new Error("Error al cargar los usuarios");
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, isLoading, error, fetchUsers};
};
