// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// window.alert 함수를 모킹
Object.defineProperty(window, "alert", {
  writable: true,
  value: jest.fn(),
});
