import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import { Button, Form, Input, message, Card, Popconfirm } from "antd";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { DeleteOutlined } from "@ant-design/icons";

const AddNews = () => {
  const [form] = Form.useForm();

  const [newsName, setNewsName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNewsID, setAddSelectedNewsID] = useState("");
  const [selectedNews, setSelectedNews] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const coverImageRef = useRef(null);
  const editorRef = useRef(null);

  const getSelectedNews = async () => {
    try {
      const { data } = await axios.get(
        `https://udpobackend-production.up.railway.app/selectedNews/getAllSelectedNews`
      );
      setSelectedNews(data?.data);
    } catch (error) {
      console.log(error, error?.response?.data);
    }
  };

  useEffect(() => {
    getSelectedNews();
  }, []);

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
        return messageApi.error("Məlumatları Tam Daxil Edin!");
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
      messageApi.success(data?.message);
    } catch (error) {
      console.log(error?.response?.data);
      setLoading(false);
    }
  };

  const handleDeleteSelectedNews = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `https://udpobackend-production.up.railway.app/selectedNews/removeNameFromSelectedNews`,
        {
          newsID: id,
        }
      );

      setLoading(false);

      messageApi.success(data?.message);
    } catch (error) {
      console.log(error, error?.response?.data);
      setLoading(false);
    }
  };

  const addSelectedNews = async () => {
    try {
      setLoading(true);

      if (selectedNewsID?.length < 6) {
        return messageApi.error("id daxil edilməyib!!!");
      }

      const { data } = await axios.post(
        `https://udpobackend-production.up.railway.app/selectedNews/addNameToSelectedNews`,
        {
          newsID: selectedNewsID,
        }
      );

      messageApi.success(data?.message);

      setLoading(false);
    } catch (error) {
      console.log(error, error?.response?.data);
      messageApi.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div id="addNewsPage">
      {contextHolder}
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

      <h3>Seçilmiş Xəbərlər</h3>
      <div
        style={{
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {selectedNews?.map((e, i) => {
          return (
            <Card
              key={e?._id}
              style={{
                width: 300,
              }}
              cover={
                <img
                  alt={e?.name}
                  src={`https://udpobackend-production.up.railway.app/images/${e?.coverImage}`}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
              actions={[
                <Popconfirm
                  title="Ana səhifədə olan seçilmiş xəbərlərdən silinsin?"
                  onConfirm={() => {
                    handleDeleteSelectedNews(e?._id);
                  }}
                  okText="SİL"
                  cancelText="İMTİNA"
                >
                  <DeleteOutlined key="delete" />,
                </Popconfirm>,
                // <EditOutlined key="edit" />,
                // <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              {/* <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title="Card title"
                description="This is the description"
              /> */}
              <p>{e?._id}</p>
              <p>
                {e?.name?.length > 150
                  ? e?.name?.slice(0, 150) + " " + "....."
                  : e?.name}
              </p>
            </Card>
          );
        })}

        <Input
          placeholder="Xəbərin İD-si"
          onChange={(e) => {
            setAddSelectedNewsID(e?.target?.value);
          }}
        />
        <Button
          type="primary"
          onClick={() => addSelectedNews()}
          loading={loading}
        >
          Əlavə Et
        </Button>
      </div>
    </div>
  );
};

export default AddNews;
