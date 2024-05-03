import { fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "@/utils/test/renderWithRouter";
import { Note } from "@/types/note";
import { NoteList } from "./NoteList";

const MOCK_NOTES: Note[] = [
  {
    id: 1,
    title: "테스트 노트 제목",
    content: "테스트 노트 내용",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "애플파이 레시피",
    content: "레시피 내용",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe("NoteList", () => {
  test("잘 렌더링된다.", () => {
    renderWithRouter(<NoteList notes={MOCK_NOTES} />);

    expect(screen.getByText("테스트 노트 제목")).toBeInTheDocument();
  });

  test("노트를 클릭하면 해당 노트 URL로 이동한다.", () => {
    renderWithRouter(<NoteList notes={MOCK_NOTES} />);

    fireEvent.click(screen.getByText("테스트 노트 제목"));

    expect(window.location.pathname).toBe("/notes/1");
  });

  test("제목이 없는 노트는 '제목 없음' 메시지가 보인다.", () => {
    renderWithRouter(<NoteList notes={[{ ...MOCK_NOTES[0], title: "" }]} />);

    expect(screen.getByText("제목 없음")).toBeInTheDocument();
  });

  test("결과가 없는 경우, '노트 없음' 메시지가 보인다.", () => {
    renderWithRouter(<NoteList notes={[]} />);

    expect(screen.getByText("노트 없음")).toBeInTheDocument();
  });
});
