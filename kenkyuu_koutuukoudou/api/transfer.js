import { db, route } from '../lib/db.js';

export default route(async ({ tripId, mode }, res) => {
  if (!tripId || !mode) return res.status(400).json({ error: 'bad request' });
  const pool = db();
  await pool.query('UPDATE legs SET ended_at = UTC_TIMESTAMP(3) WHERE trip_id = ? AND ended_at IS NULL', [tripId]);
  const [l] = await pool.query('INSERT INTO legs (trip_id, mode, started_at) VALUES (?, ?, UTC_TIMESTAMP(3))', [tripId, mode]);
  res.json({ legId: l.insertId });
});
