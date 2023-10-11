import React, { useRef, useState } from "react";
import "./index.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";

const PhotoCatalog = () => {
  const [form] = Form.useForm();
  const [coverImage, setCoverImage] = useState("");
  const [images, setİmages] = useState([]);
  const [galleryName, setGalleryName] = useState("");

  const coverImageRef = useRef(null);
  const imageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleImagesChange = (e) => {
    const selectedFiles = e.target.files;
    const newImages = Array.from(selectedFiles);
    setİmages([...images, ...newImages]);
  };

  const addGallery = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/gallery/getContactData`
      );
      setGalleryName("");
      setCoverImage("");
      setİmages([]);
      coverImageRef.current.value = null;
      imageRef.current.value = null;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="photoGallery">
      <div className="activeGalleries">
        <div className="cards">
          <div className="card"></div>
        </div>
      </div>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Qalereyanın adı"
          tooltip="Bu Hissədə Qalereyanın Adı Qeyd Edilməlidir"
        >
          <Input placeholder="Qalereyanın adı" />
        </Form.Item>
        <Form.Item
          label="Qalereyanın Örtük Şəkli"
          tooltip={{
            title: "Örtük Şəkli",
            icon: <InfoCircleOutlined />,
          }}
        >
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            ref={coverImageRef}
          />
        </Form.Item>
        <Form.Item
          label="Şəkillər"
          tooltip={{
            title: "Qalereya Şəkilləri",
            icon: <InfoCircleOutlined />,
          }}
        >
          <input
            type="file"
            name="images"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            ref={imageRef}
          />
        </Form.Item>
        <Form.Item>
          <Button type="dashed">Əlavə Et</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhotoCatalog;
