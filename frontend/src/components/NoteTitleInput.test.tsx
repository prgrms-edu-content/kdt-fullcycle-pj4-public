import { fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "@/utils/test/renderWithRouter";
import { NoteTitleInput } from "./NoteTitleInput";

describe("NoteTitleInput", () => {
  test("잘 렌더링된다.", () => {
    renderWithRouter(<NoteTitleInput />);

    expect(screen.getByPlaceholderText("제목 없음")).toBeInTheDocument();
  });

  test("내용을 입력하면 onChange 콜백이 호출된다.", () => {
    const onChange = jest.fn();
    renderWithRouter(<NoteTitleInput onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText("제목 없음"), { target: { value: "foo" } });

    expect(onChange).toBeCalledWith("foo");
  });

  test("개행 문자를 포함하여 입력하면 개행 문제는 제외하고 onChange 콜백이 호출된다.", () => {
    const onChange = jest.fn();
    renderWithRouter(<NoteTitleInput onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText("제목 없음"), { target: { value: "foo\nbar" } });

    expect(onChange).toBeCalledWith("foobar");
  });
});
