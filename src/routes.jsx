import { CarryOutOutlined, HomeOutlined, TeamOutlined, UserOutlined, IdcardOutlined, DollarOutlined} from '@ant-design/icons';
import {LiaMoneyCheckAltSolid} from 'react-icons/lia';
import Clientes from "./pages/Clientes/Clientes";
import DatosExtras from './pages/DatosExtras/DatosExtras';
import FormaPago from './pages/FormasPago/FormaPago';
import Home from "./pages/Home";
import Planes from "./pages/Planes/Planes";
import Usuarios from './pages/Usuarios/Usuarios';
import { Pagos } from './pages/Pagos/Pagos';


const routes = [
    { name: "Home", path: '/home', component: Home, icon: <HomeOutlined/>, insideBar: true },
    { name: "Clientes", path: '/clientes', component: Clientes, icon: <UserOutlined/>, insideBar: true },
    { name: "Pagos", path: '/pagos', component: Pagos, icon: <DollarOutlined/>, insideBar: true },
    { name: "Planes", path: '/planes', component: Planes, icon: <CarryOutOutlined/>, insideBar: true },
    { name: "Usuarios", path: '/usuarios', component: Usuarios, icon: <TeamOutlined/>, insideBar: true },
    { name: "Datos Extra", path: '/datos-extra', component: DatosExtras, icon: <IdcardOutlined/>, insideBar: true },  
    { name: "Forma Pago", path: '/forma-pago', component: FormaPago, icon: <LiaMoneyCheckAltSolid size="1.2em"/>, insideBar: true },  
];

export default routes;