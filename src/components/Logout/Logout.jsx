import { useNavigate } from "react-router-dom";
import {Icon} from "@iconify/react";
import styles from "./Logout.module.css";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Sesión cerrada")
        navigate("/login");
    };

    return (
        <div>
            <button onClick={handleLogout} className={styles.logoutButton}>
                <Icon icon="majesticons:logout-line" width={40} height={40} />
            </button>
        </div>
    );
};

export default Logout;
