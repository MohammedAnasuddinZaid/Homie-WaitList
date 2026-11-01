// MySQL adapter for production deployment
// To use: npm install mysql2
// Set environment variables: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "homie_waitlist",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function initDb() {
  const conn = await pool.getConnection();
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  conn.release();
}

export async function addWaitlistEntry(name: string, email: string) {
  await initDb();
  const [result] = await pool.execute(
    "INSERT INTO waitlist (name, email) VALUES (?, ?)",
    [name || null, email]
  );
  return result;
}

export async function getWaitlistCount(): Promise<number> {
  await initDb();
  const [rows] = await pool.execute("SELECT COUNT(*) as count FROM waitlist");
  return (rows as any[])[0].count;
}

export async function getWaitlistEntries() {
  await initDb();
  const [rows] = await pool.execute(
    "SELECT id, name, email, created_at FROM waitlist ORDER BY created_at DESC"
  );
  return rows;
}
