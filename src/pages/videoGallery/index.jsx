import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const VideoCatalog = () => {
  const [form] = Form.useForm();

  return (
    <div id="VideoCatalog">
      <Form form={form} layout="vertical">
        <Form.Item
          label="Video Qalereyanın adı"
          tooltip="Bu Hissədə Video Qalereyanın Adı Qeyd Edilməlidir"
        >
          <Input placeholder="Video Qalereyanın adı" />
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
            accept="video/*"
          />
        </Form.Item>
        <Form.Item
          label="Video"
          tooltip={{
            title: "Video",
            icon: <InfoCircleOutlined />,
          }}
        >
          <input type="file" name="images" id="images" accept="video/*" />
        </Form.Item>
        <Form.Item>
          <Button type="dashed">Əlavə Et</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VideoCatalog;
