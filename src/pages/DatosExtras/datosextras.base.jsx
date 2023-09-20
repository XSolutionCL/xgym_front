import { Button, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export const makeColumns = ({
  form,
  remove,
  setEditingDatosExtra,
  setModalIsOpen,
}) => {
  const columns = [
    {
      dataIndex: "desc_datos_extra",
      title: "Datos Extra",
      width: 50,
    },    
    {
      key: "acciones",
      title: "Acciones",
      render: (record) => (
        <div className="flex flex-row gap-2 justify-center text-center">
          <Tooltip title="Editar Datos Extra">
            <Button
              type="link"
              onClick={() => {
                setEditingDatosExtra(record.cod_datos_extra);
                setModalIsOpen(true);
                form.setFieldsValue({
                ...record,
                });
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title="Eiminar Datos Extra">
            <Popconfirm
              title="Cuidado!!!"
              description="Está seguro de eliminar el Dato Extra?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              placement="left"
              onConfirm={ () => remove({cod_datos_extra: record.cod_datos_extra}) }
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
      name: "desc_datos_extra",
      label: "Descripción Datos Extra",
      type: "text",
      required: true,
    }    
  ];
  return fields;
};
