import {User, Credential, Network} from "prisma";


type UserInput = Omit<User, "id">;
type CredentialInsert = Omit<Credential, "id">;
type CredentialInput = Omit<CredentialInsert, "userId">;
type WifiInsert = Omit<Network, "id">;
type WifiInput = Omit<WifiInsert, "userId">;

export {UserInput, CredentialInput, CredentialInsert, WifiInput, WifiInsert};
