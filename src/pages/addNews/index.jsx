import React from "react";
import "./index.scss";
import { Form } from "antd";
import { useEffect } from "react";

const AddNews = () => {
  const [form] = Form.useForm();

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

  const handleGetContent = () => {
    const content = tinymce.get("your-textarea-id").getContent();
    console.log("TinyMCE İçeriği:", content);
  };

  return (
    <div id="addNewsPage">
      <textarea id="your-textarea-id">Welcome to TinyMCE!</textarea>
      <hr />
      <Form form={form} layout="vertical" style={{ paddingTop: "15px" }}>
        <Form.Item label="Xəbərin Şəkli">
          <input type="file" accept="image/*" />
        </Form.Item>
      </Form>
      <button onClick={handleGetContent}>İçeriği Al</button>
    </div>
  );
};

export default AddNews;
