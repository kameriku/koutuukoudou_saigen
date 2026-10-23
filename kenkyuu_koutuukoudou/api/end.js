import { db, route } from '../lib/db.js';

export default route(async ({ tripId }, res) => {
  if (!tripId) return res.status(400).json({ error: 'bad request' });
  const pool = db();
  await pool.query('UPDATE legs SET ended_at = UTC_TIMESTAMP(3) WHERE trip_id = ? AND ended_at IS NULL', [tripId]);
  await pool.query('UPDATE trips SET ended_at = UTC_TIMESTAMP(3) WHERE id = ? AND ended_at IS NULL', [tripId]);
  res.json({ ok: true });
});
