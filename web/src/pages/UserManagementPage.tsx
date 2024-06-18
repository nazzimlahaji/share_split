import { UserAddOutlined } from "@ant-design/icons";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  Alert,
  Button,
  Col,
  Divider,
  Empty,
  FloatButton,
  Form,
  Grid,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { useState } from "react";
import {
  useCreateUserMutation,
  useGetRoleListQuery,
  useGetUserListQuery,
} from "../api/apiSlice";
import { CreateUserResponse } from "../api/types";
import UserPaper from "../components/UserManagement/UserPaper";
import { auth } from "../hooks/firebase";
import CustomLinearProgress from "../components/CustomLinearProgress";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface SubmitFormType {
  name: string;
  email: string;
  role_id: string;
}

interface ErrorMsgType {
  message: string;
  error: string;
}

function UserManagementPage() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<ErrorMsgType | null>(null);

  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation();

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

  const {
    data: roleList,
    isFetching: roleListFetching,
    isError: roleListError,
  } = useGetRoleListQuery(undefined, { skip: !user });

  function handleModalOpen() {
    setOpenModal(true);
  }

  function handleModalClose() {
    setOpenModal(false);
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
        setErrorMsg({
          message: errorMsg.metadata.message,
          error: errorMsg.metadata.error,
        });
      }
      return;
    }

    handleModalClose();
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
  if (roleListError) {
    console.error("Error fetching role list");
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
      <Modal
        title={
          <>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#1677ff",
              }}
            >
              Add User
            </Text>
            <Divider
              style={{
                margin: "5px 0 ",
              }}
            />
          </>
        }
        centered
        open={openModal}
        onOk={handleModalOpen}
        onCancel={handleModalClose}
        keyboard
        okText="Confirm"
        footer
      >
        {errorMsg && (
          <div
            style={{
              margin: "10px 0",
              // Animation may not work
              transition:
                "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
              transform: errorMsg ? "translateY(0)" : "translateY(-10px)",
              opacity: errorMsg ? 1 : 0,
            }}
          >
            <Alert
              message="Registration Failed"
              description={errorMsg.message}
              type="error"
              showIcon
              style={{
                padding: "10px",
              }}
            />
          </div>
        )}
        <Form
          name="name_form"
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the name" },
              { min: 4, message: "Name must be at least 4 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input the email",
              },
            ]}
          >
            <Input onChange={() => setErrorMsg(null)} />
          </Form.Item>
          {roleList && roleList.data.length > 0 && (
            <Form.Item
              label="Position"
              name="role_id"
              rules={[
                {
                  required: true,
                  message: "Please input the position",
                },
              ]}
              initialValue={roleList.data[1].id}
            >
              <Select
                style={{ width: "100%" }}
                options={roleList.data.map((role) => ({
                  value: role.id,
                  label: role.name,
                }))}
                loading={roleListFetching}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Space
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button htmlType="reset" disabled={isCreatingUser}>
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreatingUser}
                iconPosition="end"
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserManagementPage;
