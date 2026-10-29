import { spawn } from "node:child_process";
import { loadEnvFile } from "../lib/load-env";

loadEnvFile();

async function main() {
  const { prisma } = await import("../lib/prisma");
  try {
    const count = await prisma.product.count();
    if (count > 0) {
      console.log(`Skipping seed: ${count} products already in the database.`);
      return;
    }
    await new Promise<void>((resolve, reject) => {
      const child = spawn("pnpm", ["exec", "prisma", "db", "seed"], { stdio: "inherit" });
      child.on("exit", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`prisma db seed exited ${code ?? "unknown"}`));
      });
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
