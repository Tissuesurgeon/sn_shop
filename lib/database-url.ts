const KEYS = ["DATABASE_URL", "DIRECT_URL", "POSTGRES_URL", "POSTGRES_URL_NON_POOLING", "PRISMA_DATABASE_URL"] as const;

/** Vercel values are often pasted with quotes or a `DATABASE_URL=` prefix. Prisma then rejects the scheme. */
export function normalizeDatabaseUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  let url = value.replace(/^\uFEFF/, "").trim();
  url = stripQuotes(url);
  const prefixed = url.match(/^(?:DATABASE_URL|DIRECT_URL|POSTGRES_URL|POSTGRES_URL_NON_POOLING|PRISMA_DATABASE_URL)\s*=\s*([\s\S]+)$/);
  if (prefixed) url = stripQuotes(prefixed[1].trim());
  return url || undefined;
}

function stripQuotes(value: string): string {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1).trim();
  }
  return value;
}

export function isUsableDatabaseUrl(value: string): boolean {
  return (
    value.startsWith("postgres://") ||
    value.startsWith("postgresql://") ||
    value.startsWith("prisma+postgres://") ||
    value.startsWith("prisma://")
  );
}

export function databaseUrlCandidates(): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const key of KEYS) {
    const url = normalizeDatabaseUrl(process.env[key]);
    if (!url || !isUsableDatabaseUrl(url) || seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
  }
  return urls;
}

/** Serverless runtimes cannot open db.prisma.io:5432. Prefer the HTTP Prisma Postgres URL. */
export function runtimeDatabaseUrl(): string | undefined {
  const urls = databaseUrlCandidates();
  return (
    urls.find((url) => url.startsWith("prisma+postgres://") || url.startsWith("prisma://")) ??
    urls.find((url) => url.startsWith("postgres://") || url.startsWith("postgresql://"))
  );
}

export function migrationDatabaseUrl(): string | undefined {
  return runtimeDatabaseUrl();
}

export function applyDatabaseEnv(): void {
  const databaseUrl = runtimeDatabaseUrl();
  const directUrl = migrationDatabaseUrl();
  if (databaseUrl) process.env.DATABASE_URL = databaseUrl;
  if (directUrl) process.env.DIRECT_URL = directUrl;
}

applyDatabaseEnv();
