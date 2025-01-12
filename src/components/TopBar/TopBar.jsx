import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./TopBar.module.css";

const TopBar = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const email = decodedToken.email;
                const role = decodedToken.role;

                const user = email.split("@")[0];

                setUserEmail(user);
                setUserRole(role);
            } catch (error) {
                console.error("Error al verificar el token", error);
            }
        }
    }, []);

    return (
        <div className={styles.topBar}>
            <span className={styles.userInfo}>Usuario: {userEmail}</span>
            <span className={styles.userRole}>Rol: {userRole}</span>
        </div>
    );
};

export default TopBar;
