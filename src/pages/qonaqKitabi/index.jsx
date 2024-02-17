import { Avatar, Empty, Popconfirm, Spin, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const QonaqKitabi = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const { data } = await axios.get(
        `https://udpobackend-production.up.railway.app/qonaqKitabi/allData`
      );

      setAllData(data);

      setLoading(false);
    } catch (error) {
      console.log(error, error?.response?.body);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://udpobackend-production.up.railway.app/qonaqKitabi/deleteData/${id}`
      );

      messageApi.success(data?.message);
      getAllData();
    } catch (error) {
      console.log(error, error?.response?.data);
    }
  };

  const cancel = () => {
    messageApi.error("Silinmədi");
  };

  return (
    <div style={{ padding: "0 10px" }}>
      {contextHolder}
      <h3>Yazılmış Qeydlər:</h3>

      {loading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        />
      ) : allData?.length === 0 ? (
        <Empty description={false} />
      ) : (
        <div className="commentCard" style={{ margin: "10px 0" }}>
          {allData?.map((e, i) => {
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
                        handleDelete(e?._id);
                      }}
                      onCancel={cancel}
                      okText="Sil"
                      cancelText="İmtina"
                    >
                      <i
                        className="fa-regular fa-trash-can"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </Popconfirm>
                  </div>

                  <p style={{ marginTop: "0" }}>{e?.text}</p>

                  {e?.phoneNumber ? (
                    <p style={{ marginTop: "0" }}>Tel: {e?.phoneNumber}</p>
                  ) : (
                    <p></p>
                  )}

                  <p style={{ marginTop: "0" }}>Email: {e?.email}</p>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      )}
      {/* {allData?.length === 0 ? (
        <Empty description={false} />
      ) : (
        <div className="commentCard" style={{ margin: "10px 0" }}>
          {allData?.map((e, i) => {
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
                        handleDelete(e?._id);
                      }}
                      onCancel={cancel}
                      okText="Sil"
                      cancelText="İmtina"
                    >
                      <i
                        className="fa-regular fa-trash-can"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </Popconfirm>
                  </div>

                  <p style={{ marginTop: "0" }}>{e?.text}</p>

                  {e?.phoneNumber ? (
                    <p style={{ marginTop: "0" }}>Tel: {e?.phoneNumber}</p>
                  ) : (
                    <p></p>
                  )}

                  <p style={{ marginTop: "0" }}>Email: {e?.email}</p>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      )} */}
    </div>
  );
};

export default QonaqKitabi;
