import run from "./utils/run";

// export default Database;
export async function checkPermissions() {
  try {
    await run(`which`, [`docker`]);
    console.log(`docker is installed`);
  } catch (error) {
    throw new Error(`docker not installed`);
  }

  try {
    await run(`docker`, [`info`]);
    console.log(`have permission to use docker`);
  } catch (error) {
    throw new Error(`don't have permission to use docker`);
  }
}
