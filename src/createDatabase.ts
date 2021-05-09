import { Databases, createMongoDatabase } from "./index";
import { createMySQLDatabase } from "./createMySQLDatabase";

export function createDatabase(type: Databases) {
  console.log(`type: ${type}`);
  return {
    mysql: createMySQLDatabase,
    mongo: createMongoDatabase,
  }[type];
}
