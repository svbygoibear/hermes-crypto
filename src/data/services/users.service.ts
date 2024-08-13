import type { AxiosInstance } from "axios";
import { User, UserCreate } from "../../types/user";
import { Vote, VoteCreate } from "../../types/vote";
import { ApiResponse } from "../../types/apiResponse";
import { CoinResult } from "../../types/coinResult";

type UsersApiService = {
    fetchCurrentBtcPrice: () => Promise<ApiResponse<CoinResult>>;
    fetchUserById: (id: string) => Promise<ApiResponse<User>>;
    fetchUserVotesById: (id: string) => Promise<ApiResponse<Vote[]>>;
    fetchUserVoteResultById: (id: string) => Promise<ApiResponse<Vote>>;
    createUser: (user: UserCreate) => Promise<ApiResponse<User>>;
    createVote: (vote: VoteCreate, id: string) => Promise<ApiResponse<Vote>>;
};

// Create a function that returns our service
export const createUsersApiService = (
    axiosInstance: AxiosInstance,
    baseUrl: string
): UsersApiService => {
    return {
        // Fetch a user by ID
        fetchCurrentBtcPrice: async (): Promise<ApiResponse<CoinResult>> => {
            try {
                const response = await axiosInstance.get<CoinResult>(`${baseUrl}/coins/btc`);
                return response;
            } catch (error) {
                console.error("Error fetching user:", error);
                throw error;
            }
        },

        // Fetch a user by ID
        fetchUserById: async (id: string): Promise<ApiResponse<User>> => {
            try {
                const response = await axiosInstance.get<User>(`${baseUrl}/users/${id}`);
                return response;
            } catch (error) {
                console.error("Error fetching user:", error);
                throw error;
            }
        },

        // Fetch all the user votes for a given user
        fetchUserVotesById: async (id: string): Promise<ApiResponse<Vote[]>> => {
            try {
                const response = await axiosInstance.get<Vote[]>(`${baseUrl}/users/${id}/votes`);
                return response;
            } catch (error) {
                console.error("Error fetching user votes:", error);
                throw error;
            }
        },

        // Fetch user vote result for their last vote
        fetchUserVoteResultById: async (id: string): Promise<ApiResponse<Vote>> => {
            try {
                const response = await axiosInstance.get<Vote>(
                    `${baseUrl}/users/${id}/votes/result`
                );
                return response;
            } catch (error) {
                console.error("Error fetching user vote result:", error);
                throw error;
            }
        },

        // Create a new user
        createUser: async (user: UserCreate): Promise<ApiResponse<User>> => {
            try {
                const response = await axiosInstance.post<User>(`${baseUrl}/users`, user);
                return response;
            } catch (error) {
                console.error("Error creating user:", error);
                throw error;
            }
        },

        // Create a new vote entry for a user
        createVote: async (vote: VoteCreate, id: string): Promise<ApiResponse<Vote>> => {
            try {
                const response = await axiosInstance.post<Vote>(
                    `${baseUrl}/users/${id}/vote`,
                    vote
                );
                return response;
            } catch (error) {
                console.error("Error creating vote:", error);
                throw error;
            }
        }
    };
};
