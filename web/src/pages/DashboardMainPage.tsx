import { Typography, theme } from "antd";

const { Text } = Typography;

function DashboardMainPage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Text
        style={{
          fontWeight: "400",
          fontSize: 18,
        }}
      >
        Dashboard Overview
      </Text>
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
