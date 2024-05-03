import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";
import { useNotes } from "@/hooks/useNotes";
import { useCreateNote } from "@/hooks/useCreateNote";
import { withAuthenticatedUser } from "@/components/hocs/withAuthenticatedUser";
import { NotesIndexTemplate } from "./Index.template";

export const NotesIndexPage = withAuthenticatedUser((props) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const handleClickLogout = async () => {
    await logout();
    navigate("/");
  };

  const { createNote } = useCreateNote();
  const handleClickCreateNote = async () => {
    const note = await createNote({ title: "", content: "" });
    navigate(`/notes/${note.id}`);
  };

  const { notes } = useNotes();
  if (!notes) {
    return null;
  }
  return (
    <NotesIndexTemplate
      notes={notes}
      currentUserEmail={props.currentUser.email}
      onClickLogout={handleClickLogout}
      onClickCreateNote={handleClickCreateNote}
    />
  );
});
