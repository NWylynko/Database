import randomstring from "randomstring";
import run from "./utils/run";

type Databases = "mysql" | "mongo";

const Database = async (type: Databases) => {
  await checkPermissions();
  const databaseClient = await createDatabase(type)();

  return databaseClient;
};

// export default Database;

const checkPermissions = async () => {
  try {
    await run(`which`, [`docker`]);
    console.log(`docker is installed`);
  } catch (error) {
    console.error(`docker not installed`);
  }

  try {
    await run(`docker`, [`info`]);
    console.log(`have permission to use docker`);
  } catch (error) {
    console.error(`don't have permission to use docker`);
  }
};

const createDatabase = (type: Databases) => {
  console.log(`type: ${type}`);
  return {
    mysql: createMySQLDatabase,
    mongo: createMongoDatabase,
  }[type];
};

const createMySQLDatabase = async () => {
  const password = randomstring.generate();
  console.log(`password: ${password}`);
  const logs = await run("docker", [
    "create",
    "-e",
    "MYSQL_USER=node",
    "-e",
    `MYSQL_PASSWORD=${password}`,
    "-e",
    "MYSQL_DATABASE=node_app",
    "mysql:latest",
  ]);
  const containerId = logs[logs.length - 1]
  console.log(`created: ${containerId}`);
  return;
};

const createMongoDatabase = async () => {};

Database("mysql");
