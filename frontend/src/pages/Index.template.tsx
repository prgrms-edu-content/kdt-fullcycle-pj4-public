import { Link } from "react-router-dom";
import { styled } from "styled-components";
import oc from "open-color";
import { ReactComponent as MussgImage } from "@/assets/mussg.svg";

export const IndexTemplate: React.FC = () => {
  return (
    <Container>
      <MussgImage height="182" />
      <AppTitle>Programmers Note Editor</AppTitle>

      <AppDescription>
        <strong>Programmers Note Editor</strong>는 웹 브라우저에서 사용할 수 있는 메모장 서비스입니다.
        <br />
        메모는 클라우드에 저장되어 언제 어디서나 접근할 수 있습니다.
      </AppDescription>

      <StartLink to="login">무료로 시작하기</StartLink>

      <Footer>© 2023 Grepp Co.</Footer>
    </Container>
  );
};

const Container = styled.div`
  padding: 72px 24px;
  text-align: center;
`;

const AppTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 20px;
`;

const AppDescription = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 36px;
`;

const StartLink = styled(Link)`
  display: inline-block;
  background-color: ${oc.gray[9]};
  color: ${oc.white};
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 18px;
  margin: 0 0 36px;
  text-decoration: none;
  &:hover {
    background-color: ${oc.gray[8]};
  }
  &:active {
    background-color: ${oc.gray[7]};
  }
`;

const Footer = styled.footer`
  font-size: 14px;
  font-weight: 400;
  color: ${oc.gray[6]};
`;
