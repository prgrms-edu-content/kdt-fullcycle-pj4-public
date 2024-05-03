import { useParams } from "react-router-dom";
import { useNote } from "@/hooks/useNote";
import { Note } from "@/types/note";

interface WithCurrentUserProps {
  currentNote: Note;
}

export function withCurrentNote(Component: React.ComponentType<WithCurrentUserProps>): React.FC {
  return () => {
    const { noteId } = useParams<"noteId">();
    const { note } = useNote(Number(noteId));

    if (!note) {
      return null;
    }
    return <Component currentNote={note} />;
  };
}
