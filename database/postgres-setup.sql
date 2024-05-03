-- 노트 테이블 생성
CREATE TABLE notes (
    id SERIAL,
    title text NOT NULL,
    content text NOT NULL,
    PRIMARY KEY ("id")
);

-- 사용자 테이블 생성
CREATE TABLE users (
    id SERIAL,
    email text NOT NULL,
    encrypted_password text NOT NULL,
    PRIMARY KEY ("id")
);

-- 사용자 테이블에 이메일 컬럼에 유니크 인덱스 추가
CREATE UNIQUE INDEX "users_unique_email" ON users USING BTREE ("email");

-- 노트 테이블에 타임스탬프 컬럼 추가
ALTER TABLE notes
ADD COLUMN created_at timestamp NOT NULL DEFAULT now(),
ADD COLUMN updated_at timestamp;

-- 타임스탬프를 업데이트해주는 함수 생성
CREATE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 함수를 자동으로 실행하도록 트리거 생성
CREATE TRIGGER notes_update_timestamp
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- 노트 테이블에 사용자 아이디 외래키 컬럼 추가
ALTER TABLE notes
ADD COLUMN user_id INTEGER,
ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;
