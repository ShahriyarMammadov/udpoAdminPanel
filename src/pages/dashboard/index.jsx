import React from "react";
import "./index.scss";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Table, theme } from "antd";
import NewsTableComponent from "../../components/newsTable";
const { Header, Content, Footer, Sider } = Layout;

const DashBoard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
            items={[
              UserOutlined,
              VideoCameraOutlined,
              UploadOutlined,
              UserOutlined,
            ].map((icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }))}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: colorBgContainer,
              position: "fixed",
              top: 0,
              right: 0,
              left: 0,
            }}
          >
            <div
              className="container"
              style={{ maxWidth: "1600px", margin: "0 auto" }}
            >
              <h2 style={{ margin: 0 }}>Admin Panel</h2>
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
              <NewsTableComponent />
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
