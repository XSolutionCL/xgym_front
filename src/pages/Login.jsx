import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
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
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Card
        bordered
        className="w-1/4 shadow-sm h-1/2 bg-slate-50 shadow-amber-200"
        title={
          <div className="flex flex-row items-center justify-center w-full gap-2 mt-2">
            <img className="w-32 h-32" src="/logo.png" alt="Logo" />
            {/* <Text className="text-xl">XGYM</Text> */}
          </div>
        }
        
      >
        <Form
          name="login_form"
          layout="vertical"
          className="flex flex-col items-center justify-center"
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
            <Input autoFocus prefix={<UserOutlined />} placeholder="Usuario" />
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
              className="w-full login-form-button"
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
