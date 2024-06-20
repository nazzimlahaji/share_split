import {
  Alert,
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useGetRoleListQuery } from "../../api/apiSlice";
import { ErrorMsgType, SubmitFormType } from "../../pages/UserManagementPage";

const { Text } = Typography;
const { useForm } = Form;

interface Props {
  openModal: boolean;
  errorMsg: ErrorMsgType | null;
  user: User | null;
  isCreatingUser: boolean;
  createUserSucess: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  handleSubmit: (e: SubmitFormType) => void;
  handleErrorMessage: (e: ErrorMsgType | null) => void;
}

function AddUserModal({
  openModal,
  errorMsg,
  user,
  isCreatingUser,
  createUserSucess,
  handleModalOpen,
  handleModalClose,
  handleSubmit,
  handleErrorMessage,
}: Props) {
  const [form] = useForm();

  useEffect(() => {
    if (createUserSucess) {
      form.resetFields(["name", "email"]);
    }
  }, [createUserSucess, form]);

  const {
    data: roleList,
    isFetching: roleListFetching,
    isError: roleListError,
  } = useGetRoleListQuery(undefined, { skip: !user });

  if (roleListError) {
    console.error("Error fetching role list");
  }

  return (
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
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
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
        name="addUserForm"
        form={form}
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
          <Input onChange={() => handleErrorMessage(null)} />
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
  );
}

export default AddUserModal;
