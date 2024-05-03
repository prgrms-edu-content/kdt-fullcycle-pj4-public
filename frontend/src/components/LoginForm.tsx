import { Link } from "react-router-dom";
import { styled } from "styled-components";
import oc from "open-color";

export interface LoginFormProps {
  onSubmit?(e: { email: string; password: string }): void;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  return (
    <Container>
      <Title>로그인</Title>
      <Form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          props.onSubmit?.({ email, password });
        }}
      >
        <InputContainer>
          <span>이메일</span>
          <input type="email" name="email" required />
        </InputContainer>

        <InputContainer>
          <span>비밀번호</span>
          <input type="password" name="password" required />
        </InputContainer>

        <LoginButton type="submit">로그인</LoginButton>
      </Form>

      <JoinLinkContainer>
        계정이 없으신가요? <Link to="/join">가입하기</Link>
      </JoinLinkContainer>
    </Container>
  );
};

const Container = styled.div`
  width: min(calc(100vw - 20px), 320px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 24px;
  text-align: center;
`;

const Form = styled.form`
  display: contents;
`;

const InputContainer = styled.label`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span {
    align-self: flex-start;
    font-size: 12px;
    color: ${oc.gray[6]};
  }

  input {
    align-self: stretch;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 1.5;
    border: 1px solid ${oc.gray[5]};
    background-color: ${oc.gray[1]};
  }
`;

const LoginButton = styled.button`
  display: block;
  align-self: stretch;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  color: ${oc.blue[8]};
  border: 1px solid ${oc.blue[2]};
  background-color: ${oc.blue[1]};
  cursor: pointer;
`;

const JoinLinkContainer = styled.div`
  align-self: center;
  font-size: 14px;
  line-height: 24px;
  color: ${oc.gray[8]};

  a {
    color: ${oc.blue[8]};
  }
`;
