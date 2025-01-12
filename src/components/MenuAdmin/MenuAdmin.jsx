import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./MenuAdmin.module.css";

const MenuAdmin = ({ setContent }) => {
    const handleButtonClick = (section) => {
        setContent(section);
    };

    return (
        <div className={styles.navContainer}>
            <button onClick={() => handleButtonClick("usuarios")} className={styles.navButton}>
                <Icon icon="majesticons:users-line" className={styles.icon} />
                Usuarios
            </button>
            <button onClick={() => handleButtonClick("hoteles")} className={styles.navButton}>
                <Icon icon="material-symbols:hotel-rounded" className={styles.icon} />
                Hoteles
            </button>
            <button onClick={() => handleButtonClick("reservas")} className={styles.navButton}>
                <Icon icon="majesticons:reservation-line" className={styles.icon} />
                Reservas
            </button>
        </div>
    );
};

export default MenuAdmin;
