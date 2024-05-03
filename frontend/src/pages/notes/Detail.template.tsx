import { styled } from "styled-components";
import oc from "open-color";
import { ReactComponent as SaveIcon } from "@/assets/ic-floppy-disk.svg";
import { ReactComponent as DeleteIcon } from "@/assets/ic-trash-can.svg";
import { NoteTitleInput } from "@/components/NoteTitleInput";
import { NoteContentEditor } from "@/components/NoteContentEditor";

export interface NoteDetailTemplateProps {
  title: string;
  onChangeTitle(value: string): void;
  content: string;
  onChangeContent(value: string): void;
  onClickSave(): void;
  onClickDelete(): void;
}

export const NoteDetailTemplate: React.FC<NoteDetailTemplateProps> = (props) => {
  return (
    <Container>
      <Header>
        <Title>
          <NoteTitleInput value={props.title} onChange={props.onChangeTitle} />
        </Title>
        <Toolbar>
          <Button onClick={props.onClickSave}>
            <SaveIcon />
            <span>저장</span>
          </Button>
          <Button onClick={props.onClickDelete}>
            <DeleteIcon />
            <span>삭제</span>
          </Button>
        </Toolbar>
      </Header>
      <Main>
        <NoteContentEditor value={props.content} onChange={props.onChangeContent} />
      </Main>
    </Container>
  );
};

const Container = styled.article`
  padding: 20px 20px 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  position: relative;

  &::after {
    position: absolute;
    content: "";
    top: 100%;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(0, transparent 0%, white 100%);
    z-index: 1;
  }
`;

const Title = styled.div`
  flex: 1;
  margin: 0;
`;

const Toolbar = styled.div`
  flex-shrink: 0;
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
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

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

const Main = styled.main`
  padding: 20px 0 20px;
  flex: 1;
  height: 0;
  overflow-y: auto;
`;
