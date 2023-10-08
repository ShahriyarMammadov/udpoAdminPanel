import React, { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import axios from "axios";
import "./index.scss";

const Sorgu = () => {
  const [form] = Form.useForm();
  const [sorguData, setSorguData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSorguAllData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/sorgu/getAllSorgu`
      );

      setSorguData(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSorguAllData();
  }, []);

  console.log(sorguData);

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
            title: "Sorğunun 1-ci Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="2-ci Cavab"
          tooltip={{
            title: "Sorğunun 2-ci Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="3-ci Cavab"
          tooltip={{
            title: "Sorğunun 3-cü Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="4-ci Cavab"
          tooltip={{
            title: "Sorğunun 4-cü Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="5-ci Cavab"
          tooltip={{
            title: "Sorğunun 5-ci Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Sorğu Cavabları" />
        </Form.Item>
        <Form.Item
          label="Sonuncu Tarix"
          tooltip={{
            title: "Sorğunun Bitəcəyi Tarix",
            icon: <InfoCircleOutlined />,
          }}
        >
          <DatePicker renderExtraFooter={() => "Sorğunun Bitəcəyi Tarix"} />
        </Form.Item>
        <Form.Item>
          <Button type="dashed">Əlavə Et</Button>
        </Form.Item>
      </Form>

      <hr />
      <h2>Əvvəlki Sorğular və Nəticələri</h2>

      {sorguData?.map((sorgu) => (
        <div key={sorgu._id} id="dataList">
          <div className="dataHeader">
            <h4>
              Sorğunun Başlığı: <span>{sorgu?.name}</span>
            </h4>
            <div className="dataDate">
              <p>
                <span>Tarix: </span> {sorgu?.createdAt?.slice(0, 10)}
              </p>
              <p>
                <span>Son Tarix: </span> {sorgu?.expirationDate?.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="dataContent">
            <div>
              {sorgu?.options?.map((e, index) => {
                return (
                  <p key={index}>
                    {e?.option} - <span>Cavab Verənlərin Sayı:</span>{" "}
                    {e?.voteCount}
                  </p>
                );
              })}
            </div>
            <div>
              {sorgu?.result?.map((e, index) => {
                return <p key={index}>- {e?.percentage} %</p>;
              })}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Sorgu;
