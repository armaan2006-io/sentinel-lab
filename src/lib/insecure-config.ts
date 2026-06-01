import express from 'express';
import { exec } from 'child_process';
import * as fs from 'fs';

const app = express();

/**
 * ⚠️ VULNERABLE-BY-DESIGN — Training Lab
 * Multiple High-Severity Vulnerabilities for Snyk Code PR Scan
 */

// 1. Command Injection (High Severity)
app.get('/api/ping', (req, res) => {
    const target = req.query.target as string;
    // Direct concatenation into a system shell command
    exec(`ping -c 3 ${target}`, (err, stdout) => {
        res.send(stdout);
    });
});

// 2. Path Traversal / Arbitrary File Read (High Severity)
app.get('/api/view', (req, res) => {
    const filename = req.query.file as string;
    // Direct usage of user input in file system operations without sanitization
    const safeFilename = path.basename(filename);
    fs.readFile(`/var/www/public/${safeFilename}`, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('File not found');
        } else {
            res.send(data);
        }
    });
});

// 3. Insecure Eval / Code Injection (High Severity)
app.get('/api/calculate', (req, res) => {
    const expression = req.query.expr as string;
    // Running arbitrary string input directly as JavaScript
    const result = eval(expression);
    res.json({ result });
});

export default app;
