import { Button, Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import dayjs from "dayjs";


export const makeColumns = ({form, remove, setEditingClient, setModalIsOpen}) => {
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
            dataIndex: "fn_cliente",
            title: "F. Nacimiento",
            width: 30
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
                <Tooltip title="Editar cliente">
                    <Button type="link" onClick={() => {
                        setEditingClient(record.cod_cliente);
                        setModalIsOpen(true);
                        form.setFieldsValue({
                        ...record,
                        fn_cliente: dayjs(record.fn_cliente, 'DD-MM-YYYY')
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