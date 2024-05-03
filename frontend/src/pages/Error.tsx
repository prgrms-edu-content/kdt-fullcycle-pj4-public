import { useNavigate } from "react-router-dom";
import { getStatusFromError } from "@/utils/getStatusFromError";
import { ErrorPageTemplate } from "./Error.template";

export interface ErrorPageProps {
  error: unknown;
}

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const errorStatus = getStatusFromError(props.error);
  const navigate = useNavigate();

  if (errorStatus === 404) {
    return (
      <ErrorPageTemplate
        title="페이지를 찾을 수 없습니다."
        buttonTitle="홈으로 가기"
        description="요청하신 페이지가 존재하지 않거나 삭제되었습니다."
        onClickButton={() => navigate("/")}
      />
    );
  }
  if (errorStatus === 403) {
    return (
      <ErrorPageTemplate
        title="페이지에 접근할 권한이 없습니다."
        buttonTitle="홈으로 가기"
        onClickButton={() => navigate("/")}
      />
    );
  }
  return (
    <ErrorPageTemplate
      title="오류가 발생했습니다."
      description="잠시 후 다시 시도해주세요."
      buttonTitle="새로고침"
      onClickButton={() => window.location.reload()}
    />
  );
};
