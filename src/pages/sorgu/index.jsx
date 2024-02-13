import React, { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import "./index.scss";
import LoadingComponent from "../../components/loading";

const Sorgu = () => {
  const [form] = Form.useForm();
  const [sorguData, setSorguData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [checkActiveSorgu, setCheckActiveSorgu] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const getSorguAllData = async () => {
    try {
      const { data } = await axios.get(
        `https://udpobackend-production.up.railway.app/sorgu/getAllSorgu`
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

  // CREATE SORGU
  const [name, setName] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setExpirationDate(selectedDate);
  };

  const createSorgu = async () => {
    try {
      if (
        expirationDate.length === 0 ||
        name.length === 0 ||
        option1.length === 0 ||
        option2.length === 0 ||
        option3.length === 0 ||
        option4.length === 0 ||
        option5.length === 0
      ) {
        return messageApi.error("Zəhmət Olmasa Xanaları Tam Doldurun!");
      }

      const { data } = await axios.post(
        `https://udpobackend-production.up.railway.app/sorgu/createSorgu`,
        {
          name: name,
          expirationDate: expirationDate + "T00:00:00.000+00:00",
          options: [
            { option: option1 },
            { option: option2 },
            { option: option3 },
            { option: option4 },
            { option: option5 },
          ],
        }
      );

      messageApi.success(data?.message);
      getSorguAllData();
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const resetSorgu = async (sorguObject) => {
    try {
      setName(sorguObject?.name);
      setOption1(sorguObject?.options[0].option);
      setOption2(sorguObject?.options[1].option);
      setOption3(sorguObject?.options[2].option);
      setOption4(sorguObject?.options[3].option);
      setOption5(sorguObject?.options[4].option);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="sorgu">
      {contextHolder}
      <Form form={form} layout="vertical" disabled={loading}>
        <Form.Item
          label="Sorğunun Başlığı"
          tooltip="Bu Hissədə Sorğunun Adı Qeyd Edilməlidir"
        >
          <Input
            placeholder="Sorğunun Başlığı"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
          <Input
            placeholder="Sorğu Cavabları"
            value={option1}
            onChange={(e) => {
              setOption1(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="2-ci Cavab"
          tooltip={{
            title: "Sorğunun 2-ci Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input
            placeholder="Sorğu Cavabları"
            value={option2}
            onChange={(e) => {
              setOption2(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="3-cü Cavab"
          tooltip={{
            title: "Sorğunun 3-cü Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input
            placeholder="Sorğu Cavabları"
            value={option3}
            onChange={(e) => {
              setOption3(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="4-cü Cavab"
          tooltip={{
            title: "Sorğunun 4-cü Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input
            placeholder="Sorğu Cavabları"
            value={option4}
            onChange={(e) => {
              setOption4(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="5-ci Cavab"
          tooltip={{
            title: "Sorğunun 5-ci Cavabı",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input
            placeholder="Sorğu Cavabları"
            value={option5}
            onChange={(e) => {
              setOption5(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Sonuncu Tarix"
          tooltip={{
            title: "Sorğunun Bitəcəyi Tarix",
            icon: <InfoCircleOutlined />,
          }}
        >
          <input
            type="date"
            placeholder="Sonuncu Tarix"
            onChange={handleDateChange}
            value={expirationDate}
          />
        </Form.Item>
        <Form.Item>
          <Button type="dashed" onClick={createSorgu} loading={loading}>
            Əlavə Et
          </Button>
        </Form.Item>
      </Form>

      <hr />
      <h2>Əvvəlki Sorğular və Nəticələri</h2>

      {loading ? (
        <LoadingComponent />
      ) : (
        sorguData?.map((sorgu) => (
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
            <Button
              onClick={() => {
                resetSorgu(sorgu);
              }}
            >
              Sorğunu Təkrarla
            </Button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Sorgu;
