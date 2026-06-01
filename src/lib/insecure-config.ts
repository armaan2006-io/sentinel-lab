/**
 * ⚠️ VULNERABLE-BY-DESIGN — Training Lab
 * Flaw: Hardcoded secrets in source.
 * A real scanner (gitleaks, trufflehog, Lovable security scan) should flag these.
 */

// Hardcoded Google Maps API key (mock)
export const GMAPS_API_KEY = "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY";

// Hardcoded AWS credentials (mock)
export const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
export const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// Hardcoded JWT signing secret (mock)
export const JWT_SECRET = "super-secret-jwt-key-do-not-commit-12345";

// Hardcoded Stripe live key (mock)
export const STRIPE_SECRET_KEY = "sk_live_51HVxYzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

// Mock outdated dependency reference
// TODO: still pinned to lodash@4.17.4 (CVE-2019-10744 prototype pollution) — upgrade pending Q3
// TODO: using event-stream@3.3.6 (known malicious version, CVE-2018-1000620)
// TODO: jquery@2.1.4 loaded via CDN — multiple XSS CVEs unpatched
export const LEGACY_DEPS = ["lodash@4.17.4", "event-stream@3.3.6", "jquery@2.1.4"];

// Hardcoded SendGrid API Key (mock)
export const SENDGRID_API_KEY = "SG.vulnerable_test_key_1234567890abcdefghijklmnopqrstuvwxyz";

// --- NEW CHANGE TO TRIGGER SNYK PR SCAN ---
// Hardcoded Slack Token (mock)
export const SLACK_TOKEN = "xoxb-vulnerable-test-token-12345";
// Hardcoded GitHub Personal Access Token (mock)
export const GITHUB_PAT = "ghp_vulnerable_test_token_1234567890abcdefghijklmnopqrstuvwxyz";
