import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Statistic,
  Table,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import AddNews from "../../pages/addNews";
import axios from "axios";
import { useEffect } from "react";

const NewsTableComponent = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  // ALLNEWS
  const [data, setData] = useState([]);

  const getAllNews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://udpobackend-production.up.railway.app/news/allNews`
      );
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      console.log(id);
      setLoading(true);
      const { data } = await axios.delete(
        `https://udpobackend-production.up.railway.app/news/deleteNewsById/${id}`
      );
      getAllNews();

      messageApi.success(data?.message);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Azərbaycan Dilində Olan Xəbərlər",
      dataIndex: "name",
      key: "name",
      width: "78%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Tarix",
      dataIndex: "date",
      key: "date",
      width: "20%",
      ...getColumnSearchProps("date"),
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sil",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Popconfirm
              title="Bu Xəbəri Silmək İstədiyinizdən Əminsiniz?"
              onConfirm={() => {
                handleDelete(record?._id);
              }}
              okText="SİL"
              cancelText="İMTİNA"
            >
              <i
                className="fa-regular fa-trash-can"
                style={{ fontSize: "18px", cursor: "pointer" }}
              ></i>
            </Popconfirm>
            {/* <i
              className="fa-regular fa-pen-to-square"
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => {
                handleEdit(record);
              }}
            ></i> */}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <AddNews />

      <Statistic
        title="Ümumi Xəbərlərin Sayı:"
        value={data?.length}
        style={{ paddingBottom: "20px" }}
      />
      <Table columns={columns} dataSource={data} loading={loading} />
    </>
  );
};

export default NewsTableComponent;
