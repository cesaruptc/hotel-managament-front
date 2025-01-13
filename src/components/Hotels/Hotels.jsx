import React, {useState} from "react";
import { useHotels } from "../../hooks/useHotels.jsx";
import styles from "./Hotels.module.css";
import HotelModal from "../HotelModal/HotelModal.jsx";
import SuccessfulMessage from "../SuccesfulMessage/SuccessfulMessage.jsx";
import {Icon} from "@iconify/react";
import CreateHotel from "../CreateHotel/CreateHotel.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const Hotels = () => {
    const { hotels, isLoading, error, fetchHotels } = useHotels();
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [successMessage, setSuccessMessage] = useState("")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const handleHotelClick = (hotel) => {
        setSelectedHotel(hotel);
    };

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

            setSuccessMessage("Hotel eliminado correctamente")
            setSelectedHotel(null);

            await fetchHotels(); // Proceso para recargar, la idea es que elimine y actualice la lista de una vez
        } catch (error) {
            setErrorMessage("Error al intentar eliminar el hotel");
            console.error("Error al eliminar el hotel:", error);
        }
    };

    const handleCreateHotel = async (newHotel) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token no encontrado");
            return;
        }

        try {
            const response = await fetch(`https://hotel-managament-back.onrender.com/api/hotels/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newHotel),
            });

            if (!response.ok) {
                throw new Error("No se pudo crear el hotel");
            }

            setSuccessMessage("Hotel creado correctamente");
            setIsCreateModalOpen(false);
            await fetchHotels();
        } catch (error) {
            setErrorMessage("Error al intentar crear el hotel");
            console.error("Error al crear el hotel:", error);
        }
    };

    const handleEditHotel = async (updateHotel) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token no encontrado");
        }

        try {
            const response = await fetch(
                `https://hotel-managament-back.onrender.com/api/hotels/update/${updateHotel.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateHotel),
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo actualizar el hotel");
            }

            setSuccessMessage("Hotel modificado correctamente");
            await fetchHotels();
            setSelectedHotel(null);
        } catch (error) {
            setErrorMessage("Error al intentar actualizar el hotel")
            console.error("Error al actualizar el hotel: ", error)
        }

    }

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
                <button
                    className={styles.addButton}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <Icon icon="gridicons:add-outline" width="30" height="30" />
                </button>
            </div>
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
                    onEdit={handleEditHotel}
                    onDelete={handleDeleteHotel}
                />
            )}
            {successMessage && <SuccessfulMessage message={successMessage} onClose={() => setSuccessMessage("")} />}
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage("")} />}
            {isCreateModalOpen && (
                <CreateHotel
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleCreateHotel}
                />
            )}
        </div>
    );
};

export default Hotels;
