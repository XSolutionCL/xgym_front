import React from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {
    Button,
    Card,
    Form,
    Input,
    Typography
} from 'antd';
const { Text } = Typography;
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const CREDENCIALES = {
        usuario: "yoel",
        contrasena: "cuba"
    }

    /* Si coinciden las credenciales notificacion de success con bienvenida 
    y redirigir al home, sino notificacion de error de credenciales. */
    const navigate = useNavigate();
    
    const onFinish = (values) => {
        const {username, password} = values;
        
        if (username === CREDENCIALES.usuario && password === CREDENCIALES.contrasena) {
            toast.success(`Bienvenido ${username}`);
            navigate("/home");            
        } else {
            toast.error('Credenciales no válidas');
        }
    };
    
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <Card bordered className='bg-slate-200'
                title={
                    <div className="flex flex-row w-full justify-center items-center gap-2 mt-2">
                        <img className="w-10 h-10" src="./logo.jpg" alt="Logo" />
                        <Text className="text-xl">XGYM</Text>
                    </div>
            }>
                <Form name="normal_login" className="flex flex-col justify-center items-center"
                    initialValues={
                        {remember: true}
                    }
                    onFinish={onFinish}>
                    <Form.Item name="username"
                        rules={
                            [{
                                    required: true,
                                    message: 'Please input your Username!'
                                },]
                    }>
                        <Input prefix={
                                <UserOutlined
                            className="site-form-item-icon"/>
                            }
                            placeholder="Username"/>
                    </Form.Item>
                    <Form.Item name="password"
                        rules={
                            [{
                                    required: true,
                                    message: 'Please input your Password!'
                                },]
                    }>
                        <Input prefix={
                                <LockOutlined
                            className="site-form-item-icon"/>
                            }
                            type="password"
                            placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    )
}

export default Login;
