import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import { Button, Col, Input, Popconfirm, Space, Statistic, Table } from "antd";
import Highlighter from "react-highlight-words";

const NewsTableComponent = () => {
  const [loading, setLoading] = useState(true);

  const data = [
    {
      key: "1",
      name: "Müharibədə əlil olan şəxslərə Azərbaycan Respublikası Prezidentinin təqaüdü",
      date: "13/12/2023",
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "“Maddi-mədəni irsimizin qorunması” qısametrajlı sənədli filmin təqdimatı keçirilib.",
      date: "10/12/2023",
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "“Yeniyetmə velosipedçilərin təhlükəsizliyi liə bağlı tədbirlərin təşkili ” layihəsi bitirmişdir.",
      date: "9/12/2023",
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
    {
      key: "5",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
    {
      key: "6",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
    {
      key: "7",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
    {
      key: "8",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
    {
      key: "9",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
    {
      key: "10",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
    {
      key: "11",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
    {
      key: "12",
      name: "QARABAĞ AZƏRBAYCANDIR!",
      date: "13/12/2023",
      address: "London No. 2 Lake Park",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  // DELETE
  const handleDelete = async () => {
    try {
    } catch (error) {
      console.log(error);
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
      width: "80%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Tarix",
      dataIndex: "date",
      key: "date",
      width: "10%",
      ...getColumnSearchProps("date"),
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Redaktə",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Popconfirm
              title="Bu Xəbəri Silmək İstədiyinizdən Əminsiniz?"
              onConfirm={() => handleDelete()}
              okText="SİL"
              cancelText="İMTİNA"
            >
              <i
                className="fa-regular fa-trash-can"
                style={{ fontSize: "18px", cursor: "pointer" }}
              ></i>
            </Popconfirm>
            <i
              className="fa-regular fa-pen-to-square"
              style={{ fontSize: "18px", cursor: "pointer" }}
            ></i>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <h1>Yeni xeber elave et</h1>
      <Statistic
        title="Ümumi Xəbərlərin Sayı:"
        value={data?.length}
        style={{ paddingBottom: "20px" }}
      />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default NewsTableComponent;
