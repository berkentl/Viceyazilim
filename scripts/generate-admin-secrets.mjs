import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 14) {
  throw new Error(
    "Kullanım: npm run admin:credentials -- 'en-az-14-karakter-sifre'",
  );
}

const salt = randomBytes(18).toString("base64url");
const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });

console.log(`ADMIN_PASSWORD_HASH=scrypt:16384:8:1:${salt}:${hash.toString("base64url")}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(48).toString("base64url")}`);
console.log(`SUBMISSION_HASH_SECRET=${randomBytes(48).toString("base64url")}`);
