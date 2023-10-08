import React from "react";
import "./index.scss";
import TextEditor from "../../components/textEditor";
import { Form } from "antd";
import { useSelector } from "react-redux";

const AddNews = () => {
  const [form] = Form.useForm();

  const textEditorStateValue = useSelector(
    (state) => state.getTextEditorValueReducer
  );
  console.log("sdfas", textEditorStateValue);

  return (
    <div id="addNewsPage">
      <TextEditor />
      <Form form={form} layout="vertical" style={{ paddingTop: "15px" }}>
        <Form.Item label="Xəbərin Şəkli">
          <input type="file" accept="image/*" />
        </Form.Item>
      </Form>
      <hr />
    </div>
  );
};

export default AddNews;
