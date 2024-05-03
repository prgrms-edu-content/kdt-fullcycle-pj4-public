# Web Note Editor Backend

[Express](https://expressjs.com/ko/)로 개발된 웹 노트 편집기 Node.js 백엔드 서버 앱입니다.

## 개발 방법

`/backend` 디렉터리 이동하여 작업합니다.

개발용 데이터베이스가 없는 경우, Docker Compose를 이용하여 DBMS를 구동해야합니다.

1. `/backend` 디렉터리에서 아래 명령어를 실행하면 postgres 컨테이너가 구동됩니다.

   ```sh
   docker-compose up -d
   ```

2. 그리고 스키마 생성을 위해 적당한 데이터베이스 클라이언트를 이용하여 아래 DDL을 실행합니다.

   ```sql
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
   ```

## 개발 스크립트

다음 명령어를 실행할 수 있습니다.

### `npm start`

애플리케이션 개발용 서버를 구동합니다.

환경변수 파일에 지정된 포트번호로 구동되며, 기본적으로는 아래 URL로 접근 가능합니다.
[http://localhost:3031](http://localhost:3031)

소스코드에 변경사항이 생기면 자동으로 리로드됩니다.

### `npm run build`

프로덕션 환경을 위해 앱을 빌드하여, `build` 디렉터리에 산출물을 만듭니다.
`tsc`를 통해 TypeScript 소스코드가 컴파일됩니다.

생성되는 산출물은 Node.js를 통해 즉시 실행 가능한 상태입니다. 하지만 컨테이너 환경에서 실행하기 위해서는 `Dockerfile`을 이용하여 Docker 이미지를 빌드해야합니다.

## 폴더 구조 및 개발 컨벤션

### 루트 디렉터리

- `/.env`
  개발 환경을 위한 환경변수 모음 파일입니다.
  여기서 지정한 환경변수는 `/src/settings.ts`에서 상수 형태로 내보냅니다.

- `/docker-compose.yml`
  개발환경용 postgres 컨테이너를 간편하게 구동하기 위한 Docker Compose 정의 파일입니다.

- `Dockerfile`
  앱을 Docker 이미지로 빌드하기 위한 Dockerfile입니다

- `nodemon.json`
  개발환경을 위한 nodemon 설정파일입니다.

### `/src` 디렉터리

- `/index.ts`
  스크립트 진입점 파일입니다. Express app을 생성하고, 라우트를 포함해 각종 미들웨어를 추가합니다.

- `/src/router.tsx`
  애플리케이션 라우트 구조를 기술하는 라우터 파일입니다.

- `/src/settings.ts`
  애플리케이션에 필요한 환경변수(`process.env`)를 상수 형태로 내보내는 파일입니다.

### `/src/middlewares` 디렉터리

인증/인가 구현을 위한 미들웨어가 위치한 디렉터리입니다.

인증/인가에 성공할 시, User 또는 Note 데이터가 `Request` 객체에 주입됩니다.

### `/src/models` 디렉터리

모델 클래스가 위치합니다.

정적 메서드와 인스턴스 메서드를 통해 DB에 CRUD를 수행할 수 있습니다.

본 앱에서 데이터베이스 작업은 항상 모델 클래스를 거쳐서만 하도록 합니다.

### `/src/routes` 디렉터리

애플리케이션 라우트 구조를 기술하고, 라우트별 처리되어야하는 로직이 포함된 라우터 파일이 위치합니다.

### `/src/utils` 디렉터리

Postgres Pool 객체가 위치합니다.
