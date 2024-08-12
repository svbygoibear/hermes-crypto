import { User, UserCreate } from "../types/user";
import { Vote, VoteCreate } from "../types/vote";
import {
    fetchUserById,
    fetchUserVotesById,
    fetchUserVoteResultById,
    createUser,
    createVote
} from "./services/users.service";

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const response = await fetchUserById(id);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};

export const getUserVotesById = async (id: string): Promise<Vote[] | null> => {
    try {
        const response = await fetchUserVotesById(id);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};

export const getUserVoteResultById = async (id: string): Promise<Vote | null> => {
    try {
        const response = await fetchUserVoteResultById(id);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};

export const addUser = async (user: UserCreate): Promise<User | null> => {
    try {
        const response = await createUser(user);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};

export const addUserVote = async (vote: VoteCreate, userId: string): Promise<Vote | null> => {
    try {
        const response = await createVote(vote, userId);
        return response.data;
    } catch (error) {
        // Handle error...
        return null;
    }
};
