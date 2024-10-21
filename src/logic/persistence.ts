import debug from 'debug';
import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const log = debug("persistence");

export async function appendToBackupFile(data: string) {
    try {
        const filePath = path.join(__dirname, 'backups.txt');

        await fs.appendFile(filePath, data + '\n');

        log(`Datos guardados en ${filePath}: ${data}`);
    } catch (error) {
        console.error("Error al guardar en backups.txt:", error);
    }
}


export async function clearBackupFile() {
    try {
        const filePath = path.join(__dirname, 'backups.txt');

        await fs.writeFile(filePath, '');

        log(`El archivo ${filePath} ha sido limpiado.`);
    } catch (error) {
        console.error("Error al limpiar backups.txt:", error);
    }
}

export async function printBackupFile() {
    try {
        const filePath = path.join(__dirname, 'backups.txt');

        const data = await fs.readFile(filePath, 'utf-8');

        log(`Contenido de ${filePath}:\n${data}`);
    } catch (error) {
        console.error("Error al leer backups.txt no hay backups");
    }
}
