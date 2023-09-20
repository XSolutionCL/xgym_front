import { Button, Form, Popconfirm, Tooltip } from "antd";
import { CgGym } from "react-icons/cg";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { formatDateDdMmYyyy } from "../../utils/formatDates";


export const makeColumns = ({form, remove, setEditingClient, setModalIsOpen, setPlanesIsModalOpen}) => {
    const columns = [
        {
          dataIndex: "nombre_cliente",
          title: "Nombre",
          width: 50
        },
        {
            dataIndex: "apellido1_cliente",
            title: "Apellido Paterno",
            width: 50
        },
        {
            dataIndex: "apellido2_cliente",
            title: "Apellido Materno",
            width: 50
        },
        {
            dataIndex: "rut_cliente",
            title: "Rut",
            width: 30
        },
        {
            // dataIndex: "fn_cliente",
            title: "F. Nacimiento",
            width: 30,
            render: record => (
              <>{formatDateDdMmYyyy(record.fn_cliente)}</>
            )
        },
        {
            dataIndex: "desc_sexo",
            title: "Sexo",
            width: 30
        },
        {
          key: "acciones",
          title: "Acciones",
          render: record => (
            <div className="flex flex-row gap-2 justify-center text-center">
              <Tooltip title="Ver Plan">
                    <Button type="link" onClick={() => {
                        // setEditingClient(record.cod_cliente);
                        setPlanesIsModalOpen(record);
                    }} icon={<CgGym size="1.5em"/>}/>
                </Tooltip>
                <Tooltip title="Editar cliente">
                    <Button type="link" onClick={() => {
                        setEditingClient(record.cod_cliente);
                        setModalIsOpen(true);
                        form.setFieldsValue({
                        ...record,
                        fn_cliente: dayjs(record.fn_cliente, 'YYYY-MM-DD')
                        });
                    }} icon={<EditOutlined />}/>
                </Tooltip>
                <Tooltip placement="topLeft" title="Eiminar cliente">
                    <Popconfirm
                        title="Cuidado!!!"
                        description="Está seguro de eliminar el cliente?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        placement="left"
                        onConfirm={() => remove({cod_cliente: record.cod_cliente})}
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
      ]
    return columns;
}

export const makeItems = ({sexos}) => {
    const fields = [
        {
            name: 'nombre_cliente',
            label: 'Nombres',
            type: 'text',
            required: true,
          },
          {
            name: 'apellido1_cliente',
            label: 'Primer Apellido',
            type: 'text',
            required: true,
          },
          {
            name: 'apellido2_cliente',
            label: 'Segundo Apellido',
            type: 'text',
            required: true,
          },
          {
            name: 'rut_cliente',
            label: 'Rut',
            type: 'rut',
            required: true,
          },
          {
            name: 'cod_sexo',
            label: 'Sexo',
            type: 'select',
            options: sexos,
            required: true,
          },
          {
            name: 'fn_cliente',
            label: 'F. Nacimiento',
            type: 'date',
            required: true,
          },
    ]
    return fields;
}


export const makeModalColumns = () => {
  const columns = [
      {
        dataIndex: "desc_plan",
        align: 'center',
        title: "Plan",
        width: 50
      },
      {
          // dataIndex: "desde",
          title: "Desde",
          width: 50,
          align: 'center',
          render: record => (
            <>{formatDateDdMmYyyy(record.desde)}</>
          )
      },
      {
          // dataIndex: "hasta",
          title: "Hasta",
          width: 50,
          align: 'center',
          render: record => (
            <>{formatDateDdMmYyyy(record.hasta)}</>
          )
      },
      {
          dataIndex: "total_cuotas",
          title: "Total Cuotas",
          align: 'center',
          width: 30
      },
      {
        dataIndex: "monto_cuota",
        title: "Monto Cuota",
        align: 'center',
        width: 30
      },
      {
          dataIndex: "cuotas_restantes",
          title: "Cuotas Restantes",
          align: 'center',
          width: 30
      },
      /* {
        key: "acciones",
        title: "Acciones",
        render: record => (
          <div className="flex flex-row gap-2 justify-center text-center">
            <Tooltip title="Ver Plan">
                  <Button type="link" onClick={() => {
                      // setEditingClient(record.cod_cliente);
                      setPlanesIsModalOpen(record);
                  }} icon={<CgGym size="1.5em"/>}/>
              </Tooltip>
              <Tooltip title="Editar cliente">
                  <Button type="link" onClick={() => {
                      setEditingClient(record.cod_cliente);
                      setModalIsOpen(true);
                      form.setFieldsValue({
                      ...record,
                      fn_cliente: dayjs(record.fn_cliente, 'YYYY-MM-DD')
                      });
                  }} icon={<EditOutlined />}/>
              </Tooltip>
              <Tooltip placement="topLeft" title="Eiminar cliente">
                  <Popconfirm
                      title="Cuidado!!!"
                      description="Está seguro de eliminar el cliente?"
                      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      placement="left"
                      onConfirm={() => remove({cod_cliente: record.cod_cliente})}
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
      } */     
    ]
  return columns;
}


export const makeModalFields = ({planes, form=Form.useForm}) => {
  const fields = [
      {
          name: 'cod_plan',
          label: 'Plan',
          type: 'select',
          options: planes || [],
          required: true,
        },
        {
          name: 'desde',
          label: 'Desde',
          type: 'date',
          onchange: (e) => form.resetValues(),
          required: true,
        },
        {
          name: 'hasta',
          label: 'Hasta',
          type: 'date',
          disabled: true,
          required: true,
        },
        {
          name: 'total_cuotas',
          label: 'Cuotas',
          type: 'number',
          required: true,
        },
        {
          name: 'monto_cuota',
          label: 'Monto Cuota',
          disabled: true,
          type: 'number',
          required: true,
        },
  ]
  return fields;
}