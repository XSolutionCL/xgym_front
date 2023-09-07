import Clientes from "./pages/Clientes";
import Home from "./pages/Home";
import { UserOutlined, HomeOutlined} from '@ant-design/icons';


const routes = [
    { name: "Home", path: '/home', component: Home, icon: <HomeOutlined/> },
    { name: "Clientes", path: '/clientes', component: Clientes, icon: <UserOutlined/> },
];

export default routes;