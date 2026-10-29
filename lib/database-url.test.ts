import { describe, expect, it } from "vitest";
import { isUsableDatabaseUrl, normalizeDatabaseUrl, runtimeDatabaseUrl } from "./database-url";

describe("normalizeDatabaseUrl", () => {
  it("strips quotes and a pasted variable name", () => {
    expect(normalizeDatabaseUrl('"postgres://user:pass@db.prisma.io:5432/postgres"')).toBe(
      "postgres://user:pass@db.prisma.io:5432/postgres",
    );
    expect(normalizeDatabaseUrl('DATABASE_URL="postgres://user:pass@db.prisma.io:5432/postgres"')).toBe(
      "postgres://user:pass@db.prisma.io:5432/postgres",
    );
  });

  it("leaves a real postgres URL unchanged", () => {
    const url = "postgres://user:pass@db.prisma.io:5432/postgres?sslmode=require";
    expect(normalizeDatabaseUrl(url)).toBe(url);
    expect(isUsableDatabaseUrl(url)).toBe(true);
    expect(isUsableDatabaseUrl("DATABASE_URL=postgres://db")).toBe(false);
  });

  it("uses the HTTP Prisma Postgres URL for the running app", () => {
    const previous = {
      DATABASE_URL: process.env.DATABASE_URL,
      PRISMA_DATABASE_URL: process.env.PRISMA_DATABASE_URL,
    };
    process.env.DATABASE_URL = "postgres://user:pass@db.prisma.io:5432/postgres";
    process.env.PRISMA_DATABASE_URL = "prisma+postgres://accelerate.prisma-data.net/?api_key=test";
    expect(runtimeDatabaseUrl()).toBe("prisma+postgres://accelerate.prisma-data.net/?api_key=test");
    process.env.DATABASE_URL = previous.DATABASE_URL;
    process.env.PRISMA_DATABASE_URL = previous.PRISMA_DATABASE_URL;
  });
});
