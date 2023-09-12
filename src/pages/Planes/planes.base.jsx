import { Button, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export const makeColumns = ({
  form,
  remove,
  setEditingPlan,
  setModalIsOpen,
}) => {
  const columns = [
    {
      dataIndex: "desc_plan",
      title: "Plan",
      width: 50,
    },
    {
      dataIndex: "precio_mensual",
      title: "Precio Mensual",
      width: 50,
    },
    {
      dataIndex: "cant_meses",
      title: "Cantidad de Meses",
      width: 50,
    },
    {
      dataIndex: "precio_total",
      title: "Precio Total",
      width: 30,
    },
    {
      dataIndex: "cod_activo",
      title: "Código Actico",
      width: 30,
    },
    {
      key: "acciones",
      title: "Acciones",
      render: (record) => (
        <div className="flex flex-row gap-2 justify-center text-center">
          <Tooltip title="Editar Plan">
            <Button
              type="link"
              onClick={() => {
                setEditingPlan(record.cod_plan);
                setModalIsOpen(true);
                form.setFieldsValue({
                ...record,
                });
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title="Eiminar Plan">
            <Popconfirm
              title="Cuidado!!!"
              description="Está seguro de eliminar el plan?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              placement="left"
              onConfirm={() =>
                remove({cod_plan: record.cod_plan})
              }
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
      name: "desc_plan",
      label: "Planes",
      type: "text",
      required: true,
    },
    {
      name: "precio_mensual",
      label: "Precio Mensual",
      type: "number",
      required: true,
    },
    {
      name: "cant_meses",
      label: "Cantidad de Meses",
      type: "number",
      required: true,
    },
    {
      name: "precio_total",
      label: "Precio Total",
      type: "number",
      required: true,
    },
    {
      name: "cod_activo",
      label: "Activo",
      type: "select",
      required: true,
      options: [
        {
          value: "S",
          label: "SI",
        },
        {
          value: "N",
          label: "NO",
        },
      ]
    },
  ];
  return fields;
};
