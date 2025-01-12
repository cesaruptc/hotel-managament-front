import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Logout from "../../components/Logout/Logout.jsx";
import styles from "./AdminHome.module.css"
import TopBar from "../../components/TopBar/TopBar.jsx";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin.jsx";
import Hotels from "../../components/Hotels/Hotels.jsx";

const AdminHome = () => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        } else {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken.exp <= currentTime) {
                    // Si el token ha expirado, redirigir al login
                    navigate("/login");
                } else if (decodedToken.role === "admin") {
                    setLoading(false);
                } else if (decodedToken.role === "user") {
                    navigate("/user-home");
                }
            } catch (error) {
                console.error("Error al verificar el token", error);
                navigate("/login");
            }
        }
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        switch (content) {
            case "usuarios":
                return <div>Lista de usuarios</div>;
            case "hoteles":
                return <Hotels/>;
            case "reservas":
                return <div>Lista de reservas</div>;
            default:
                return <div>Selecciona una opción</div>;
        }
    };

    return (
        <div className={styles.homeContainer}>
            <TopBar />
            <div className={styles.left}>
                <MenuAdmin setContent={setContent}></MenuAdmin>
            </div>
            <div className={styles.mainContent}>
                {renderContent()}
            </div>
            <Logout />
        </div>
    );
};

export default AdminHome;
