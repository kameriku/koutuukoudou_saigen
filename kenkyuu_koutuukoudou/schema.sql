CREATE TABLE IF NOT EXISTS participants (
  id VARCHAR(64) NOT NULL PRIMARY KEY,   -- 端末が自動生成する匿名ID
  gender VARCHAR(16) NULL,
  age SMALLINT NULL,
  created_at DATETIME(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS trips (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  participant_id VARCHAR(64) NOT NULL,
  purpose VARCHAR(32) NOT NULL,
  started_at DATETIME(3) NOT NULL,
  ended_at DATETIME(3) NULL,
  INDEX idx_trips_participant (participant_id, started_at)
);

CREATE TABLE IF NOT EXISTS legs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  trip_id BIGINT NOT NULL,
  mode VARCHAR(32) NOT NULL,
  started_at DATETIME(3) NOT NULL,
  ended_at DATETIME(3) NULL,
  INDEX idx_legs_trip (trip_id)
);

CREATE TABLE IF NOT EXISTS track_points (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  leg_id BIGINT NOT NULL,
  lat DOUBLE NOT NULL,
  lng DOUBLE NOT NULL,
  accuracy FLOAT NULL,
  speed FLOAT NULL,
  recorded_at DATETIME(3) NOT NULL,
  INDEX idx_points_leg_time (leg_id, recorded_at)
);
-- 日時はすべてUTCで保存します。
