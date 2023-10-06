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
          label=">əkillər"
          tooltip={{
            title: "kjnj122334455667788990",
            icon: <InfoCircleOutlined />,
          }}
        >
          <input type="file" name="" id="" />
        </Form.Item>
        <Form.Item>
          <Button type="dashed">Əlavə Et</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhotoCatalog;
