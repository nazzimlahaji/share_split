import { SmileOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, Spin, Typography, theme } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetIdentityQuery, useLazyGetIdentityQuery } from "../api/apiSlice";
import { drawerList } from "../data/drawerList";
import { auth, signOut } from "../hooks/firebase";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

function ProtectedDashboardPage() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { isFetching } = useGetIdentityQuery(undefined, {
    skip: !user,
  });
  const [trigger, result] = useLazyGetIdentityQuery();
  const { data, error, isLoading, isSuccess, isError } = result;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // useEffect => to listen on firebase auth changed and
  // trigger fetching of /whoami endpoint only if user email is verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      // console.log("onAuthStateChanged");
      if (curUser) {
        if (curUser?.emailVerified) {
          // console.log("verify whoami");
          trigger();
        } else {
          console.error("User email is not verified");
        }
      }
    });

    return () => unsubscribe();
  }, [trigger]);

  // useEffect => that will only be trigger when the current page is being loaded.
  useEffect(() => {
    if (user && data && isSuccess && user.email === data.data.Email) {
      // console.log("navigate to dashboard");
      navigate("/dashboard", { replace: true });
    } else if (isError && error) {
      console.error("Authorization Error:", error);
      navigate("/login", { replace: true });
    }
  }, [data, error, isError, isSuccess, navigate, user]);

  async function handleLogout() {
    await signOut();

    navigate("/login", { replace: true });
  }

  if (isFetching || isLoading) {
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
