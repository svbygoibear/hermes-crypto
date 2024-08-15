import { faker } from "@faker-js/faker";
import { UserCreate } from "../types/user";
import { v4 as uuidv4 } from 'uuid';

export const createFakeUser = (): UserCreate => {
    return {
        name: `Anon ${faker.word.adjective(10)}`,
        email: `${uuidv4()}-${faker.internet.email().toLocaleLowerCase()}`
    };
};
