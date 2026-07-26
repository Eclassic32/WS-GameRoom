import type { Room } from "@/types/RoomType";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export type APIError = { error: string };

async function getHealth(): Promise<{ status: string }> {
    const response = await fetch(`${BASE_URL}/health`);
    return response.json();
};

async function getRoomsList(): Promise<Room[]> {
    const response = await fetch(`${BASE_URL}/rooms`);
    return response.json();
};

async function getRoomById(id: string): Promise<Room | APIError> {
    const response = await fetch(`${BASE_URL}/rooms/${id}`);
    return response.json();
}

// @ts-expect-error
window.API = { getHealth, getRoomsList, getRoomById };
export { getHealth, getRoomsList, getRoomById };
