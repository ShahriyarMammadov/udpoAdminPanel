import { Avatar, Empty, Popconfirm, message } from "antd";
import axios from "axios";
import React from "react";

const QonaqKitabi = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const fakeData = [
    {
      fullName: "Shahriyar Mammadov",
      email: "shahriyarmammadov16@gmail.com",
      phoneNumber: "+994503134473",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    },
    {
      fullName: "Elman Asgarov",
      email: "elmanasgarov@gmail.com",
      phoneNumber: "+994554844848",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    },
  ];

  const handleDelete = async (id) => {
    try {
      console.log(id);
      // const { data } = await axios.delete(
      //   `https://udpobackend-production.up.railway.app/qonaqkitabi/deleteqonaqkitabi/${id}`
      // );
      // console.log(data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const cancel = () => {
    messageApi.error("Silinmədi");
  };

  return (
    <div style={{ padding: "0 10px" }}>
      {contextHolder}
      <h3>Yazılmış Qeydlər:</h3>

      {fakeData.length === 0 ? (
        <Empty description={false} />
      ) : (
        <div className="commentCard" style={{ margin: "10px 0" }}>
          {fakeData?.map((e, i) => {
            return (
              <>
                <div key={i} style={{ margin: "15px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "10px 0",
                    }}
                  >
                    <Avatar size={50}>
                      {e?.fullName?.split(" ").map((name) => name.slice(0, 1))}
                    </Avatar>

                    <h5 style={{ fontWeight: "700", fontSize: "18px" }}>
                      {e?.fullName}
                    </h5>

                    <Popconfirm
                      title="Qonaq Kitabı"
                      description="Mesaj Həmişəlik Silinsin?"
                      onConfirm={() => {
                        handleDelete(i);
                      }}
                      onCancel={cancel}
                      okText="Sil"
                      cancelText="İmtina"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </Popconfirm>
                  </div>

                  <p style={{ marginTop: "0" }}>{e?.message}</p>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QonaqKitabi;
