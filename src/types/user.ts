import { Vote } from "./vote";

export interface User {
    id: string;
    name: string;
    email: string;
    score: number;
    votes: Vote[];
}

export interface UserCreate {
    name: string;
    email: string;
}
