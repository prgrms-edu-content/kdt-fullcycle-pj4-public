import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import oc from "open-color";
import { ReactComponent as NoteIcon } from "@/assets/ic-file-lines.svg";

export interface NoteListProps {
  notes: { id: number; title: string }[];
}

export const NoteList: React.FC<NoteListProps> = (props) => {
  if (props.notes.length === 0) {
    return (
      <Container>
        <Title>노트 목록</Title>
        <EmptyMessage>노트 없음</EmptyMessage>
      </Container>
    );
  }
  return (
    <Container>
      <Title>노트 목록</Title>
      <List>
        {props.notes.map((note) => (
          <ListItem key={note.id} $unnamed={!note.title}>
            <NavLink to={`/notes/${note.id}`}>
              <NoteIcon />
              <span>{note.title || "제목 없음"}</span>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.section`
  padding: 2px;
`;

const Title = styled.h2`
  font-size: 12px;
  font-weight: 600;
  margin: 12px 0 4px;
  padding: 0 8px;
  color: ${oc.gray[5]};
`;

const EmptyMessage = styled.div`
  color: ${oc.gray[6]};
  font-size: 14px;
  text-align: center;
  padding: 36px 0;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0;
  padding: 0;
  gap: 1px;
  list-style: none;
`;

const ListItem = styled.li<{ $unnamed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  padding: 0 14px;
  color: ${oc.gray[6]};
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
  height: 26px;
  cursor: pointer;

  &:hover {
    background-color: ${oc.gray[2]};
  }

  &:has(.active) {
    background-color: ${oc.gray[3]};
    font-weight: 600;
    color: ${oc.gray[9]};
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
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: ${(props) => (props.$unnamed ? 0.4 : 1)};
  }

  a {
    display: contents;
    color: inherit;
  }
`;
