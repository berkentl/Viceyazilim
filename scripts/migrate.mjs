import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { Client } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL tanımlı değil.");
}

const migrationsDirectory = resolve("db/migrations");
const migrationFiles = (await readdir(migrationsDirectory))
  .filter((file) => /^\d+.*\.sql$/.test(file))
  .sort();
const client = new Client(databaseUrl);

await client.connect();
try {
  for (const file of migrationFiles) {
    const migration = await readFile(resolve(migrationsDirectory, file), "utf8");
    await client.query("BEGIN");
    try {
      await client.query(migration);
      await client.query("COMMIT");
      console.log(`${file} completed.`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  }
} finally {
  await client.end();
}
