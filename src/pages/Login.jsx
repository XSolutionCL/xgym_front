import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
const { Text } = Typography;
import { useLoginMutate } from "../hooks/auth";
import { useEffect } from "react";
import { useAuthStore } from "../common/store/authStore";
import { useNavigate } from "react-router";

const Login = () => {
  const { mutate: login, isLoading, isError } = useLoginMutate();
  const isAuth = useAuthStore((state) => state.isAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/home");
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Card
        bordered
        className="bg-slate-200"
        title={
          <div className="flex flex-row w-full justify-center items-center gap-2 mt-2">
            <img className="w-10 h-10" src="./logo.jpg" alt="Logo" />
            <Text className="text-xl">XGYM</Text>
          </div>
        }
      >
        <Form
          name="normal_login"
          className="flex flex-col justify-center items-center"
          initialValues={{ remember: true }}
          onFinish={login}
        >
          <Form.Item
            name="login_usuario"
            rules={[
              {
                required: true,
                message: "Introduce tu usuario!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Usuario" />
          </Form.Item>
          <Form.Item
            name="contrasena"
            rules={[
              {
                required: true,
                message: "Introduce tu contraseña!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading && !isError}
              type="default"
              htmlType="submit"
              className="login-form-button"
            >
              Inicia Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
