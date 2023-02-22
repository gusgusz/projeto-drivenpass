import {User, Credential} from "prisma";


type UserInput = Omit<User, "id">;
type CredentialInsert = Omit<Credential, "id">;
type CredentialInput = Omit<CredentialInsert, "userId">;

export {UserInput, CredentialInput, CredentialInsert};
