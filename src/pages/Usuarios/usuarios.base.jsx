import { Button, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export const makeColumns = ({
  form,
  remove,
  setEditingUsuario,
  setModalIsOpen,
}) => {
  const columns = [
    {
      dataIndex: "desc_usuario",
      title: "Descripción Usuario",
      width: 50,
    },
    {
      dataIndex: "login_usuario",
      title: "Login Usuario",
      width: 50,
    },
    {
      dataIndex: "contrasena",
      title: "Contraseña",
      width: 50,
    },    
    {
      key: "acciones",
      title: "Acciones",
      render: (record) => (
        <div className="flex flex-row gap-2 justify-center text-center">
          <Tooltip title="Editar Usuario">
            <Button
              type="link"
              onClick={() => {
                setEditingUsuario(record.cod_usuario);
                setModalIsOpen(true);
                form.setFieldsValue({
                ...record,
                });
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title="Eiminar Usuario">
            <Popconfirm
              title="Cuidado!!!"
              description="Está seguro de eliminar el usuario?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              placement="left"
              onConfirm={() => {
                //TODO
                /*remove({cod_cliente: record.cod_cliente})}*/ console.log(
                  record
                );
              }}
              okButtonProps={{ type: "default", danger: true }}
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
      width: 20,
    },
  ];
  return columns;
};

export const makeItems = () => {
  const fields = [
    {
      name: "desc_usuario",
      label: "Descripción Usuario",
      type: "text",
      required: true,
    },
    {
      name: "login_usuario",
      label: "Login Usuario",
      type: "number",
      required: true,
    },
    {
      name: "contrasena",
      label: "Contraseña",
      type: "number",
      required: true,
    }    
  ];
  return fields;
};
