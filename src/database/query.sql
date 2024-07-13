-- Membuat Tabel `user`
CREATE TABLE user (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  firstname VARCHAR(75) NOT NULL,
  lastname VARCHAR(100),
  email VARCHAR(100) NOT NULL UNIQUE,
  role SMALLINT NOT NULL,
  refreshToken TEXT,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP
);

-- Membuat Tabel `category`
CREATE TABLE category (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  createdBy BIGINT UNSIGNED NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES user(id)
);

-- Membuat Tabel `channel`
CREATE TABLE channel (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  link TEXT NOT NULL,
  createdBy BIGINT UNSIGNED NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES user(id)
);

-- Membuat Tabel `video`
CREATE TABLE video (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  category BIGINT UNSIGNED NOT NULL,
  channel BIGINT UNSIGNED NOT NULL,
  createdBy BIGINT UNSIGNED NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP,
  FOREIGN KEY (category) REFERENCES category(id),
  FOREIGN KEY (channel) REFERENCES channel(id),
  FOREIGN KEY (createdBy) REFERENCES user(id)
);

-- Menambahkan kolom `password` pada tabel `user`
ALTER TABLE `user` ADD COLUMN `password` TEXT;
