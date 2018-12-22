ALTER TABLE videos
  ADD COLUMN created     TIMESTAMP     NOT NULL,
  ADD COLUMN modified    TIMESTAMP     NOT NULL
  AFTER title;
