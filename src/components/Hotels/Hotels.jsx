import React, {useState} from "react";
import { useHotels } from "../../hooks/useHotels.jsx";
import styles from "./Hotels.module.css";
import HotelModal from "../HotelModal/HotelModal.jsx";

const Hotels = () => {
    const { hotels, isLoading, error } = useHotels();
    const [selectedHotel, setSelectedHotel] = useState(null);

    const handleHotelClick = (hotel) => {
        setSelectedHotel(hotel);
    };

    console.log("selectedHotel")
    const handleModalClose = () => {
        setSelectedHotel(null);
    };

    const handleDeleteHotel = async (hotelId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token no encontrado");
            return;
        }

        try {
            const response = await fetch(`https://hotel-managament-back.onrender.com/api/hotels/delete/${hotelId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("No se pudo eliminar el hotel");
            }

            console.log("Hotel eliminado con éxito");

            setSelectedHotel(null);
        } catch (error) {
            console.error("Error al eliminar el hotel:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{`Error: ${error}`}</div>;
    }

    return (
        <div className={styles.hotelsContainer}>
            <div className={styles.title}>Hoteles Disponibles</div>
            <div className={styles.hotelsList}>
                {hotels.map((hotel) => (
                    <div key={hotel.id} className={styles.hotelCard} onClick={() => handleHotelClick(hotel)}>
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
            {selectedHotel && (
                <HotelModal
                    hotel={selectedHotel}
                    onClose={handleModalClose}
                    onDelete={handleDeleteHotel}
                />
            )}
        </div>
    );
};

export default Hotels;
