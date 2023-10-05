import React, { useState } from "react";
import "./index.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const SiteConfiguration = () => {
  const [form] = Form.useForm();

  return (
    <div id="siteConfiguration">
      <Form form={form} layout="vertical">
        <Form.Item label="Field A" required tooltip="This is a required field">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          label="Field B"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SiteConfiguration;
