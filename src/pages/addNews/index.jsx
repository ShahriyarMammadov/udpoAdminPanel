import React from "react";
import "./index.scss";
import TextEditor from "../../components/textEditor";
import { Form } from "antd";

const AddNews = () => {
  const [form] = Form.useForm();

  return (
    <div id="addNewsPage">
      <TextEditor />
      <Form form={form} layout="vertical" style={{ paddingTop: "15px" }}>
        <Form.Item label="Xəbərin Şəkli">
          <input placeholder="Sorğu Cavabları" type="file" accept="image/*" />
        </Form.Item>
      </Form>
      <hr />
    </div>
  );
};

export default AddNews;
