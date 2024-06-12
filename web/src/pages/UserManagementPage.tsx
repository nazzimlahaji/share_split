import { Col, Empty, Row, Spin, Typography } from "antd";
import { useGetUserListQuery } from "../api/apiSlice";
import SomethingWentWrong from "../components/error/SomethingWentWrong";
import UserPaper from "../components/userManagement/UserPaper";
import { auth } from "../hooks/firebase";

const { Text } = Typography;

function UserManagementPage() {
  const user = auth.currentUser;
  const {
    data: userList,
    isFetching: userListFetching,
    isError: userListError,
    isLoading: userListLoading,
  } = useGetUserListQuery(undefined, { skip: !user });

  if (userListLoading) {
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Spin size="large" />
    </div>;
  }

  if (!userListError) {
    <SomethingWentWrong />;
  }

  let DisplayElement;
  if (userList && userList.data.length > 0) {
    DisplayElement = userList.data.map((row) => (
      <Col key={row.id} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
        <UserPaper
          name={row.name}
          email={row.email}
          position={row.role_name}
          status={
            row.deactivated_at === "" || !row.deactivated_at ? true : false
          }
          photoURL={null}
        />
      </Col>
    ));
  } else {
    DisplayElement = (
      <>
        <Empty
          style={{
            margin: "auto",
            marginTop: "10%",
          }}
        />
      </>
    );
  }

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
          User Management
        </Text>
      </div>
      <Row gutter={[16, 16]}>
        {userListFetching ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          DisplayElement
        )}
      </Row>
    </>
  );
}

export default UserManagementPage;
