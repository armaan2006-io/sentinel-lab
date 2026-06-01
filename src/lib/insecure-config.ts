import * as http from "http";
import { exec } from "child_process";

/**
 * ⚠️ VULNERABLE-BY-DESIGN — Training Lab
 * Flaw: Command Injection (High Severity)
 */
export const server = http.createServer((req, res) => {
    // Snyk will flag this! The URL is an untrusted "Source" 
    // flowing directly into 'exec' which is a dangerous "Sink".
    const userInput = req.url || "";
    
    exec("ping -c 4 " + userInput, (err, stdout) => {
        res.end(stdout);
    });
});
