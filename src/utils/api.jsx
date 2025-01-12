const API_URL = 'https://hotel-managament-back.onrender.com/api';

export const postRequest = async (url, data) => {
    const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};