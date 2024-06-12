import { Typography, theme } from "antd";

const { Text } = Typography;

function DashboardMainPage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <div
        style={{
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: "#1677ff",
          }}
        >
          Dashboard Overview
        </Text>
      </div>
      <div
        style={{
          padding: 15,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          boxShadow: "0px 0px 10px 0px #0000001a",
        }}
      >
        hello wolrd
      </div>
    </>
  );
}

export default DashboardMainPage;
