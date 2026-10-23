import { db, route } from '../lib/db.js';

const fmt = (ms) => new Date(ms).toISOString().slice(0, 23).replace('T', ' ');

export default route(async ({ legId, points }, res) => {
  if (!legId || !Array.isArray(points) || points.length === 0 || points.length > 500) {
    return res.status(400).json({ error: 'bad request' });
  }
  const rows = points
    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng) && Number.isFinite(p.t))
    .map((p) => [legId, p.lat, p.lng, p.acc ?? null, p.speed ?? null, fmt(p.t)]);
  if (rows.length) {
    await db().query('INSERT INTO track_points (leg_id, lat, lng, accuracy, speed, recorded_at) VALUES ?', [rows]);
  }
  res.json({ saved: rows.length });
});
