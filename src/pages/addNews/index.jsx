import React, { useState, useRef } from "react";
import "./index.scss";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

const AddNews = () => {
  const [form] = Form.useForm();

  const [newsName, setNewsName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const coverImageRef = useRef(null);
  const editorRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const addNews = async () => {
    try {
      if (
        newsName.length === 0 ||
        coverImage.length === 0 ||
        description.length === 0
      ) {
        return message.error("Məlumatları Tam Daxil Edin!");
      }

      setLoading(true);

      const { data } = await axios.post(
        `https://udpobackend-production.up.railway.app/news/addNews`,
        { name: newsName, text: description, coverImage: coverImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      message.success(data?.message);
    } catch (error) {
      console.log(error?.response?.data);
      setLoading(false);
    }
  };

  return (
    <div id="addNewsPage">
      <p>Xəbər Haqqında</p>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={description}
        onEditorChange={(content, editor) => {
          setDescription(content);
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | casechange blocks | fontselect fontsizeselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help image insertdatetime link anchor | fullscreen visualblocks formatpainter searchreplace | powerpaste charmap",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <hr />
      <Form form={form} layout="vertical" style={{ paddingTop: "15px" }}>
        <Form.Item label="Xəbərin Başlığı">
          <Input
            placeholder="Xəbərin Başlığı"
            onChange={(e) => setNewsName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Xəbərin Şəkli">
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            ref={coverImageRef}
          />
        </Form.Item>
      </Form>
      <Button
        type="dashed"
        style={{ margin: "0 0 25px 0" }}
        onClick={addNews}
        loading={loading}
      >
        Xəbəri Əlavə Et
      </Button>
    </div>
  );
};

export default AddNews;
