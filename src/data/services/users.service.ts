import axios from "axios";
import { User, UserCreate } from "../../types/user";
import { Vote, VoteCreate } from "../../types/vote";
import { ApiResponse } from "../../types/apiResponse";

const API_BASE_URL = "";

// Fetch all the user votes for a given user
export const fetchUserById = async (id: string): Promise<ApiResponse<User>> => {
    try {
        const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
        return response; // This will include the response data, status, and other information
    } catch (error) {
        // Handle or throw the error as needed
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Fetch all the user votes for a given user
export const fetchUserVotesById = async (id: string): Promise<ApiResponse<Vote[]>> => {
    try {
        const response = await axios.get<Vote[]>(`${API_BASE_URL}/users/${id}/votes`);
        return response; // This will include the response data, status, and other information
    } catch (error) {
        // Handle or throw the error as needed
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Fetch user vote result for their last vote
export const fetchUserVoteResultById = async (id: string): Promise<ApiResponse<Vote>> => {
    try {
        const response = await axios.get<Vote>(`${API_BASE_URL}/users/${id}/votes/result`);
        return response; // This will include the response data, status, and other information
    } catch (error) {
        // Handle or throw the error as needed
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Create a new user
export const createUser = async (user: UserCreate): Promise<ApiResponse<User>> => {
    try {
        const response = await axios.post<User>(`${API_BASE_URL}/users`, user);
        return response; // This will include the response data, status, and other information
    } catch (error) {
        // Handle or throw the error as needed
        console.error("Error creating user:", error);
        throw error;
    }
};

// Create a new vote entry for a user
export const createVote = async (vote: VoteCreate, id: string): Promise<ApiResponse<Vote>> => {
    try {
        const response = await axios.post<Vote>(`${API_BASE_URL}/users/${id}/vote`, vote);
        return response; // This will include the response data, status, and other information
    } catch (error) {
        // Handle or throw the error as needed
        console.error("Error creating user:", error);
        throw error;
    }
};

// // Create a new user in the API
// export const createUser = async user => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/users`, user);
//         return response; // This will include the response data, status, and other information
//     } catch (error) {
//         // Handle or throw the error as needed
//         console.error("Error creating user:", error);
//         throw error;
//     }
// };
