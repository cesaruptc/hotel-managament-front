import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Sesión cerrada")
        navigate("/login");
    };

    return (
        <div>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Logout;
