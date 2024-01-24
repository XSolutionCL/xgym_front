import { Button, Popconfirm, Tooltip, Tag, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export const makeColumns = ({
  form,
  remove,
  setEditingCargo,
  setModalIsOpen,
}) => {
  const columns = [
    {
      dataIndex: "cod_cargo",
      title: "Cod",
      width: 50,
    }, 
    {
      dataIndex: "desc_cargo",
      title: "Cargo",
      width: 50,
    },
    {
      key: "permisos",
      title: "Permisos",
      width: 50,
      render: (record) => 
        <Space>
          {
            record?.permisos?.map((p, i) => (
              <Tag color={p.color || "geekblue"} key={i}>{p.label}</Tag>
            ))
          }
        </Space>
    },   
    {
      key: "acciones",
      title: "Acciones",
      render: (record) => (
        <div className="flex flex-row justify-center gap-2 text-center">
          <Tooltip title="Editar Cargo">
            <Button
              type="link"
              onClick={() => {
                setEditingCargo(record.cod_cargo);
                setModalIsOpen(true);
                form.setFieldsValue({
                ...record,
                });
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title="Eiminar Cargo">
            <Popconfirm
              title="Cuidado!!!"
              description="Está seguro de eliminar el Cargo?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              placement="left"
              onConfirm={ () => remove({cod_cargo: record.cod_cargo}) }
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

export const makeItems = ({permisos}) => {
  const fields = [
    {
      name: "desc_cargo",
      label: "Cargo",
      type: "text",
      required: true,
    },
    {
      name: "permisos",
      label: "Permisos",
      type: "select",
      required: true,
      isMulti: true,
      options: permisos || []
    }       
  ];
  return fields;
};
