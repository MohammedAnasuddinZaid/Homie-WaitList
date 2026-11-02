/**
 * Waitlist storage — multi-backend, auto-selected by environment.
 *
 *   1. Postgres (cloud, 24/7)  -> set POSTGRES_URL or DATABASE_URL
 *      Free always-on options: Neon (neon.tech), Supabase, Vercel Postgres.
 *   2. MySQL (your laptop DB)   -> set MYSQL_HOST / MYSQL_USER / MYSQL_PASSWORD / MYSQL_DATABASE
 *   3. SQLite (local dev)       -> default, file at ./data/waitlist.db
 *
 * For a public 24/7 site use Postgres (Neon free tier takes ~2 min to set up).
 * A laptop MySQL is only reachable while the laptop is on and port-forwarded.
 */

type DbClient = {
  run: (sql: string, params: (string | null)[]) => Promise<{ lastId?: number }>;
  all: (sql: string) => Promise<unknown[]>;
  count: (sql: string) => Promise<number>;
};

const USE_POSTGRES = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);
const USE_MYSQL = Boolean(
  !USE_POSTGRES && (process.env.MYSQL_HOST || process.env.MYSQL_DATABASE || process.env.MYSQL_URL)
);

async function createTable(client: DbClient, isPostgres: boolean, isMysql: boolean): Promise<void> {
  const idCol = isPostgres
    ? "BIGSERIAL PRIMARY KEY"
    : isMysql
    ? "BIGINT AUTO_INCREMENT PRIMARY KEY"
    : "INTEGER PRIMARY KEY AUTOINCREMENT";
  await client.run(
    `CREATE TABLE IF NOT EXISTS waitlist (
      id ${idCol},
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    []
  );
}

let sqliteClient: DbClient | null = null;
let mysqlClient: DbClient | null = null;
let pgClient: DbClient | null = null;
let tableReady = false;
let isPg = false;
let isMy = false;

async function getSqliteClient(): Promise<DbClient> {
  if (sqliteClient) return sqliteClient;
  const betterSqlite3 = await import("better-sqlite3");
  const Database = betterSqlite3.default;
  const fs = await import("node:fs");
  const path = await import("node:path");

  const dbPath = path.join(process.cwd(), "data", "waitlist.db");
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  sqliteClient = {
    async run(sql, params) {
      const info = db.prepare(sql).run(...params);
      return { lastId: Number(info.lastInsertRowid) };
    },
    async all(sql) {
      return db.prepare(sql).all() as unknown[];
    },
    async count(sql) {
      const row = db.prepare(sql).get() as { count: number };
      return Number(row.count);
    },
  };
  return sqliteClient;
}

async function getMysqlClient(): Promise<DbClient> {
  if (mysqlClient) return mysqlClient;
  const mysqlModule = await import("mysql2/promise");
  const mysql = mysqlModule;
  const url = process.env.MYSQL_URL;
  const pool = url
    ? mysql.createPool(url)
    : mysql.createPool({
        host: process.env.MYSQL_HOST || "localhost",
        port: Number(process.env.MYSQL_PORT || 3306),
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "homie_waitlist",
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,
      });

  mysqlClient = {
    async run(sql, params) {
      const conn = await pool.getConnection();
      try {
        const [result] = await conn.execute(sql, params);
        return { lastId: Number((result as { insertId?: number }).insertId || 0) };
      } finally {
        conn.release();
      }
    },
    async all(sql) {
      const conn = await pool.getConnection();
      try {
        const [rows] = await conn.execute(sql);
        return rows as unknown[];
      } finally {
        conn.release();
      }
    },
    async count(sql) {
      const conn = await pool.getConnection();
      try {
        const [rows] = await conn.execute(sql);
        return Number((rows as { count: number }[])[0].count);
      } finally {
        conn.release();
      }
    },
  };
  return mysqlClient;
}

async function getPgClient(): Promise<DbClient> {
  if (pgClient) return pgClient;
  const pgModule = await import("pg");
  const { Pool } = pgModule;
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });

  pgClient = {
    async run(sql, params) {
      const res = await pool.query(sql, params);
      return { lastId: Number(res.rows?.[0]?.id || 0) };
    },
    async all(sql) {
      const res = await pool.query(sql);
      return res.rows as unknown[];
    },
    async count(sql) {
      const res = await pool.query(sql);
      return Number(res.rows?.[0]?.count || 0);
    },
  };
  return pgClient;
}

async function getClient(): Promise<DbClient> {
  if (USE_POSTGRES) {
    isPg = true;
    return getPgClient();
  }
  if (USE_MYSQL) {
    isMy = true;
    return getMysqlClient();
  }
  if (process.env.VERCEL) {
    throw new Error(
      "No database configured. Set POSTGRES_URL (Neon/Supabase free tier) or MYSQL_* env vars in Vercel."
    );
  }
  return getSqliteClient();
}

export async function ensureTable(): Promise<void> {
  if (tableReady) return;
  const client = await getClient();
  await createTable(client, isPg, isMy);
  tableReady = true;
}

export async function addEntry(name: string, email: string): Promise<void> {
  await ensureTable();
  const client = await getClient();
  if (isPg) {
    await client.run("INSERT INTO waitlist (name, email) VALUES ($1, $2)", [name || null, email]);
  } else {
    await client.run("INSERT INTO waitlist (name, email) VALUES (?, ?)", [name || null, email]);
  }
}

export async function getCount(): Promise<number> {
  await ensureTable();
  const client = await getClient();
  const sql = isPg ? "SELECT COUNT(*)::int AS count FROM waitlist" : "SELECT COUNT(*) AS count FROM waitlist";
  return client.count(sql);
}

export async function listEntries(): Promise<unknown[]> {
  await ensureTable();
  const client = await getClient();
  const sql = isPg
    ? "SELECT id, name, email, created_at FROM waitlist ORDER BY created_at DESC LIMIT 500"
    : "SELECT id, name, email, created_at FROM waitlist ORDER BY created_at DESC LIMIT 500";
  return client.all(sql);
}

export { USE_POSTGRES, USE_MYSQL };
