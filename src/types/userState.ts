import { User } from "./user";

export interface UserState {
    currentUser: User | null;
    isLoggedIn: boolean;
}
