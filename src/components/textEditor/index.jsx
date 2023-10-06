import React, { useState, useCallback } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function TextEditor() {
  const [value, setValue] = useState(EditorState.createEmpty());

  const handleChange = useCallback((editorState) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    console.log(draftToHtml(raw));
    setValue(editorState);
  }, []);

  return (
    <section style={{ padding: "20px 0" }}>
      <h1>Yeni Xəbər Əlavə Et</h1>
      <Editor
        editorState={value}
        editorClassName="editor"
        onEditorStateChange={handleChange}
      />
      <hr />
    </section>
  );
}
