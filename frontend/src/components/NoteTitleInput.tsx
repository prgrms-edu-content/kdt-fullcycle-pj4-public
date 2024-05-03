import TextareaAutosize from "react-textarea-autosize";
import { styled } from "styled-components";
import oc from "open-color";

export interface NoteTitleInputProps {
  value?: string;
  onChange?(value: string): void;
}

export const NoteTitleInput: React.FC<NoteTitleInputProps> = (props) => {
  return (
    <Input
      placeholder="제목 없음"
      value={props.value}
      onChange={({ target }) => props.onChange?.(target.value.replace(/\n/g, ""))}
    />
  );
};

const Input = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  padding: 0 6px;
  border: none;
  font-size: 28px;
  line-height: 1.5;
  font-weight: 700;
  color: ${oc.gray[9]};
  resize: none;

  &::placeholder {
    color: ${oc.gray[6]};
  }

  &:focus {
    outline: none;
  }
`;
