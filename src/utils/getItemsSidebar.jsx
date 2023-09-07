import {useAuthStore} from '../common/store/authStore';
import {IoChevronBackCircleOutline, IoHomeOutline} from 'react-icons/io5'
import {GiSkeletalHand} from'react-icons/gi'
import {GrConfigure} from 'react-icons/gr'
import { TfiAgenda } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  function getIcon(vista){
    switch (vista) {
        case 'Home':
            return <IoHomeOutline size={20}/>;
        case 'Agenda':
            return <TfiAgenda size={20}/>;
        case 'Estudios':
            return <GiSkeletalHand size={20}/>;
        case 'Mantenedores':
            return <GrConfigure size={20}/>;
        default:
            return <IoHomeOutline size={20}/>;
    }
}

export const getItems = () => {
    const navigate = useNavigate();
    const profile = useAuthStore((state) => state.profile);
    const {vistas} = profile;
    let items = []
    vistas.map(vista => {
        if (vista.cod_en_sidebar === 'S') {
            let Icon = getIcon(vista.desc_vista)
        if (vista.componente === 'Mantenedores'){
            items.push(
                {
                    type: 'divider',
                }
            )
        }
        if (vista.opciones.filter((op) => op.cod_en_sidebar === 'S').length === 0){
            items.push(getItem(vista.desc_vista, vista.path, Icon))
        }
        else{
            let subItems = []
            vista.opciones.map(subVista => {
                if(subVista.cod_en_sidebar === 'S'){
                    subItems.push(getItem(subVista.desc_opcion_vista, subVista.path))
                }
            });
            items.push(getItem(vista.desc_vista, vista.path, Icon, subItems))
        }}
    });
    items.push(getItem("Atrás", "back", 
        <IoChevronBackCircleOutline size="1.5em" className='items-center justify-center'/>,
        )
    );
    return items;
}

/*   const items = [
    getItem('Estudios', '/estudios', <PieChartOutlined />),
    getItem('Home', '/home', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
  ]; */