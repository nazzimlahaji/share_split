import { SmileOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Flex,
  Grid,
  Layout,
  Menu,
  Spin,
  Typography,
  theme,
} from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetIdentityQuery, useLazyGetIdentityQuery } from "../api/apiSlice";
import { drawerList } from "../data/drawerList";
import { auth, signOut } from "../hooks/firebase";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

function ProtectedDashboardPage() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const { isFetching } = useGetIdentityQuery(undefined, {
    skip: !user,
  });
  const [trigger, result] = useLazyGetIdentityQuery();
  const { data, error, isLoading, isSuccess, isError } = result;

  const screens = useBreakpoint();
  const {
    token: {
      colorBgContainer,
      // borderRadiusLG
    },
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
      // navigate("/dashboard", { replace: true });
      if (data.data.DeactivatedAt) {
        console.info("User is deactivated");
        navigate("/deactivated", { replace: true });
      }
    } else if (isError && error) {
      console.error("Authorization Error:", error);
      navigate("/", { replace: true });
    }
  }, [data, error, isError, isSuccess, navigate, user]);

  async function handleLogout() {
    await signOut();

    navigate("/", { replace: true });
  }

  function handleCollapse() {
    setCollapsed(!collapsed);
  }

  if (isFetching || isLoading || !user) {
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
        position: screens.lg ? "static" : "relative",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
        onCollapse={handleCollapse}
        width="250px"
        style={{
          borderRadius: "0 15px 15px 0",
          position: screens.lg ? "static" : "absolute",
          minHeight: "100vh",
          zIndex: 1, // To make sure it's above the content
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
          defaultSelectedKeys={drawerList
            .filter((row) => row.path === window.location.pathname)
            .map((row) => row.key)}
          items={drawerList.map((row) => {
            return {
              key: row.key,
              icon: row.icon,
              label: row.label,
              onClick: () => {
                navigate(row.path);

                if (!screens.lg) {
                  handleCollapse();
                }
              },
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
              onClick={handleLogout}
              icon={
                <Avatar size="small" src={user ? user.photoURL : undefined} />
              }
              iconPosition="start"
            >
              Sign Out
            </Button>
          </Content>
        </Header>
        <Content
          style={{
            margin: screens.lg ? undefined : "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 20,
              minHeight: 360,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
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
