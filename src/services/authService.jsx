export const login = async (email, password) => {
    try {
        const requestBody = {
            email: email,
            password: password
        };

        const response = await fetch('https://hotel-managament-back.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.log("Error en la solicitud:", error);
        throw new Error(error.message || 'Hubo un problema con la solicitud');
    }
};