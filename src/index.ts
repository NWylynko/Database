import { generate as generatePassword } from "randomstring";
import { checkPermissions } from "./checkPermissions";
import { createDatabase } from "./createDatabase";

export type Databases = "mysql";

const Database = async (type: Databases) => {

  const credentials: DatabaseCredentials = {
    username: "node",
    password: generatePassword(),
    database: "node_app"
  }

  await checkPermissions();
  const databaseClient = await createDatabase(type)(credentials);

  return databaseClient;
};

export interface DatabaseCredentials {
  username: string;
  password: string;
  database: string;
}

export const createMongoDatabase = async () => {};

export default Database
