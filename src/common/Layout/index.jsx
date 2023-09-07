import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, Typography, Dropdown, Avatar} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import routes from '../../routes';
import { siglas } from '../../utils/formatStrings';


const {Header, Content, Footer, Sider} = Layout;
const { Title } = Typography;

const sidebarItems = routes.map((route, index) => {
    return {
        key: String(index + 1),
        icon: route.icon,
        label: <a href={route.path}>{route.name}</a>,
        /* children: new Array(4).fill(null).map(
            (_, j) => {
                const subKey = index * 4 + j + 1;
                return {key: subKey, label: `option${subKey}`};
            }
        ) */
    };
});

const Layer = ({children}) => {

    const navigate = useNavigate();

    const location = useLocation();

    const logout = useAuthStore((state) => state.logout);
    const profile = useAuthStore((state) => state.profile);

    const items = [
        {
          label: <p>Por SI</p>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: 
            <Button
                icon={<LogoutOutlined/>}
                type='ghost'
                onClick={() => {
                    navigate("/")
                    logout();
                }}
            >
                Cerrar Sesión
            </Button>,
          key: '1',
        },
      ];

    const {token: {
            colorBgContainer
        }} = theme.useToken();

        console.log(location.pathname);

    return (
        <Layout  className="w-screen h-screen overflow-hidden">
            <Header className="flex w-full justify-between items-center bg-gray-100">
                <div className="flex justify-center items-center text-center h-full gap-2">
                    <img className="w-10 h-2/3" src="./logo.jpg" alt="Logo" />
                    <h1 className="text-gray-600 text-center text-2xl">XGYM</h1>
                </div>
                <Dropdown
                    menu={{
                    items,
                    }}
                    trigger={['click']}
                >
                    <Avatar
                        className='mr-6 hover:border-gray-900 focus:border-gray-900'
                        size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }}
                    >
                       {siglas(profile.user_info.desc_usuario) || ""}
                    </Avatar>
                </Dropdown>
            </Header>
            <Content style={
                { width: '100%', height: '100%'}
            }>
                <Layout style={
                    {
                        width: '100%', height: '100%',
                        background: colorBgContainer
                    }
                }>
                    <Sider style={
                            {background: colorBgContainer}
                        }
                        width={200}>
                        <Menu mode="inline" className="bg-gray-50"
                            defaultSelectedKeys={
                                [String(routes.filter((route) => route.path === location.pathname)[0].key)]
                            }
                            style={
                                {height: '100%'}
                            }
                            items={sidebarItems}/>
                    </Sider>
                    <Content style={
                        {
                            minHeight: 280
                        }
                    }>
                        {children}
                    </Content>
                </Layout>
            </Content>
            <Footer style={
                {textAlign: 'center'}
            }>
                XGYM ©2023 Desarrollado por XSolution
            </Footer>
        </Layout>
    )

}


export default Layer;
