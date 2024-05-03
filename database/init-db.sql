CREATE SCHEMA IF NOT EXISTS `prgms_notes` DEFAULT CHARACTER SET utf8mb4;
USE `prgms_notes`

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(256) NOT NULL,
    encrypted_password text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX users_unique_email (email) USING BTREE
);

-- 노트 테이블 생성
CREATE TABLE IF NOT EXISTS notes (
    id INT NOT NULL AUTO_INCREMENT,
    title text NOT NULL,
    content text NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT note_user_id
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
