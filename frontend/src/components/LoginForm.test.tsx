import { fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "@/utils/test/renderWithRouter";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  test("잘 렌더링된다.", () => {
    renderWithRouter(<LoginForm />);

    expect(screen.getByText("로그인", { selector: "button" })).toBeInTheDocument();
  });

  test("가입하기 버튼을 누르면 회원가입 URL로 이동한다.", () => {
    renderWithRouter(<LoginForm />);

    fireEvent.click(screen.getByText("가입하기"));

    expect(window.location.pathname).toBe("/join");
  });

  test("회원정보를 입력하고 로그인 버튼을 누르면 onSubmit 콜백이 호출된다.", () => {
    const onSubmit = jest.fn();
    renderWithRouter(<LoginForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("이메일"), { target: { value: "foo@example.com" } });
    fireEvent.change(screen.getByLabelText("비밀번호"), { target: { value: "1234" } });
    screen.getByText("로그인", { selector: "button" }).click();

    expect(onSubmit).toBeCalledWith({ email: "foo@example.com", password: "1234" });
  });
});
