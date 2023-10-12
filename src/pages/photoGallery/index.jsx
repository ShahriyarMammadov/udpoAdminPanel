import React, { useRef, useState } from "react";
import "./index.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

const PhotoCatalog = () => {
  const [form] = Form.useForm();
  const [coverImage, setCoverImage] = useState("");
  const [images, setİmages] = useState([]);
  const [galleryName, setGalleryName] = useState("");
  const [description, setDescription] = useState("");

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
      console.log(images);
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      formData.append("name", galleryName);
      formData.append("description", description);
      images.forEach((image, index) => {
        formData.append("images", image);
      });
      const { data } = await axios.post(
        `http://localhost:3000/gallery/createGallery`,
        formData
      );
      setGalleryName("");
      setDescription("");
      setCoverImage("");
      setİmages([]);
      coverImageRef.current.value = null;
      imageRef.current.value = null;
      message.success(data?.message);

      console.log(data);
    } catch (error) {
      console.log(error);
      setGalleryName("");
      setDescription("");
      setCoverImage("");
      setİmages([]);
      coverImageRef.current.value = null;
      imageRef.current.value = null;
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
          <Input
            placeholder="Qalereyanın adı"
            onChange={(e) => {
              setGalleryName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Qalereya Haqqında Məlumat"
          tooltip="Bu Hissədə Qalereya Haqqında Məlumat Əlavə Edilməlidir"
        >
          <Input
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
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
          <Button type="dashed" onClick={addGallery}>
            Əlavə Et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhotoCatalog;
