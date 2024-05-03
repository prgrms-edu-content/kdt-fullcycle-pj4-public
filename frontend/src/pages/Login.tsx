import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { withUnauthenticated } from "@/components/hocs/withUnauthenticated";
import { LoginTemplate, LoginTemplateProps } from "./Login.template";

export const LoginPage = withUnauthenticated(() => {
  const { login } = useLogin();

  const navigate = useNavigate();
  const handleSubmit: LoginTemplateProps["onSubmit"] = async ({ email, password }) => {
    const { result } = await login({ email, password });
    if (result === "unauthorized") {
      return alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
    result satisfies "success";
    navigate("/notes");
  };

  return <LoginTemplate onSubmit={handleSubmit} />;
});
