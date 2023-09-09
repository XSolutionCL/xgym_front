import { UserOutlined, HomeOutlined, CarryOutOutlined} from '@ant-design/icons';
import Clientes from "./pages/Clientes/Clientes";
import Home from "./pages/Home";
import Planes from "./pages/Planes/Planes";


const routes = [
    { name: "Home", path: '/home', component: Home, icon: <HomeOutlined/>, insideBar: true },
    { name: "Clientes", path: '/clientes', component: Clientes, icon: <UserOutlined/>, insideBar: true },
    { name: "Planes", path: '/planes', component: Planes, icon: <CarryOutOutlined/>, insideBar: true },
];

export default routes;