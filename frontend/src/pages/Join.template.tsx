import { Link } from "react-router-dom";
import { styled } from "styled-components";
import oc from "open-color";
import { JoinForm, JoinFormProps } from "@/components/JoinForm";

export interface JoinTemplateProps extends JoinFormProps {}

export const JoinTemplate: React.FC<JoinTemplateProps> = (props) => {
  return (
    <Container>
      <Header>
        <AppTitle>
          <Link to="/">Programmers Note Editor</Link>
        </AppTitle>
      </Header>
      <Main>
        <JoinForm onSubmit={props.onSubmit} />
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
