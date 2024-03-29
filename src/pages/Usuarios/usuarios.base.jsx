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
  hasPermission,
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
      dataIndex: "desc_cargo",
      title: "Cargo",
      width: 50,
    },
    {
      key: "acciones",
      title: "Acciones",
      render: (record) => (
        <div className="flex flex-row justify-center gap-2 text-center">
          <Tooltip title="Editar Usuario">
            <Button
              type="link"
              disabled={!hasPermission(3)}
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
                remove({ cod_usuario: record.cod_usuario });
              }}
              okButtonProps={{ type: "default", danger: true }}
              okText="Si"
              cancelText="No"
            >
              <Button
                danger
                disabled={!hasPermission(4)}
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

export const makeItems = ({ cargos }) => {
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
      type: "text",
      required: true,
    },
    {
      name: "contrasena",
      label: "Contraseña",
      type: "password",
      required: true,
    },
    {
      name: "cod_cargo",
      label: "Cargo",
      type: "select",
      required: true,
      options: cargos || [],
    },
  ];
  return fields;
};
