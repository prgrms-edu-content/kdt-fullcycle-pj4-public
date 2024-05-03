import { useNavigate } from "react-router-dom";
import { useJoin } from "@/hooks/useJoin";
import { withUnauthenticated } from "@/components/hocs/withUnauthenticated";
import { JoinTemplate, JoinTemplateProps } from "./Join.template";

export const JoinPage = withUnauthenticated(() => {
  const navigate = useNavigate();
  const { join } = useJoin();
  const handleSubmit: JoinTemplateProps["onSubmit"] = async ({ email, password }) => {
    const { result } = await join({ email, password });
    if (result === "conflict") {
      return alert("이미 가입된 이메일입니다.");
    }
    result satisfies "success";
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  };

  return <JoinTemplate onSubmit={handleSubmit} />;
});
