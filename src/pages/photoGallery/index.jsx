import React from "react";
import "./index.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const PhotoCatalog = () => {
  const [form] = Form.useForm();

  return (
    <div id="photoGallery">
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
          />
        </Form.Item>
        <Form.Item
          label="Şəkillər"
          tooltip={{
            title: "Qalereya Şəkilləri",
            icon: <InfoCircleOutlined />,
          }}
        >
          <input type="file" name="images" id="images" accept="image/*" />
        </Form.Item>
        <Form.Item>
          <Button type="dashed">Əlavə Et</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhotoCatalog;
