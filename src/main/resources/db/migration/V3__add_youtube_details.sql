ALTER TABLE videos
  ADD COLUMN link             VARCHAR(255)     NOT NULL,
  ADD COLUMN duration         VARCHAR(64)     NULL,
  ADD COLUMN ytid             VARCHAR(64)     NULL,
  ADD COLUMN dimension        VARCHAR(64)     NULL,
  ADD COLUMN definition       VARCHAR(64)     NULL,
  ADD COLUMN caption          VARCHAR(64)     NULL,
  ADD COLUMN licensed_content VARCHAR(64)     NULL,
  ADD COLUMN projection       VARCHAR(64)     NULL,
  ADD COLUMN thumbnail        VARCHAR(64)     NULL,
  ADD COLUMN embed_link       VARCHAR(64)     NULL
  AFTER modified;
