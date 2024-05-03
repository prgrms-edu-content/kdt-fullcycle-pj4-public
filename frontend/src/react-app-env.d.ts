/// <reference types="react-scripts" />

declare global {
  interface Window {
    _ENV: Partial<Record<string, string>>;
  }
}

export {};
