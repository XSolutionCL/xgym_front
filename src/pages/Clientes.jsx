import { Button, Spin, Form } from "antd";
import AntTable from "../components/Tables/AntTable";
import { BiUserVoice } from "react-icons/bi"
import { LiaUserFriendsSolid } from "react-icons/lia"
import { toast } from "react-hot-toast";
import { usePaginateClientes } from "../hooks/clientes";
import useTableFilters from "../common/store/tableFiltersStore";
import BaseModal from "../components/Modals/BaseModal";
import { useState } from "react";
import CustomForm from "../components/Forms/CustomForm";
import dayjs from "dayjs";


const columns = [
  {
    dataIndex: "cod_cliente",
    title: "Cod",
    width: 50
  },
  {
    dataIndex: "desc_cliente",
    title: "Cliente",
    width: 50
  },
  {
    key: "acciones",
    title: "Acciones",
    render: record => (
      <div className="flex flex-row gap-2 justify-center text-center">
        <Button onClick={() => toast.success(record.nombre)} icon={<BiUserVoice/>}/>
        <Button onClick={() => toast.success(record.nombre)} icon={<LiaUserFriendsSolid/>}/>
      </div>
    ),
    width: 20
  }     
]

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
    name: 'fn_cliente',
    label: 'F. Nacimiento',
    type: 'date',
    required: true,
  },
]

const Clientes = () => {

  const [tableFilters] = useTableFilters((state) => {
    state.tableFilters.sorter.field = 'cod_cliente';
    return [state.tableFilters];
});

  const [form] = Form.useForm();

  const { data, isFetching} = usePaginateClientes();

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleSubmit = (d) => {
    console.log("DATA", {
      ...d,
      fn_cliente: dayjs(d.fn_cliente).format("YYYY-MM-DD")
    });
  }

  const onCancel = () => {
    form.resetFields();
    modalIsOpen(false);
    setModalIsOpen(false);
  };
  

  if (isFetching || !tableFilters.sorter.field) {
    return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <BaseModal
        title={"Crear Cliente"}
        isModalOpen={modalIsOpen}
        setIsModalOpen={setModalIsOpen}
        component={<CustomForm form={form} onFinish={handleSubmit} fields={fields}/>}
        onCancel={onCancel}
        onOk={form.submit}
        text={"Añadir Cliente"}
      />
      <AntTable columns={columns} data={data.list} />
    </div>
  )
    
  
}

export default Clientes;
