import { generate as generatePassword } from "randomstring";
import run from "./utils/run";
import { DatabaseCredentials } from "./index";
import { promisify } from "util";

export async function createMySQLDatabase(credentials: DatabaseCredentials) {
  const rootPassword = generatePassword();
  console.log({ credentials, rootPassword });
  const logs = await run("docker", [
    "run",
    "-e",
    `MYSQL_ROOT_PASSWORD=${rootPassword}`,
    "-e",
    `MYSQL_USER=${credentials.username}`,
    "-e",
    `MYSQL_PASSWORD=${credentials.password}`,
    "-e",
    `MYSQL_DATABASE=${credentials.database}`,
    "-p",
    "3306:3306",
    "-d",
    "mysql:latest",
  ]);
  const containerId = logs[logs.length - 1];
  console.log(`created: ${containerId}`);

  const mysql = await import("mysql");
  const connection = mysql.createConnection({
    host: "localhost",
    user: credentials.username,
    password: credentials.password,
    database: credentials.database,
  });

  await promisify(connection.connect)();

  const close = async () => {
    await promisify(connection.end)();
    await run("docker", ["stop", containerId]);
    await run("docker", ["rm", containerId]);
  };

  return { db: connection, close };
}
