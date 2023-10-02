import React, { useState } from "react";
import "./index.scss";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Breadcrumb, Dropdown, Layout, Menu, theme } from "antd";
import NewsTableComponent from "../../components/newsTable";
import SiteConfiguration from "../siteConfiguration";
import WriteToUs from "../writeToUs";
import PhotoCatalog from "../photoCatalog";
import SubMenu from "antd/es/menu/SubMenu";
const { Header, Content, Footer, Sider } = Layout;

const DashBoard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const [menuItems, setMenuItems] = useState([
    { key: "1", title: "Xəbərlər", icon: <UserOutlined /> },
    {
      key: "2",
      title: "Saytın Tənzimləmələri",
      icon: <i className="fa-solid fa-briefcase"></i>,
    },
    {
      key: "3",
      title: "Mesajlar",
      icon: <i className="fa-solid fa-layer-group"></i>,
    },
    {
      key: "4",
      title: "Foto Kataloq",
      icon: <i className="fa-solid fa-newspaper"></i>,
      subMenu: [
        {
          key: "4-1",
          title: "Alt Menü Öğesi 1",
          icon: <i className="fa-solid fa-layer-group"></i>,
        },
        {
          key: "4-2",
          title: "Alt Menü Öğesi 2",
          icon: <i className="fa-solid fa-layer-group"></i>,
        },
      ],
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
      case "2":
        return <SiteConfiguration />;
      case "3":
        return <WriteToUs />;
      case "4":
        return <PhotoCatalog />;

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
            href="https://www.google.com/"
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
                // Eğer alt menü yoksa
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
            UDPO | ADMINPANEL
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashBoard;
