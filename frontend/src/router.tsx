import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { RouteErrorBoundary } from "./components/boundaries/RouteErrorBoundary";
import { IndexPage } from "./pages/Index";
import { LoginPage } from "./pages/Login";
import { JoinPage } from "./pages/Join";
import { NotesIndexPage } from "./pages/notes/Index";
import { NoteDetailPage } from "./pages/notes/Detail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route ErrorBoundary={RouteErrorBoundary}>
      <Route index Component={IndexPage} />
      <Route path="login" Component={LoginPage} />
      <Route path="join" Component={JoinPage} />
      <Route path="notes" Component={NotesIndexPage}>
        <Route path=":noteId" Component={NoteDetailPage} />
      </Route>
    </Route>
  )
);
