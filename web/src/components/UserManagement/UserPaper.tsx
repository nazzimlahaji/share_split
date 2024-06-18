import { Avatar, Tag, Typography, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";

const { Title, Text } = Typography;

interface UserPaperProps {
  name: string;
  position: string;
  email: string;
  status: boolean;
  photoURL?: string | null;
  onClick?: () => void;
}

function UserPaper({
  name,
  position,
  email,
  status,
  photoURL,
  onClick,
}: UserPaperProps) {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: colorBgContainer,
        borderRadius: borderRadius,
        padding: "10px",
        boxShadow: "0px 0px 10px 0px #0000001a",
        display: "flex",
        alignItems: "center",
        transition: "0.2s",
        ":hover": {
          cursor: "pointer",
          boxShadow: "0px 0px 10px 0px #0000003a",
          transform: "translateY(-2px)",
        },
        ":active": {
          transform: "translateY(0px)",
          boxShadow: "0px 0px 10px 0px #0000001a",
        },
      }}
    >
      <Avatar
        size={80}
        src={photoURL ?? undefined}
        icon={<UserOutlined />}
        style={{
          border: `2.5px solid ${status ? "#14b54a" : "#D22B2B"}`,
        }}
      />
      <div
        style={{
          marginLeft: "12px",
        }}
      >
        <Title
          level={5}
          style={{
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Title>
        <Text
          style={{
            fontSize: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {email}
        </Text>
        <div
          style={{
            padding: "3px 0px 5px 0px",
          }}
        >
          <Tag
            color="blue"
            style={{
              borderRadius: "15px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "170px",
            }}
          >
            {position}
          </Tag>
        </div>
      </div>
    </Box>
  );
}

export default UserPaper;
