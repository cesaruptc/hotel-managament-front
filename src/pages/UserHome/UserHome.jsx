import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Logout from "../../components/Logout/Logout.jsx";

const UserHome = () => {
    const [loading, setLoading] = useState(true);
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

    return (
        <div>
            <h1>Bienvenido, Usuario</h1>
            <Logout />
        </div>
    );
};

export default UserHome;
