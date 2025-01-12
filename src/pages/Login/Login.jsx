import {useEffect, useState} from "react";
import styles from  './Login.module.css'
import useAuth from "../../hooks/useAuth.jsx";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { handleLogin, errorMessage } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp > currentTime && decodedToken.role === "admin") {
                    navigate("/admin-home");
                }
                else if (decodedToken.exp > currentTime && decodedToken.role === "user") {
                    navigate("/user-home");
                }
            } catch (error) {
                console.error("Error al verificar el token", error);
            }
        }
    }, [navigate]);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario enviado: ", formData);
        try {
            await handleLogin(formData.email, formData.password);
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp > currentTime && decodedToken.role === "admin") {
                    navigate("/admin-home");
                } else if (decodedToken.exp > currentTime && decodedToken.role === "user") {
                    navigate("/user-home");
                }
            }
        } catch (error) {
            console.error("Error al hacer login", error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Hotel Management</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <label htmlFor="password" className={styles.label}>Contraseña</label>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    <button type="submit" className={styles.button}>
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
