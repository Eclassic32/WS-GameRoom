export const API_BASE_URL = 'http://localhost:3000/api';
export { getHealth, getRoomsList };

async function getHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
};

async function getRoomsList() {
    const response = await fetch(`${API_BASE_URL}/rooms`);
    return response.json();
};

// @ts-expect-error
window.API = { getHealth, getRoomsList };