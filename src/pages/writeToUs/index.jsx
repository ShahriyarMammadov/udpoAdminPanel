import React, { useEffect, useState } from "react";
import { List, Popconfirm, message } from "antd";
import axios from "axios";
import LoadingComponent from "../../components/loading";

const WriteToUs = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  // POPCONFİRM
  const confirm = () => {
    message.success("Silindi");
  };
  const cancel = () => {
    message.error("Sİlinmədi");
  };

  const getWriteToUsData = async () => {
    try {
      const { data } = await axios.get(
        `https://udpobackend-production.up.railway.app/writeToUs/allWriteToUs`
      );
      setList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWriteToUsData();
  }, []);

  return (
    <div id="allMessages">
      {loading ? (
        <LoadingComponent />
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
                    onConfirm={confirm}
                    onCancel={cancel}
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
                    <p>
                      Tarix:{" "}
                      {item?.createdAt?.replace("T", " - ")?.slice(0, 21)}
                    </p>
                    <p>{item?.text}</p>
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
