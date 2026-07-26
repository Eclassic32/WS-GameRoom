import { type Socket, type Server } from 'socket.io';
import express from 'express';

export type User = {
    id: string;
    name: string;
    image: string | null;
};

export const placeholderUser = (id: number): User => ({
    id: `user${id}`,
    name: `User ${id}`,
    image: `https://example.com/user${id}.png`
});

const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:3000';
const DISCORD_API_URL = 'https://discord.com/api/v10';
const DISCORD_APP_ID = process.env.DISCORD_APP_ID;
const DISCORD_APP_SECRET = process.env.DISCORD_APP_SECRET;

export function setupAuthExpress(app: express.Application) {
    app.get('/api/auth/discord', (req, res) => {
        const redirectUri = `${SERVER_BASE_URL}/api/auth/discord/callback`;
        const discordAuthUrl = `${DISCORD_API_URL}/oauth2/authorize?client_id=${DISCORD_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;
        res.redirect(discordAuthUrl);
    });

    app.get('/api/auth/discord/callback', async (req, res) => {
        const code = req.query.code as string;
        const redirectUri = `${SERVER_BASE_URL}/api/auth/discord/callback`;


    });

}

export function setupAuthSocket(socket: Socket, _io: Server) {
    
}