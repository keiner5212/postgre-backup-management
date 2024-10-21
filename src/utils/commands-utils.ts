import { spawn } from "child_process";
import debug from "debug";

export class ChildProcessExecutor {
    private log: debug.Debugger;

    constructor(namespace: string = "utils:child-process") {
        this.log = debug(namespace);
    }

    async startProcess(command: string, showResult: boolean = true): Promise<string> {
        try {
            this.log("Executing command:", command);
            const childProcess = spawn(command, { shell: true });

            if (!childProcess?.stdout || !childProcess?.stderr) {
                return 'Error executing the command';
            }

            let result = '';
            childProcess.stdout.on('data', (data) => {
                result += data.toString();
            }); 
            childProcess.stderr.on('data', (data) => {
                this.log("Error stderr:", data.toString());
            });



            await new Promise((resolve) => {
                childProcess.on('close', (code) => {
                    if (code === 0) {
                        if (showResult) {
                            this.log("Result:\n" + result, "\n");
                        }
                        resolve(result);
                    } else {
                        this.log("Error:", 'Error executing the command, exit code: ' + code);
                        resolve('Error executing the command, exit code: ' + code);
                    }
                });
            });

            return result;
        } catch (error) {
            this.log("Error:", error);
            return 'Error executing the command';
        }
    }
}