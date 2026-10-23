import { db, route } from '../lib/db.js';

export default route(async ({ participantId, gender, age, mode, purpose }, res) => {
  const ageNum = Number(age);
  if (!participantId || !mode || !purpose || !gender || !Number.isInteger(ageNum) || ageNum < 0 || ageNum > 120) {
    return res.status(400).json({ error: 'bad request' });
  }
  const pool = db();
  await pool.query(
    'INSERT INTO participants (id, gender, age, created_at) VALUES (?, ?, ?, UTC_TIMESTAMP(3)) ON DUPLICATE KEY UPDATE gender = VALUES(gender), age = VALUES(age)',
    [participantId, String(gender).slice(0, 16), ageNum]
  );
  const [t] = await pool.query('INSERT INTO trips (participant_id, purpose, started_at) VALUES (?, ?, UTC_TIMESTAMP(3))', [participantId, purpose]);
  const [l] = await pool.query('INSERT INTO legs (trip_id, mode, started_at) VALUES (?, ?, UTC_TIMESTAMP(3))', [t.insertId, mode]);
  res.json({ tripId: t.insertId, legId: l.insertId });
});
