import { Button, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export const makeColumns = ({
  form,
  remove,
  setEditingFormaPago,
  setModalIsOpen,
}) => {
  const columns = [
    {
      dataIndex: "desc_forma_pago",
      title: "Forma de Pago",
      width: 50,
    },    
    {
      key: "acciones",
      title: "Acciones",
      render: (record) => (
        <div className="flex flex-row gap-2 justify-center text-center">
          <Tooltip title="Editar Forma de Pago">
            <Button
              type="link"
              onClick={() => {
                setEditingFormaPago(record.cod_forma_pago);
                setModalIsOpen(true);
                form.setFieldsValue({
                ...record,
                });
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title="Eiminar Forma de Pago">
            <Popconfirm
              title="Cuidado!!!"
              description="Está seguro de eliminar la Forma de Pago?"
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
      name: "desc_forma_pago",
      label: "Descripción Forma de Pago",
      type: "text",
      required: true,
    }    
  ];
  return fields;
};
