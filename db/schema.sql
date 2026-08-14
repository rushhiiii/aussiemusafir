CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fname TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  pdate TEXT,
  guests INTEGER,
  pickup TEXT,
  destinations TEXT, -- JSON Array of selected destinations
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
