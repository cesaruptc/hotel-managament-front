import React, {useState} from "react";
import { useHotels } from "../../hooks/useHotels.jsx";
import styles from "./UserHotels.module.css";
const UserHotels = () => {
    const { hotels, isLoading, error, fetchHotels } = useHotels();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{`Error: ${error}`}</div>;
    }

    return (
        <div className={styles.hotelsContainer}>
            <div className={styles.header}>
                <div className={styles.title}>Hoteles Disponibles</div>
            </div>
            <div className={styles.hotelsList}>
                {hotels.map((hotel) => (
                    <div key={hotel.id} className={styles.hotelCard}>
                        <img
                            src={`https://picsum.photos/300/200?random=${hotel.id}`}
                            alt={hotel.name}
                            className={styles.hotelImage}
                        />
                        <center><h2 className={styles.hotelName}>{hotel.name}</h2></center>
                        <p className={styles.hotelLocation}>Ubicación: {hotel.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserHotels;
