import { UserAddOutlined } from "@ant-design/icons";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { NotificationArgsProps } from "antd";
import {
  Col,
  Empty,
  FloatButton,
  Grid,
  Pagination,
  Row,
  Spin,
  Typography,
  notification,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation, useGetUserListQuery } from "../api/apiSlice";
import { CreateUserResponse } from "../api/types";
import CustomLinearProgress from "../components/CustomLinearProgress";
import AddUserModal from "../components/UserManagement/AddUserModal";
import UserPaper from "../components/UserManagement/UserPaper";
import { auth } from "../hooks/firebase";

type NotificationPlacement = NotificationArgsProps["placement"];

const { Text } = Typography;
const { useBreakpoint } = Grid;
const { useNotification } = notification;

export interface SubmitFormType {
  name: string;
  email: string;
  role_id: string;
}

export interface ErrorMsgType {
  message: string;
  error: string;
}

function UserManagementPage() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [api, contextHolder] = useNotification();

  const [pagination, setPagination] = useState({ page: 1, perPage: 20 });
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<ErrorMsgType | null>(null);

  const [
    createUser,
    { isLoading: isCreatingUser, isSuccess: createUserSucess },
  ] = useCreateUserMutation();

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

  function handleModalOpen() {
    setOpenModal(true);
  }

  function handleModalClose() {
    setOpenModal(false);
  }

  function handleErrorMessage(e: ErrorMsgType | null) {
    setErrorMsg(e);
  }

  function handleOpenNotification(
    type: "success" | "error" | "info" | "warning",
    message: string,
    placement: NotificationPlacement,
    description?: string
  ) {
    api.open({
      type,
      message,
      description,
      placement,
    });
  }

  async function handleSubmit(e: SubmitFormType) {
    const data = new FormData();
    data.append("name", e.name);
    data.append("email", e.email);
    data.append("role_id", e.role_id);

    const res = await createUser(data);

    if (res.error) {
      const data = res.error as FetchBaseQueryError;
      const errorMsg = data.data as CreateUserResponse;

      if (errorMsg.metadata.error === "validation_error") {
        handleErrorMessage({
          message: errorMsg.metadata.message,
          error: errorMsg.metadata.error,
        });
      }
      return;
    }

    handleModalClose();
    handleOpenNotification(
      "success",
      "User created successfully",
      "bottomLeft"
    );
  }

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
                  onClick={() => {
                    navigate(
                      "/dashboard/user-management/" + row.uuid + "/detail"
                    );
                  }}
                />
              </Col>
            )))
          }
        </Row>
        <div
          style={{
            display: "flex",
            // position: "sticky", // May used later on different idea
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
        <div>
          <CustomLinearProgress />
        </div>
      ) : (
        <>
          {DisplayElement}
          <FloatButton
            shape="circle"
            type="primary"
            style={{ bottom: 75, right: 30, width: 50, height: 50 }}
            icon={<UserAddOutlined />}
            tooltip="Add User"
            onClick={handleModalOpen}
          />
        </>
      )}
      <AddUserModal
        openModal={openModal}
        errorMsg={errorMsg}
        user={user}
        isCreatingUser={isCreatingUser}
        createUserSucess={createUserSucess}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        handleSubmit={handleSubmit}
        handleErrorMessage={handleErrorMessage}
      />
      {contextHolder}
    </>
  );
}

export default UserManagementPage;
