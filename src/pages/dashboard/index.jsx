import React, { useState } from "react";
import "./index.scss";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Layout, Menu, theme } from "antd";
import NewsTableComponent from "../../components/newsTable";
import SiteConfiguration from "../siteConfiguration";
import WriteToUs from "../writeToUs";
import PhotoGallery from "../photoGallery";
import SubMenu from "antd/es/menu/SubMenu";
import QonaqKitabi from "../qonaqKitabi";
import Sorgu from "../sorgu";
import VideoCatalog from "../videoGallery";
import FaydaliLinkler from "../faydaliLinkler";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashBoardPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/");
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/checkAdmin",
          {},
          {
            withCredentials: true,
          }
        );

        if (!data?.status) {
          removeCookie("jwt");
          navigate("/");
        }
      }
    };

    verifyUser();
  }, [cookies, removeCookie, navigate]);

  const { Header, Content, Footer, Sider } = Layout;
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const [menuItems, setMenuItems] = useState([
    {
      key: "1",
      title: "Xəbərlər",
      icon: <i className="fa-regular fa-newspaper"></i>,
    },
    {
      key: "2",
      title: "Sayt Tənzimləmələri",
      icon: <i className="fa-solid fa-screwdriver-wrench"></i>,
      subMenu: [
        {
          key: "2-1",
          title: "Əlaqə Vasitələri",
          icon: <i className="fa-regular fa-address-book"></i>,
        },
        {
          key: "2-2",
          title: "Faydalı Linklər",
          icon: <i className="fa-solid fa-link"></i>,
        },
      ],
    },
    {
      key: "3",
      title: "Müraciətlər",
      icon: <i className="fa-regular fa-envelope"></i>,
    },
    {
      key: "4",
      title: "Qalereya",
      icon: <i className="fa-regular fa-images"></i>,
      subMenu: [
        {
          key: "4-1",
          title: "Foto Qalereya Yarat",
          icon: <i className="fa-regular fa-image"></i>,
        },
        // {
        //   key: "4-2",
        //   title: "Video Qalereya Yarat",
        //   icon: <i className="fa-solid fa-video"></i>,
        // },
      ],
    },
    {
      key: "5",
      title: "Qonaq Kitabı",
      icon: <i className="fa-regular fa-comments"></i>,
    },
    {
      key: "6",
      title: "Sorğu Yarat",
      icon: <i className="fa-solid fa-square-poll-vertical"></i>,
    },
  ]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = async (item) => {
    setSelectedMenuItem(item.key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <NewsTableComponent />;
      case "2-1":
        return <SiteConfiguration />;
      case "2-2":
        return <FaydaliLinkler />;
      case "3":
        return <WriteToUs />;
      case "4-1":
        return <PhotoGallery />;
      case "4-2":
        return <VideoCatalog />;
      case "5":
        return <QonaqKitabi />;
      case "6":
        return <Sorgu />;

      default:
        return null;
    }
  };

  // HEADER
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <a
            onClick={() => {
              removeCookie("jwt");
              // navigate("/");
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a>Çıxış</a>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </a>
        </>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{
            marginTop: "70px",
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={handleMenuClick}
          >
            {menuItems.map((item) =>
              item?.subMenu ? (
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                  {item?.subMenu?.map((subItem) => (
                    <Menu.Item key={subItem.key} icon={subItem.icon}>
                      {subItem.title}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.title}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: colorBgContainer,
              position: "fixed",
              zIndex: "150",
              top: 0,
              right: 0,
              left: 0,
            }}
          >
            <div
              className="container"
              style={{
                maxWidth: "1600px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ margin: 0 }}>Admin Panel</h2>
              <div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  arrow={{
                    pointAtCenter: true,
                  }}
                >
                  <Badge count={1}>
                    <Avatar shape="square" icon={<UserOutlined />} />
                  </Badge>
                </Dropdown>
              </div>
            </div>
          </Header>

          <Content
            style={{
              margin: "70px 16px 0",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {renderContent()}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            UDPO | ADMINPANEL | shahriyarmammadov16@gmail.com
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashBoardPage;
