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

export const currentUser = placeholderUser(20); // Placeholder for the current user