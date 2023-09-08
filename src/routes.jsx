import Clientes from "./pages/Clientes/Clientes";
import Home from "./pages/Home";
import { UserOutlined, HomeOutlined} from '@ant-design/icons';


const routes = [
    { name: "Home", path: '/home', component: Home, icon: <HomeOutlined/>, insideBar: true },
    { name: "Clientes", path: '/clientes', component: Clientes, icon: <UserOutlined/>, insideBar: true },
];

export default routes;