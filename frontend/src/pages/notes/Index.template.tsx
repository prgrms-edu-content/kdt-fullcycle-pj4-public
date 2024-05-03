import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import oc from "open-color";
import { ReactComponent as UserIcon } from "@/assets/ic-user.svg";
import { ReactComponent as LogoutIcon } from "@/assets/ic-arrow-right-from-bracket.svg";
import { ReactComponent as CreateNoteIcon } from "@/assets/ic-square-plus.svg";
import { NoteList, NoteListProps } from "@/components/NoteList";

export interface NotesIndexTemplateProps extends NoteListProps {
  currentUserEmail: string;
  onClickLogout(): void;
  onClickCreateNote(): void;
}

export const NotesIndexTemplate: React.FC<NotesIndexTemplateProps> = (props) => {
  return (
    <Container>
      <Sidebar>
        <UserEmail>
          <UserIcon />
          <span>{props.currentUserEmail}</span>
        </UserEmail>
        <Button onClick={props.onClickLogout}>
          <LogoutIcon />
          <span>로그아웃</span>
        </Button>
        <Button onClick={props.onClickCreateNote}>
          <CreateNoteIcon />
          <span>노트 생성</span>
        </Button>
        <NoteList notes={props.notes} />
      </Sidebar>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.section`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 280px;
  border-right: 1px solid ${oc.gray[1]};
  flex-shrink: 0;
  background-color: ${oc.gray[0]};
  height: 100vh;
  overflow-y: auto;
`;

const Main = styled.section`
  width: 0;
  flex: 1;
`;

const UserEmail = styled.div`
  padding: 16px 8px 16px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  color: ${oc.gray[7]};

  svg {
    display: block;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  span {
    flex: 1;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Button = styled.button`
  margin: 1px 2px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  background: none;
  color: ${oc.gray[6]};
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${oc.gray[2]};
  }

  &:active {
    background-color: ${oc.gray[3]};
    color: ${oc.gray[7]};
  }

  svg {
    display: block;
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    fill: currentColor;
  }

  span {
    flex: 1;
  }
`;
