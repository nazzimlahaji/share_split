import { SmileOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, Spin, Typography, theme } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetIdentityQuery } from "../api/apiSlice";
import { drawerList } from "../data/drawerList";
import { auth, signOut } from "../hooks/firebase";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

function ProtectedDashboardPage() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isFetching } = useGetIdentityQuery(undefined, {
    skip: !user,
  });
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut();

    navigate("/login", { replace: true });
  }

  if (loading || isFetching) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: colorBgContainer,
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
        width="250px"
        style={{
          borderRadius: "0 15px 15px 0",
        }}
      >
        <div>
          <SmileOutlined
            style={{
              color: "white",
              fontSize: 32,
              margin: "16px auto",
              display: "block",
            }}
            title="ShareSplit Logo"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={drawerList.map((row) => {
            return {
              key: row.key,
              icon: row.icon,
              label: row.label,
              onClick: () => navigate(row.path),
            };
          })}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Content
            style={{
              padding: "0 20px",
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              ShareSplit
            </Text>
            <Button
              type="primary"
              shape="round"
              size="middle"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </Content>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 20,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ShareSplit Created by NazzimLahaji
        </Footer>
      </Layout>
    </Layout>
  );
}

export default ProtectedDashboardPage;
