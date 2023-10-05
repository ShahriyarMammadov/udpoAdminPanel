import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const Sorgu = () => {
  const [form] = Form.useForm();

  return (
    <div id="sorgu">
      <Form form={form} layout="vertical">
        <Form.Item
          label="Sorğunun Başlığı"
          tooltip="Bu Hissədə Sorğunun Adı Qeyd Edilməlidir"
        >
          <Input placeholder="Sorğunun Başlığı" />
        </Form.Item>
        <hr />
        <p style={{ fontWeight: "700" }}>Cavablar</p>
        <Form.Item
          label="1-ci Cavab"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="2-ci Cavab"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="3-ci Cavab"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="4-ci Cavab"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="5-ci Cavab"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item>
          <Button type="dashed">Əlavə Et</Button>
        </Form.Item>
      </Form>

      <hr />
      <h2>Əvvəlki Sorğular və Nəticələri</h2>

      <Form form={form} layout="vertical" disabled>
        <Form.Item label="Sorğunun Başlığı">
          <Input placeholder="Sorğunun Başlığı" />
        </Form.Item>
        <hr />
        <p style={{ fontWeight: "700" }}>Cavablar</p>
        <Form.Item label="1-ci Cavab">
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item label="2-ci Cavab">
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item label="3-ci Cavab">
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item label="4-ci Cavab">
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item label="5-ci Cavab">
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item>
          <Button type="dashed">Əlavə Et</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Sorgu;
