import React, { useEffect, useState } from "react";
import "./index.scss";
import { Form, Input, List, Select, Button, message, Popconfirm } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import LoadingComponent from "../../components/loading";

const FaydaliLinkler = () => {
  const [form] = Form.useForm();

  const [target, setTarget] = useState("_blank");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [faydaliLinks, setfaydaliLinks] = useState([]);

  const handleChange = (value) => {
    setTarget(value);
  };

  const getFaydaliLinks = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/faydaliLink/getFaydaliLink`
      );
      setfaydaliLinks(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaydaliLinks();
  }, []);

  const addFaydaliLink = async () => {
    try {
      if (name.length === 0 || url.length === 0) {
        return message.warning("Bütün Xanaları Doldurun!");
      }
      setBtnLoading(true);
      const { data } = await axios.post(
        `http://localhost:3000/faydaliLink/addFaydaliLink`,
        {
          name: name,
          url: url,
          target: target,
        }
      );
      getFaydaliLinks();
      message.success(data.message);
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };

  const confirm = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/faydaliLink/deleteLinkById/${id}`,
        {
          name: name,
          url: url,
          target: target,
        }
      );
      getFaydaliLinks();
      message.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = () => {
    message.error("Silinmədi");
  };

  return (
    <div id="faydaliLinklerPage">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="activeLinks">
          <List
            header={<div style={{ fontWeight: "700" }}>Mövcud Linklər</div>}
            footer={
              <div style={{ fontWeight: "700" }}>
                <Form
                  form={form}
                  layout="vertical"
                  style={{ paddingTop: "15px" }}
                >
                  <Form.Item
                    label="Linkin Adı"
                    tooltip={{
                      title: "Linkin Adı",
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <Input
                      placeholder="Linkin Adı"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="URL"
                    tooltip={{
                      title: "Link",
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <Input
                      placeholder="URL"
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Target"
                    tooltip={{
                      title: "target",
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <Select
                      defaultValue="_blank"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "_blank",
                          label: "_blank",
                        },
                        {
                          value: "_self",
                          label: "_self",
                        },
                        {
                          value: "_parent",
                          label: "_parent",
                        },
                        {
                          value: "_top",
                          label: "_top",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={addFaydaliLink}
                      loading={btnLoading}
                    >
                      Əlavə Et
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            }
            bordered
            dataSource={faydaliLinks}
            renderItem={(item) => (
              <List.Item>
                <div
                  style={{
                    display: "flex",
                    gap: "100px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "300px",
                      maxWidth: "300px",
                    }}
                  >
                    <span>{item?.name}</span>
                  </div>
                  <div
                    style={{
                      minWidth: "300px",
                      maxWidth: "300px",
                    }}
                  >
                    <a href={item?.url} target={item?.target}>
                      {item?.url}
                    </a>
                  </div>
                  <div style={{ minWidth: "150px", maxWidth: "155px" }}>
                    <span>{item?.target}</span>
                  </div>
                  <div>
                    <Popconfirm
                      title="Faydalı Link"
                      description="Faydalı Link Silinsin?"
                      onConfirm={() => {
                        confirm(item?._id);
                      }}
                      onCancel={cancel}
                      loading={btnLoading}
                      okText="Sil"
                      cancelText="İmtina"
                    >
                      <i
                        className="fa-solid fa-trash-can"
                        style={{ cursor: "pointer", fontSize: "16px" }}
                      ></i>
                    </Popconfirm>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default FaydaliLinkler;
