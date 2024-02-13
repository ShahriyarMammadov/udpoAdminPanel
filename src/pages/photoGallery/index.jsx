import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Form,
  Image,
  Input,
  Popconfirm,
  Spin,
  message,
} from "antd";
import axios from "axios";

const PhotoCatalog = () => {
  const [form] = Form.useForm();
  const [coverImage, setCoverImage] = useState("");
  const [images, setİmages] = useState([]);
  const [galleryName, setGalleryName] = useState("");
  const [description, setDescription] = useState("");
  const [allGalleries, setAllGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliceCount, setSliceCount] = useState(4);

  const [messageApi, contextHolder] = message.useMessage();

  const getAllGallery = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://udpobackend-production.up.railway.app/gallery/getAllGallery`
      );
      setAllGalleries(data);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    getAllGallery();
  }, []);

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
      if (galleryName.length === 0 || description.length === 0) {
        return messageApi.info("Xanaları Tam Doldurun!!!");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      formData.append("name", galleryName);
      formData.append("description", description);
      images.forEach((image, index) => {
        formData.append("images", image);
      });
      const { data } = await axios.post(
        `https://udpobackend-production.up.railway.app/gallery/createGallery`,
        formData
      );
      setGalleryName("");
      setDescription("");
      setCoverImage("");
      setİmages([]);
      coverImageRef.current.value = null;
      imageRef.current.value = null;
      messageApi.success(data?.message);
      getAllGallery();
    } catch (error) {
      console.log(error?.response?.data?.message);
      messageApi.warning(error?.response?.data?.message);
      setLoading(false);

      setGalleryName("");
      setDescription("");
      setCoverImage("");
      setİmages([]);
      coverImageRef.current.value = null;
      imageRef.current.value = null;
    }
  };

  const confirm = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `https://udpobackend-production.up.railway.app/gallery/deleteGalleryByName/${id}`
      );
      messageApi.success(data?.message);
      getAllGallery();
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const cancel = () => {
    messageApi.error("Silinmədi");
  };

  return (
    <div id="photoGallery">
      {contextHolder}
      {loading ? (
        <Spin
          size="large"
          style={{
            width: "80vw",
            height: "92vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : allGalleries.length === 0 ? (
        <Empty description={false} />
      ) : (
        <div className="activeGalleries">
          <div className="cards">
            {allGalleries?.slice(0, sliceCount)?.map((e, i) => {
              const imageUrls = e?.images.map(
                (image) =>
                  `https://udpobackend-production.up.railway.app/images/${image}`
              );
              return (
                <div className="card">
                  <div className="image">
                    <Image.PreviewGroup items={imageUrls} key={i}>
                      <Image
                        src={`https://udpobackend-production.up.railway.app/images/${e?.coverImage}`}
                      />
                    </Image.PreviewGroup>
                  </div>
                  <div className="description">
                    <h3>
                      {e?.name.length > 28
                        ? e?.name?.slice(0, 28) + "..."
                        : e?.name}
                    </h3>
                    <p className="trash">
                      {e?.description?.length > 33
                        ? e?.description?.slice(0, 33) + "..."
                        : e?.description}
                      <Popconfirm
                        title="Qalereya"
                        description="Qalereya Həmişəlik Silinsin?"
                        onConfirm={() => {
                          confirm(e._id);
                        }}
                        onCancel={cancel}
                        okText="Sil"
                        cancelText="İmtina"
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </Popconfirm>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {allGalleries.length > 4 && allGalleries.length > sliceCount ? (
            <Button
              type="default"
              style={{ display: "block", margin: "20px auto" }}
              onClick={() => {
                setSliceCount(sliceCount + 4);
              }}
            >
              Daha Çox
            </Button>
          ) : null}
        </div>
      )}

      <Form form={form} layout="vertical">
        <Form.Item
          label="Qalereyanın adı"
          tooltip="Bu Hissədə Qalereyanın Adı Qeyd Edilməlidir"
        >
          <Input
            placeholder="Qalereyanın adı"
            value={galleryName}
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
            value={description}
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
