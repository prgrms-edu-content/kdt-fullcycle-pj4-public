import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import oc from "open-color";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export interface NoteContentEditorProps {
  value?: string;
  onChange?(value: string): void;
}

export const NoteContentEditor: React.FC<NoteContentEditorProps> = (props) => {
  const lastChangedHTML = useRef("");

  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: "내용을 입력하세요" })],
    onUpdate: ({ editor }) => {
      lastChangedHTML.current = editor.getHTML();
      props.onChange?.(lastChangedHTML.current);
    },
  });

  useEffect(() => {
    if (lastChangedHTML.current === props.value || !editor) {
      return;
    }
    editor?.commands.setContent(props.value || "");
    lastChangedHTML.current = props.value || "";
  }, [editor, props.value]);

  return <StyledEditorContent editor={editor} />;
};

const StyledEditorContent = styled(EditorContent)`
  > [contenteditable] {
    padding: 0 6px;
    cursor: text;

    &:focus {
      outline: none;
    }
  }

  p {
    margin: 0 0 12px;

    &.is-editor-empty:first-child::before {
      color: ${oc.gray[6]};
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
`;
