import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  formatCLP,
  formatterNumber,
  parserNumber,
} from "../../utils/formatMoney";
import dayjs from "dayjs";
import { formatDateDdMmYyyy } from "../../utils/formatDates";
import { Button, Popconfirm, Tooltip, Image } from "antd";
import { CgGym, CgProfile } from "react-icons/cg";

const baseURL = {
  production: import.meta.env.VITE_PROD_API,
  qa: import.meta.env.VITE_QA_API,
  development: import.meta.env.VITE_DEV_API,
};
const ENV = import.meta.env.VITE_ENV;

const API_IMAGE_CLIENTES = `${baseURL[ENV]}images/clientes/`

export const makeColumns = ({
  form,
  remove,
  setEditingClient,
  setModalIsOpen,
  setPlanesIsModalOpen,
  hasPermission,
  setUploadModalIsOpen,
}) => {
  const columns = [
    {
      dataIndex: "cod_cliente",
      title: "Cod",
      width: 20,
    },
    {
      dataIndex: "nombre_cliente",
      title: "Nombre",
      width: 40,
    },
    {
      dataIndex: "apellido1_cliente",
      title: "Apellido Paterno",
      width: 35,
    },
    {
      dataIndex: "apellido2_cliente",
      title: "Apellido Materno",
      width: 35,
    },
    {
      dataIndex: "rut_cliente",
      title: "Rut",
      width: 30,
    },
    {
      dataIndex: "fono_cliente",
      title: "Fono",
      width: 30,
    },
    {
      dataIndex: "mail_cliente",
      title: "Email",
      width: 50,
    },
    {
      dataIndex: "fn_cliente",
      title: "F. Nacimiento",
      width: 30,
      render: (fn_cliente) => <>{formatDateDdMmYyyy(fn_cliente)}</>,
    },
    {
      dataIndex: "desc_sexo",
      title: "Género",
      width: 30,
    },
    {
      key: "imagen_cliente",
      title: "Imagen",
      width: 20,
      render: (record) => {
        if (record.imagen_cliente){
          return (
            <Image 
              width={40}
              height={40}
              src="avatar.avif"
              loading="eager"
              preview={{
                src: `${API_IMAGE_CLIENTES}${record.imagen_cliente}`,
                destroyOnClose: true,
              }}
            />)
        }else{
          return <></>
        }
      },
    },
    {
      key: "acciones",
      title: "Acciones",
      width: 30,
      render: (record) => (
        <div className="flex flex-row justify-center gap-2 text-center">
          <Tooltip title="Subir Imagen Cliente">
            <Button
              type="link"
              onClick={() => {
                setUploadModalIsOpen(record.cod_cliente);
              }}
              icon={<CgProfile size="1.2em"/>}
            />
          </Tooltip>
          <Tooltip title="Ver Plan">
            <Button
              disabled={!hasPermission(1)}
              type="link"
              onClick={() => {
                setPlanesIsModalOpen(record);
              }}
              icon={<CgGym size="1.5em" />}
            />
          </Tooltip>
          <Tooltip title="Editar cliente">
            <Button
              type="link"
              disabled={!hasPermission(3)}
              onClick={() => {
                setEditingClient(record.cod_cliente);
                setModalIsOpen(true);
                form.setFieldsValue({
                  ...record,
                  fn_cliente: dayjs(record.fn_cliente, "YYYY-MM-DD"),
                });
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title="Eiminar cliente">
            <Popconfirm
              title="Cuidado!!!"
              description="Está seguro de eliminar el cliente?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              placement="left"
              onConfirm={() => remove({ cod_cliente: record.cod_cliente })}
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
    },
  ];
  return columns;
};

export const makeItems = ({ sexos }) => {
  const fields = [
    {
      name: "nombre_cliente",
      label: "Nombres",
      type: "text",
      required: true,
    },
    {
      name: "apellido1_cliente",
      label: "Primer Apellido",
      type: "text",
      required: true,
    },
    {
      name: "apellido2_cliente",
      label: "Segundo Apellido",
      type: "text",
      required: true,
    },
    {
      name: "rut_cliente",
      label: "Rut",
      type: "rut",
      required: true,
    },
    {
      name: "fono_cliente",
      label: "Fono",
      type: "text",
      required: true,
    },
    {
      name: "mail_cliente",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "cod_sexo",
      label: "Género",
      type: "select",
      options: sexos,
      required: true,
    },
    {
      name: "fn_cliente",
      label: "F. Nacimiento",
      type: "date",
      required: true,
    },
  ];
  return fields;
};

export const makeItemsDextras = ({ datosEops }) => {
  const items = datosEops?.map((d) => ({
    name: ["datos_extras", d.value],
    label: d.label,
    type: "text",
    required: false,
  }));
  return items;
};

export const makeModalColumns = ({ desasociarPlan }) => {
  const columns = [
    {
      dataIndex: "desc_plan",
      align: "center",
      title: "Plan",
      width: 50,
    },
    {
      // dataIndex: "desde",
      title: "Desde",
      width: 50,
      align: "center",
      render: (record) => <>{formatDateDdMmYyyy(record.desde)}</>,
    },
    {
      // dataIndex: "hasta",
      title: "Hasta",
      width: 50,
      align: "center",
      render: (record) => <>{formatDateDdMmYyyy(record.hasta)}</>,
    },
    {
      dataIndex: "total_cuotas",
      title: "Total Cuotas",
      align: "center",
      width: 30,
    },
    {
      dataIndex: "monto_cuota",
      title: "Monto Cuota",
      align: "center",
      width: 30,
      render: (monto_cuota) => <>{formatCLP(monto_cuota)}</>,
    },
    {
      dataIndex: "cuotas_restantes",
      title: "Cuotas Restantes",
      align: "center",
      width: 30,
    },
    {
      key: "acciones",
      title: "Acciones",
      render: (record) => (
        <div className="flex flex-row justify-center gap-2 text-center">
          <Tooltip title="Eliminar Plan">
            <Button
              disabled={record.cod_tiene_pagos === "S"}
              type="link"
              onClick={() => {
                desasociarPlan(record);
              }}
              icon={<DeleteOutlined size="1.5em" />}
            />
          </Tooltip>
        </div>
      ),
      width: 20,
    },
  ];
  return columns;
};

export const makeModalFields = ({ planes, form }) => {
  const fields = [
    {
      name: "cod_plan",
      label: "Plan",
      type: "select",
      options: planes || [],
      required: true,
    },
    {
      name: "desde",
      label: "Desde",
      type: "date",
      onchange: (e) => form.resetValues(),
      required: true,
    },
    {
      name: "hasta",
      label: "Hasta",
      type: "date",
      disabled: true,
      required: true,
    },
    {
      name: "total_cuotas",
      label: "Cuotas",
      type: "number",
      required: true,
      min: 1,
    },
    {
      name: "monto_cuota",
      label: "Monto Cuota",
      disabled: true,
      type: "number",
      required: true,
      prefix: "CLP",
      formatter: (value) => formatterNumber(value),
      parser: (value) => parserNumber(value),
    },
  ];
  return fields;
};
