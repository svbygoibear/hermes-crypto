import axios from "axios";
import { User, UserCreate } from "../types/user";
import { Vote, VoteCreate } from "../types/vote";
import { createUsersApiService } from "./services/users.service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// Custom axios instance > can be configured with headers in future
const axiosInstance = axios.create({
    timeout: 10000,
    withCredentials: false,
    baseURL: API_BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

// Create the API service
const apiService = createUsersApiService(axiosInstance, API_BASE_URL);

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const response = await apiService.fetchUserById(id);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};

export const getUserVotesById = async (id: string): Promise<Vote[] | null> => {
    try {
        const response = await apiService.fetchUserVotesById(id);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};

export const getUserVoteResultById = async (id: string): Promise<Vote | null> => {
    try {
        const response = await apiService.fetchUserVoteResultById(id);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};

export const addUser = async (user: UserCreate): Promise<User | null> => {
    try {
        const response = await apiService.createUser(user);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};

export const addUserVote = async (vote: VoteCreate, userId: string): Promise<Vote | null> => {
    try {
        const response = await apiService.createVote(vote, userId);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};
