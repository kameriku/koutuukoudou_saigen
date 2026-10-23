import mysql from 'mysql2/promise';

let pool;
export function db() {
  if (!pool) {
    const u = new URL(process.env.DATABASE_URL);
    pool = mysql.createPool({
      host: u.hostname,
      port: Number(u.port || 3306),
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.slice(1),
      connectionLimit: 1, // サーバーレスでは接続を増やさない
      timezone: 'Z',
      ssl: process.env.DB_SSL === 'false' ? undefined : { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    });
  }
  return pool;
}

export function route(fn) {
  return async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    try {
      await fn(req.body || {}, res);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'server error' });
    }
  };
}
