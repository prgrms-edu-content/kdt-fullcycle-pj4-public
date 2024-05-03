import { styled } from "styled-components";
import oc from "open-color";
import { ReactComponent as ErrorIcon } from "@/assets/ic-triangle-exclamation.svg";

export interface ErrorPageTemplateProps {
  title: string;
  description?: string;
  buttonTitle?: string;
  onClickButton?(): void;
}

export const ErrorPageTemplate: React.FC<ErrorPageTemplateProps> = (props) => {
  return (
    <Container>
      <ErrorIcon />
      <Title>{props.title}</Title>
      {props.description && <Description>{props.description}</Description>}
      {props.buttonTitle && <Button onClick={props.onClickButton}>{props.buttonTitle}</Button>}
    </Container>
  );
};

const Container = styled.div`
  min-height: 90vh;
  padding: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;

  svg {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    fill: ${oc.yellow[7]};
  }
`;

const Title = styled.h1`
  margin: 0 0 20px;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.5;
  color: ${oc.gray[9]};
`;

const Description = styled.p`
  margin: 0 0 20px;
  font-size: 16px;
  line-height: 1.5;
  color: ${oc.gray[7]};
`;

const Button = styled.button`
  display: block;
  margin-top: 30px;
  border: 1px solid ${oc.gray[3]};
  border-radius: 4px;
  padding: 6px 12px;
  background-color: white;
  color: ${oc.gray[7]};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${oc.gray[1]};
  }

  &:active {
    background-color: ${oc.gray[2]};
    color: ${oc.gray[8]};
  }
`;
