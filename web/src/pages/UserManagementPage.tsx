import { Col, Empty, Grid, Pagination, Row, Spin, Typography } from "antd";
import { useState } from "react";
import { useGetUserListQuery } from "../api/apiSlice";
import UserPaper from "../components/userManagement/UserPaper";
import { auth } from "../hooks/firebase";

const { Text } = Typography;
const { useBreakpoint } = Grid;

function UserManagementPage() {
  const user = auth.currentUser;
  const screens = useBreakpoint();
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const {
    data: userList,
    isFetching: userListFetching,
    isError: userListError,
    isLoading: userListLoading,
  } = useGetUserListQuery(
    {
      per_page: pagination.perPage,
      page: pagination.page,
    },
    { skip: !user }
  );

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

  if (userListError) {
    console.error("Error fetching user list");
  }

  let DisplayElement;
  if (userList && userList.data.length > 0) {
    DisplayElement = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: screens.lg ? "calc(100vh - 205px)" : "calc(100vh - 230px)",
        }}
      >
        <Row gutter={[16, 16]}>
          {
            (DisplayElement = userList.data.map((row) => (
              <Col key={row.id} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
                <UserPaper
                  name={row.name}
                  email={row.email}
                  position={row.role_name}
                  status={
                    row.deactivated_at === "" || !row.deactivated_at
                      ? true
                      : false
                  }
                  photoURL={null}
                />
              </Col>
            )))
          }
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px ",
          }}
        >
          <Pagination
            defaultCurrent={pagination.page}
            defaultPageSize={pagination.perPage}
            onChange={(page, pageSize) => {
              setPagination({ page, perPage: pageSize });
            }}
            total={userList.metadata.total}
            showSizeChanger
          />
        </div>
      </div>
    );
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
    </>
  );
}

export default UserManagementPage;
