import { describe, expect, it } from "vitest";
import { isUsableDatabaseUrl, normalizeDatabaseUrl } from "./database-url";

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
    expect(isUsableDatabaseUrl('DATABASE_URL=postgres://db')).toBe(false);
  });
});
