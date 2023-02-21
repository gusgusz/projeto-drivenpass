import User from "prisma";

type UserInput = Omit<User, "id">;

export {UserInput};
