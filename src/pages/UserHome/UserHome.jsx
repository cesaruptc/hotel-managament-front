import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Logout from "../../components/Logout/Logout.jsx";
import Users from "../../components/Users/Users.jsx";
import Hotels from "../../components/Hotels/Hotels.jsx";
import Reservations from "../../components/Reservations/Reservations.jsx";
import styles from "../AdminHome/AdminHome.module.css";
import TopBar from "../../components/TopBar/TopBar.jsx";
import MenuAdmin from "../../components/MenuAdmin/MenuAdmin.jsx";
import MenuUser from "../../components/MenuUser/MenuUser.jsx";
import UserHotels from "../../components/UserHotels/UserHotels.jsx";

const UserHome = () => {
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
                    navigate("/login");
                } else if (decodedToken.role === "user") {
                    setLoading(false);
                } else {
                    navigate("/admin-home");
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
            case "hoteles":
                return <UserHotels/>;
            case "reservas":
                return <Reservations/>
            default:
                return (
                    <div className={styles.defaultContent}>
                        <div>Selecciona una opción</div>
                        <div className={styles.imageBackground}></div>
                    </div>
                )
        }
    };

    return (
        <div className={styles.homeContainer}>
            <TopBar />
            <div className={styles.left}>
                <MenuUser setContent={setContent}></MenuUser>
            </div>
            <div className={styles.mainContent}>
                {renderContent()}
            </div>
            <Logout />
        </div>
    );
};

export default UserHome;
