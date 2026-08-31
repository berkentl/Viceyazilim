import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Client } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL tanımlı değil.");
}

const migrationPath = resolve("db/migrations/001_lead_crm.sql");
const migration = await readFile(migrationPath, "utf8");
const client = new Client(databaseUrl);

await client.connect();
try {
  await client.query(migration);
  console.log("Lead CRM migration completed.");
} finally {
  await client.end();
}
