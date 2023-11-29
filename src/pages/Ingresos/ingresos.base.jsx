import { formatDateDdMmYyyy } from "../../utils/formatDates";
import { formatFullDateToTime24Hrs } from "../../utils/formatTime";


export const makeColumns = () => {
  const columns = [
    {
        dataIndex: "cod_cliente",
        title: "Cod",
        align: "center",
    },
    {
        dataIndex: "desc_cliente",
        title: "Nombre",
        align: "center",
    },
    {
        dataIndex: "rut_cliente",
        title: "Rut",
        align: "center",
    },
    {
        dataIndex: "fecha_ingreso_cliente",
        title: "Hora",
        align: "center",
        render : (fecha_ingreso_cliente) => (
          <>{formatFullDateToTime24Hrs(fecha_ingreso_cliente)}</>
        )
    },
  ];
  return columns;
}



export const makeDescClienteItems = ({clienteInfo}) => {
  const items = [
    {
      key: '1',
      label: 'Nombre',
      children: <>{clienteInfo.desc_cliente}</>,
    },
    {
      key: '2',
      label: 'Rut',
      children: <>{clienteInfo.rut_cliente}</>
    },
    {
      key: '3',
      label: 'Género',
      children: <>{clienteInfo.desc_sexo}</>,
    },
    {
      key: '4',
      label: 'F.Nacimiento',
      children: <>{formatDateDdMmYyyy(clienteInfo.fn_cliente)}</>,
    },
    {
      key: '5',
      label: 'Email',
      children: <>{clienteInfo.mail_cliente}</>,
    },
    {
      key: '6 ',
      label: 'Fono',
      children: <>{clienteInfo.fono_cliente}</>,
    },
  ];
  return items;
}


export const makeDescPlanItems = ({clienteInfo}) => {
  const items = [
    {
      key: '1',
      label: 'Plan',
      children: <>{clienteInfo.desc_plan}</>,
    },
    {
      key: '2',
      label: 'Desde',
      children: <>{formatDateDdMmYyyy(clienteInfo.desde)}</>
    },
    {
      key: '3',
      label: 'Hasta',
      children: <>{formatDateDdMmYyyy(clienteInfo.hasta)}</>,
    },
  ];
  return items;
}