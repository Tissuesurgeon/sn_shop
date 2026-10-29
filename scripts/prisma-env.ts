import { spawn } from "node:child_process";
import { loadEnvFile } from "../lib/load-env";

async function main() {
  loadEnvFile();
  const { migrationDatabaseUrl } = await import("../lib/database-url");
  const command = process.argv.slice(2);
if (command.length === 0) {
  console.error("Usage: tsx scripts/prisma-env.ts <command...>");
  process.exit(1);
}

const url = migrationDatabaseUrl();
if (!url) {
  const scheme = (process.env.DATABASE_URL ?? "").split(":")[0] || "(empty)";
  console.error(
    `Prisma needs a postgres:// URL. DATABASE_URL scheme is "${scheme}". Paste only the connection string, without quotes or a DATABASE_URL= prefix. Use the direct db.prisma.io URL for DIRECT_URL.`,
  );
  process.exit(1);
}

const child = spawn(command[0], command.slice(1), {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: url, DIRECT_URL: url },
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
}

main();
