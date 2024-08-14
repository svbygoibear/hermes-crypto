import { faker } from "@faker-js/faker";
import { UserCreate } from "../types/user";

export const createFakeUser = (): UserCreate => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email().toLocaleLowerCase()
    };
};
