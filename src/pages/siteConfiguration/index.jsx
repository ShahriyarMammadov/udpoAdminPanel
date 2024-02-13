import React, { useEffect, useState } from "react";
import "./index.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import LoadingComponent from "../../components/loading";

const SiteConfiguration = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const getContactData = async () => {
    try {
      const { data } = await axios.get(
        `https://udpobackend-production.up.railway.app/contact/getContactData`
      );
      setFullName(data?.fullName);
      setLocation(data?.location);
      setPhoneNumber(data?.phoneNumber);
      setEmail(data?.email);

      setLoading(false);
    } catch (error) {
      console.log(error?.response?.datad);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContactData();
  }, []);

  // EDIT CONTACT DATA
  const editContactData = async () => {
    try {
      if (
        fullName.length === 0 ||
        location.length === 0 ||
        phoneNumber.length === 0 ||
        email.length === 0
      ) {
        return messageApi.info("Xanalar Boş Ola Bilməz!!!");
      }
      setBtnLoading(true);
      const { data } = await axios.patch(
        `https://udpobackend-production.up.railway.app/contact/editContactData/6521b141815866067a8386be`,
        {
          fullName: fullName,
          location: location,
          email: email,
          phoneNumber: phoneNumber,
        }
      );
      setBtnLoading(false);
      messageApi.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="siteConfiguration">
      {contextHolder}
      <h4>Əlaqə Vasitələri</h4>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item label="Əlaqədar Şəxs" tooltip="Əlaqədar Şəxs">
            <Input
              placeholder="Əlaqədar Şəxs"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            tooltip={{
              title: "Email",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Əlaqə Nömrəsi"
            tooltip={{
              title: "Əlaqə Nömrəsi",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              placeholder="Əlaqə Nömrəsi"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Ünvan"
            tooltip={{
              title: "Ünvan Məlumatları",
              icon: <InfoCircleOutlined />,
            }}
          >
            <TextArea
              placeholder="Ünvan Məlumatları"
              allowClear
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={editContactData}
              loading={btnLoading}
              disabled={!fullName && !email && !phoneNumber && !location}
            >
              Dəyiş
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default SiteConfiguration;
