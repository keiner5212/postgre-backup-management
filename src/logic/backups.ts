import { config } from "dotenv";
import { ChildProcessExecutor } from "../utils/commands-utils.js";
import { getDateTime } from "../utils/Time.js";
import { appendToBackupFile } from "./persistence.js";
config()
const executor = new ChildProcessExecutor();
export async function createBackup() {
    const docker_container = process.env.POSTGRES_DOCKER_CONTAINER
    const pg_user = process.env.POSTGRES_USER
    const pg_pass = process.env.POSTGRES_PASSWORD
    const db = process.env.POSTGRES_DB
    const backcupName = "backup_" + getDateTime().replace(" ", "_");

    await appendToBackupFile(backcupName);
    const command = `docker exec ${docker_container} bash -c "PGPASSWORD=${pg_pass} pg_dump -U ${pg_user} -d ${db} -f /tmp/${backcupName}.sql"`;

    await executor.startProcess(command, true);
}


export async function restoreBackup(backupName: string) {
    if (!backupName || backupName === "") return
    const docker_container = process.env.POSTGRES_DOCKER_CONTAINER;
    const pg_user = process.env.POSTGRES_USER;
    const pg_pass = process.env.POSTGRES_PASSWORD;
    const db = process.env.POSTGRES_DB;

    const backupFilePath = `/tmp/${backupName}.sql`;

    const command = `docker exec ${docker_container} bash -c "PGPASSWORD=${pg_pass} psql -U ${pg_user} -d ${db} -f ${backupFilePath}"`;

    console.log("Comando a ejecutar para restaurar:", command); // Depuración

    await executor.startProcess(command, true);
}