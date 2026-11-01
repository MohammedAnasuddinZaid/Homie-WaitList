/**
 * Waitlist storage.
 *
 * Local development  -> SQLite (better-sqlite3), zero setup, file at ./data/waitlist.db
 * Production (Vercel)-> MySQL. Set the MYSQL_* env vars below and the pool is used instead.
 *
 * Vercel note: the filesystem is ephemeral there, so a real DB (MySQL) is required
 * for durable storage. Create the schema with schema.sql on your MySQL server,
 * then set:
 *   MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
 * and optionally MYSQL_PORT.
 */

type DbClient = {
  run: (sql: string, params: (string | null)[]) => Promise<{ lastId?: number }>;
  all: (sql: string) => Promise<unknown[]>;
  count: (sql: string) => Promise<number>;
};

const USE_MYSQL = Boolean(
  process.env.MYSQL_HOST || process.env.MYSQL_DATABASE || process.env.MYSQL_URL
);

async function createTable(client: DbClient): Promise<void> {
  await client.run(
    `CREATE TABLE IF NOT EXISTS waitlist (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    []
  );
}

let sqliteClient: DbClient | null = null;
let mysqlClient: DbClient | null = null;
let tableReady = false;

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

async function getClient(): Promise<DbClient> {
  return USE_MYSQL ? getMysqlClient() : getSqliteClient();
}

export async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await createTable(await getClient());
  tableReady = true;
}

export async function addEntry(name: string, email: string): Promise<void> {
  await ensureTable();
  await (await getClient()).run("INSERT INTO waitlist (name, email) VALUES (?, ?)", [name || null, email]);
}

export async function getCount(): Promise<number> {
  await ensureTable();
  return (await getClient()).count("SELECT COUNT(*) AS count FROM waitlist");
}

export async function listEntries(): Promise<unknown[]> {
  await ensureTable();
  return (await getClient()).all(
    "SELECT id, name, email, created_at FROM waitlist ORDER BY created_at DESC LIMIT 500"
  );
}

export { USE_MYSQL };
