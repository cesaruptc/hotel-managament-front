import { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./MenuAdmin.module.css";

const MenuAdmin = ({ setContent }) => {
    const [activeSection, setActiveSection] = useState("");
    const handleButtonClick = (section) => {
        setContent(section);
        setActiveSection(section);
    };

    return (
        <div className={styles.navContainer}>
            <button onClick={() => handleButtonClick("usuarios")}
                    className={`${styles.navButton} ${activeSection === "usuarios" ? styles.active : ""}`}>
                <Icon icon="majesticons:users-line" className={styles.icon} />
                Usuarios
            </button>
            <button onClick={() => handleButtonClick("hoteles")}
                    className={`${styles.navButton} ${activeSection === "hoteles" ? styles.active : ""}`}>
                <Icon icon="material-symbols:hotel-rounded" className={styles.icon} />
                Hoteles
            </button>
            <button onClick={() => handleButtonClick("reservas")}
                    className={`${styles.navButton} ${activeSection === "reservas" ? styles.active : ""}`}>
                <Icon icon="akar-icons:schedule" className={styles.icon} />
                Reservas
            </button>
        </div>
    );
};

export default MenuAdmin;
