import React from "react";
import "./index.scss";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";

const AddNews = () => {
  const [form] = Form.useForm();
  const [newsName, setNewsName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const coverImageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.tiny.cloud/1/ubi7n564p1comz3dlixynydqr3zru69owy9nxakf6xkfzseu/tinymce/6/tinymce.min.js";
    script.referrerPolicy = "origin";
    script.async = true;
    script.onload = () => {
      tinymce.init({
        selector: "textarea",
        plugins:
          "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
      });
    };
    document.body.appendChild(script);

    return () => {
      tinymce.remove("textarea");
    };
  }, []);

  const handleGetContent = async () => {
    const content = tinymce.get("your-textarea-id").getContent();
    console.log("TinyMCE İçeriği:", content);

    const formData = new FormData();
    formData.append("coverImage", coverImage);
    formData.append("name", newsName);

    try {
      const { data } = await axios.post(
        `http://localhost:3000/gallery/getAllGallery`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="addNewsPage">
      <textarea id="your-textarea-id">..........</textarea>
      <hr />
      <Form form={form} layout="vertical" style={{ paddingTop: "15px" }}>
        <Form.Item label="Xəbərin Başlığı">
          <Input
            placeholder="Xəbərin Başlığı"
            onChange={(e) => [setNewsName(e.target.value)]}
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
        onClick={handleGetContent}
      >
        Xəbəri Əlavə Et
      </Button>
    </div>
  );
};

export default AddNews;
