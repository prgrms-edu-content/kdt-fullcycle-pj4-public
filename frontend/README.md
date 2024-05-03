# Programmers Note Editor Frontend

[Create React App](https://github.com/facebook/create-react-app)으로 스캐폴딩된 웹 노트 편집기 SPA 앱입니다.

## 개발 방법

`/frontend` 디렉터리로 이동하고 개발 스크립트를 실행합니다.

## 개발 스크립트

다음 명령어를 실행할 수 있습니다.

### `npm start`

애플리케이션 개발용 서버를 구동합니다.

브라우저에서 다음 URL에 접속하면 애플리케이션 화면을 볼 수 있습니다.
[http://localhost:3000](http://localhost:3000)

소스코드에 변경사항이 생기면 자동으로 리로드됩니다.

### `npm run build`

프로덕션 환경을 위해 앱을 빌드하여, `build` 디렉터리폴더에 산출물을 만듭니다.
React가 프로덕션 모드로 번들링되며, 최고 성능을 위해 최적화됩니다.

생성되는 산출물은 즉시 배포 가능한 상태입니다. 리소스는 난독화되며, 정적 파일 이름에는 해시가 붙습니다.

## 폴더 구조 및 개발 컨벤션

### 루트 디렉터리

- `/public`
  빌드 결과물에 주어진 그대로 포함되는 정적 파일들이 위치합니다.

- `/.env`
  개발 환경을 위한 환경변수 모음 파일입니다.
  [Create React App 환경변수 관련 문서](https://create-react-app.dev/docs/adding-custom-environment-variables/)에 따라, 키 이름에는 `REACT_APP_` 접두어가 붙습니다.
  여기서 지정한 환경변수는 `/src/settings.ts`에서 상수 형태로 내보냅니다.

### `/src` 디렉터리

- `/src/index.tsx`
  스크립트 진입점 파일입니다. React App 진입점을 로드합니다.

- `/src/App.tsx`
  React App 진입점입니다. 라우터를 렌더링하고, 전역 스타일을 로드합니다.

- `/src/App.css`
  전역 스타일 파일입니다. 브라우저간 차이를 줄이기 위해 [sanitize.css](https://csstools.github.io/sanitize.css/)를 로드하며, [open-color 컬러 팔레트](https://yeun.github.io/open-color/)에서 가져온 특정 색상으로 애플리케이션의 기본 폰트 색상을 지정합니다.

- `/src/router.tsx`
  애플리케이션 라우트 구조를 기술하는 라우터 파일입니다.

- `/src/settings.ts`
  애플리케이션에 필요한 환경변수(`process.env`)를 상수 형태로 내보내는 파일입니다.

### `/src/assets` 디렉터리

SVG 아이콘들이 위치합니다. [Font Awesome에서 제공하는 무료 SVG 아이콘](https://fontawesome.com/search?o=r&m=free)을 사용하고 있습니다.

애플리케이션에서 아이콘 사용은 [Create React App SVG 관련 문서](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs)에 따라, React 컴포넌트 형태로 가져와 임베드하도록 합니다.

### `/src/components` 디렉터리

재사용 가능한 단위의 각종 컴포넌트가 위치합니다.

- `boundaries` 디렉터리에는 에러 바운더리 컴포넌트가 위치합니다.

  - `<AppErrorBoundary />`: [React ErrorBoundary 문서에서 제공하는 예제](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)와 같은 방식으로 동작합니다. 애플리케이션 렌더링 과정에서 에러가 발생하면, 대체 페이지 컴포넌트(`<ErrorPage />`)가 렌더링됩니다.
  - `<RouteErrorBoundary />`: [React Router에서 소개하는 ErrorBoundary](https://reactrouter.com/en/main/route/route#errorelementerrorboundary)입니다. 라우팅 과정에 에러가 발생하면, 대체 페이지 컴포넌트(`<ErrorPage />`)가 렌더링됩니다.

- `hocs` 디렉터리에는 각종 HOC가 위치합니다. 함수 이름엔 관례에 때라 `with` 접두어를 붙입니다. HOC로 컴포넌트를 감싸서 사용하면 다음과 같은 기능을 수행할 수 있습니다.

  - 특정 조건을 만족하지 않으면 정해진 URL로 리다이렉트
  - 현재 URL에 맞는 특정 상태값을 가져다 props로 주입

- 그 외 일반 컴포넌트들은 props를 통해서만 상호작용하고 사이드이펙트가 없는 Controlled Component들입니다. 스타일도 자체적으로 가지고 있습니다.

### `/src/pages` 디렉터리

라우터에 직접 연결되는 페이지 컴포넌트들이 위치합니다.

각 페이지 컴포넌트는 비즈니스 로직(Recoil이나 Router 소통 등)만을 담으며, 스타일을 포함한 화면 레이아웃은 `페이지명.template.tsx`에서 지정하는 구조로 작성되어있습니다.

페이지 접근 시 특정 권한을 요구하도록로그인 권한이 필요하도록 하고 싶은 경우, `/src/components/hocs`에서 제공하는 HOC를 통해 페이지컴포넌트를 래핑하여 구현하도록 합니다.

### `/src/apis` 디렉터리

API 호출을 위한 함수들이 위치합니다.

각 함수는 `/src/utils/http.ts`에서 내보내는 Axios 클라이언트를 통해서 각 함수마다 지정된 Endpoint로 API를 호출합니다.
본 앱에서 API는 이 함수들을 통해서만 호출하도록 합니다.

애플리케이션 내에서는 이들을 직접 사용하지 않습니다. 대신에 `use` 접두어를 가지고 제공되는, react-query 래퍼 훅을 통해서만 접근하도록 합니다.

### `/src/hooks` 디렉터리

API 함수를 통해 상태 관리를 제공하는 react-query 훅이 위치합니다. [TanStack Query](https://tanstack.com/query/v5)로 구현되어있습니다.

### `/src/types` 디렉터리

모델별로 선언된 타입 인터페이스가 위치합니다.

### `/src/utils` 디렉터리

유틸 함수가 위치합니다.
