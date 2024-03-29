import React, { useEffect, useState } from "react";
import { List, Popconfirm, Spin, message } from "antd";
import axios from "axios";

const WriteToUs = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  // POPCONFİRM

  const getWriteToUsData = async () => {
    try {
      const { data } = await axios.get(
        `https://udpobackend-production.up.railway.app/writeToUs/allWriteToUs`
      );
      setList(data);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    getWriteToUsData();
  }, []);

  const deleteWriteToUs = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `https://udpobackend-production.up.railway.app/writeToUs/deleteWriteTous/${id}`
      );
      messageApi.success(`${data?.message}`);
      setLoading(false);
      getWriteToUsData();
    } catch (error) {
      console.log(error?.response?.data);
      messageApi.error("Xəta");
    }
  };

  return (
    <div id="allMessages">
      {contextHolder}
      {loading ? (
        <Spin
          size="large"
          style={{
            width: "80vw",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">
                  <Popconfirm
                    title="Mesaj Həmişəlik Silinsin?"
                    description="Mesaj Həmişəlik Silindikdə Geri Qaytarılmayacaq."
                    okText="Sil"
                    cancelText="İmtina"
                    onConfirm={() => {
                      deleteWriteToUs(item?._id);
                    }}
                    onCancel={() => {
                      message.warning("Sİlinmədi");
                    }}
                  >
                    Sil
                  </Popconfirm>
                </a>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Ad və Soyad: {item?.fullName}</h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "40px",
                      }}
                    >
                      <h4>Mail: {item?.email}</h4>
                      <h4>Telefon: {item?.phoneNumber}</h4>
                    </div>
                  </div>
                }
                description={
                  <>
                    <p>{item?.text}</p>

                    <p>
                      Tarix:{" "}
                      {item?.createdAt?.replace("T", " - ")?.slice(0, 21)}
                    </p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default WriteToUs;
