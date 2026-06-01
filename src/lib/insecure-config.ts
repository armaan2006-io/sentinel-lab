import { exec } from "child_process";

/**
 * ⚠️ VULNERABLE-BY-DESIGN — Training Lab
 * Flaw: Hardcoded secrets in source.
 */

// Hardcoded Google Maps API key (mock)
export const GMAPS_API_KEY = "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY";

// Hardcoded AWS credentials (mock)
export const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
export const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// --- NEW CHANGE TO TRIGGER AI FIX ---
// Command Injection Vulnerability (High Severity)
export function pingServer(host: string) {
    exec("ping -c 4 " + host, (err, stdout) => {
        console.log(stdout);
    });
}
