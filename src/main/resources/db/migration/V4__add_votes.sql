ALTER TABLE videos
  ADD COLUMN votes       INT      NULL
  AFTER embed_link;
