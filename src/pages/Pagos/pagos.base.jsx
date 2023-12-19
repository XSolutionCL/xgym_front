import { Button, Popconfirm, Tooltip } from "antd";
import { formatDateDdMmYyyy } from "../../utils/formatDates";
import { formatCLP, formatterNumber, parserNumber } from "../../utils/formatMoney";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

export const makeColumns = ({ form, remove, setEditingPago, setModalIsOpen }) => {
  const columns = [
    {
      dataIndex: "cod_pago",
      title: "Cod",
      width: 20,
    },
    {
      dataIndex: "desc_cliente",
      title: "Cliente",
      width: 50,
    },
    {
      dataIndex: "desc_plan",
      title: "Plan",
      width: 50,
    },
    {
      dataIndex: "fecha_pago",
      title: "Fecha",
      width: 30,
      render: (fecha_pago) => (
        <>{formatDateDdMmYyyy(fecha_pago)}</>
      )
    },
    {
      dataIndex: "cant_cuotas_pagadas",
      title: "Cuotas Pagadas",
      width: 35
    },
    {
      dataIndex: "monto_cuota",
      title: "Monto Cuota",
      width: 30,
      render: (monto_cuota) => (
        <>{formatCLP(monto_cuota)}</>
      )
    },
    {
      dataIndex: "monto_pago",
      title: "Monto",
      width: 30,
      render: (monto_pago) => (
        <>{formatCLP(monto_pago)}</>
      )
    },
    {
      dataIndex: "desc_forma_pago",
      title: "Forma Pago",
      width: 30,
    },
    {
      key: "acciones",
      title: "Acciones",
      render: record => (
        <div className="flex flex-row justify-center gap-2 text-center">
          <Tooltip title="Editar pago">
              <Button type="link" onClick={() => {
                  setEditingPago(record.cod_pago);
                  setModalIsOpen(true);
                  form.setFieldsValue({
                  ...record,
                  fecha_pago: dayjs(record.fecha_pago, 'YYYY-MM-DD')
                  });
              }} icon={<EditOutlined />}/>
          </Tooltip>
          <Tooltip placement="topLeft" title="Eiminar pago">
              <Popconfirm
                  title="Cuidado!!!"
                  description="Está seguro de eliminar el pago?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  placement="left"
                  onConfirm={() => remove({cod_pago: record.cod_pago})}
                  okButtonProps={{ type: 'default', danger: true }}
                  okText="Si"
                  cancelText="No"
              >
                  <Button
                      danger
                      type="link" 
                      icon={<DeleteOutlined size="1.5em" />} 
                  />
              </Popconfirm>
          </Tooltip>
        </div>
      ),
      width: 20
    }    
  ];
  return columns;
};

export const makeModalFields = ({ data, selectedClientePlanes, selectedCuotas, formasPago, formaPagoSelected }) => {

  const fields = [
    {
      name: "cod_cliente",
      label: "Cliente",
      type: "select",
      options: data || [],
      required: true,
    },
    {
      name: "cod_historial_cliente_planes",
      label: "Planes",
      type: "select",
      options: selectedClientePlanes, 
      required: true,
    },
    {
      name: "fecha_pago",
      label: "Fecha Pago",
      type: "date",
      required: true,
    },
    {
      name: "monto_cuota",
      label: "Monto Cuota",
      disabled: true,
      type: "number",
      prefix: "CLP",
      formatter: (value) => formatterNumber(value),
      parser: (value) => parserNumber(value)
    },
    {
      name: "cant_cuotas_pagadas",
      label: "Cuotas Pagar",
      type: "select",
      required: true,
      options: selectedCuotas,     
    },
    {
      name: "cod_forma_pago",
      label: "Forma Pago",
      type: "select",
      required: true,
      options: formasPago || [],     
    },
    {
      name: "monto_pago",
      label: "Monto Total",
      disabled: true,
      type: "number",
      prefix: "CLP",
      formatter: (value) => formatterNumber(value),
      parser: (value) => parserNumber(value)      
    },
  ];

  if ([2, 4].includes(Number(formaPagoSelected))){
    fields.push(
      {
        name: "codigo_autorizacion",
        label: "Cod Autorización",
        required: false,
        type: "text",    
      },
    )
  }

  return fields;
};


export const makeFilterFields = ({ clientes, planes, formasPago }) => {
  const fields = [
    {
      name: "cod_cliente",
      label: "Cliente",
      type: "select", 
      options: clientes || [],
    },
    {
      name: "cod_plan",
      label: "Plan",
      type: "select",
      options: planes, 
    },
    {
      name: "desde",
      label: "Desde",
      type: "date",
    },
    {
      name: "hasta",
      label: "Hasta",
      type: "date",
    },
    {
      name: "cod_forma_pago",
      label: "Forma Pago",
      type: "select",
      options: formasPago || [],     
    },
  ];
  return fields;
};