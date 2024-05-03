import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteNote } from "@/hooks/useDeleteNote";
import { useUpdateNote } from "@/hooks/useUpdateNote";
import { withCurrentNote } from "@/components/hocs/withCurrentNote";
import { NoteDetailTemplate } from "./Detail.template";

export const NoteDetailPage = withCurrentNote((props) => {
  const [title, setTitle] = useState(props.currentNote.title);
  const [content, setContent] = useState(props.currentNote.content);
  useEffect(() => {
    setTitle(props.currentNote.title);
    setContent(props.currentNote.content);
  }, [props.currentNote]);

  const { updateNote } = useUpdateNote();
  const handleClickSave = async () => {
    await updateNote({ id: props.currentNote.id, title, content });
    alert("저장되었습니다.");
  };

  const { deleteNote } = useDeleteNote();
  const navigate = useNavigate();
  const handleClickDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }
    await deleteNote(props.currentNote.id);
    navigate("/notes");
  };

  return (
    <NoteDetailTemplate
      title={title}
      onChangeTitle={setTitle}
      content={content}
      onChangeContent={setContent}
      onClickSave={handleClickSave}
      onClickDelete={handleClickDelete}
    />
  );
});
