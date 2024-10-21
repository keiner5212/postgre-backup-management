import { createInterface } from "readline";
import { createBackup, restoreBackup } from "./logic/backups.js";
import debug from "debug";
import { getDateTime } from "./utils/Time.js";
import { config } from "dotenv";
import { exit } from "process";
import { printBackupFile } from "./logic/persistence.js";

config()
debug.enable("*");

const log = debug("index");

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

let loop = false;

const mostrarMenu = () => {
    log("\nMenu:");
    log("1. Empezar a crear backups");
    log("2. Restaurar desde backups");
    log("3. Salir");

    rl.question("\nSelecciona una opción: ", (respuesta) => {
        if (respuesta === "1") {
            loop = true;
            iniciarLoop();
        } else if (respuesta === "2") {
            log("Restaurando desde backups...");
            printBackupFile().then(() => {
                rl.question("Introduce el nombre del backup que deseas restaurar: ", (backupName) => {
                    restoreBackup(backupName ?? "").then(() => {
                        mostrarMenu();
                    });
                });
            })

        } else if (respuesta === "3") {
            log("Saliendo...");
            exit(0);
        } else {
            log("Opción no válida");
            mostrarMenu();
        }
    });
};

//backup log

const backupLog = debug("backup");

const iniciarLoop = () => {
    log("\nPresiona \"Enter\" para dejar de generar backups...");

    const crearBackups = setInterval(async () => {
        if (!loop) {
            clearInterval(crearBackups);
        } else {
            await createBackup();
            backupLog("Backup creado con éxito (" + getDateTime() + ")");
        }
    }, parseFloat(process.env.BACKUP_DELAY || "0") * 60 * 60 * 1000);

    process.stdin.once('data', () => {
        loop = false;
        mostrarMenu();

    });
};

log("Se creara un backup cada: " + parseFloat(process.env.BACKUP_DELAY || "0") + " horas");
mostrarMenu();

