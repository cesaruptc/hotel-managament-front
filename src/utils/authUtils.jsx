import jwt_decode from 'jwt-decode';

export const getUserInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log("No token found in localStorage");
        return null;
    }

    try {
        const decoded = jwt_decode(token);
        return decoded; // Retorna el payload decodificado
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};

export const checkUserRole = () => {
    const userInfo = getUserInfo();
    if (!userInfo) return;

    const { role } = userInfo;

    // Lógica para verificar el rol
    if (role === 'admin') {
        console.log("El usuario es un administrador.");
    } else if (role === 'user') {
        console.log("El usuario es un usuario regular.");
    } else {
        console.log("Rol desconocido.");
    }
};
