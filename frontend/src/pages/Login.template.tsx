import { Link } from "react-router-dom";
import { styled } from "styled-components";
import oc from "open-color";
import { LoginForm, LoginFormProps } from "@/components/LoginForm";

export interface LoginTemplateProps extends LoginFormProps {}

export const LoginTemplate: React.FC<LoginTemplateProps> = (props) => {
  return (
    <Container>
      <Header>
        <AppTitle>
          <Link to="/">Programmers Note Editor</Link>
        </AppTitle>
      </Header>
      <Main>
        <LoginForm onSubmit={props.onSubmit} />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 36px;
`;

const Header = styled.header`
  align-self: flex-start;
  margin-bottom: 20px;
`;

const AppTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 36px;

  a {
    color: inherit;
    text-decoration: none;

    &:active {
      color: ${oc.gray[7]};
    }
  }
`;

const Main = styled.main`
  align-self: center;
`;
