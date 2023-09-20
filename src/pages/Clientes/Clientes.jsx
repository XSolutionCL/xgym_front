import { Typography, Spin, Form, Modal } from "antd";
import AntTable from "../../components/Tables/AntTable";
import { useClienteDelete, usePaginateClientes, useSaveCliente } from "../../hooks/clientes";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import dayjs from "dayjs";
import { makeColumns, makeItems } from "./clientes.base";
import ClientePlanesModal from "./ClientePlanesModal";


const { Title } = Typography;


const Clientes = () => {

  const [tableFilters] = useTableFilters((state) => {
    state.tableFilters.sorter.field = 'cod_cliente';
    return [state.tableFilters];
});

  const [form] = Form.useForm();

  const [editingClient, setEditingClient] = useState(null)

  const { data, isFetching, isError } = usePaginateClientes();

  const { mutate: save, isLoading } = useSaveCliente();
  const { mutate: remove, isLoading: isRemoving } = useClienteDelete();

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [planesIsModalOpen, setPlanesIsModalOpen] = useState(false)

  const handleSubmit = (d) => {
    const cuerpo = {
      ...d,
      fn_cliente: dayjs(d.fn_cliente).format("YYYY-MM-DD"),
      ...(editingClient ? { cod_cliente: editingClient } : {}),
    };    

    form.isFieldsTouched() ? save(cuerpo) : null;
    
    setModalIsOpen(false);
    setEditingClient(null);
    form.resetFields();
  }

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false);    
  };

  if (isFetching || !tableFilters.sorter.field || isLoading || isRemoving) {
    return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <ClientePlanesModal isModalOpen={planesIsModalOpen} setIsModalOpen={setPlanesIsModalOpen}/>
      <div className="flex flex-row w-full justify-between items-center">
        <Title level={2}>Lista de Clientes</Title>
        <Title level={4}>Total: {tableFilters.pagination.total}</Title>
      </div>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          title={`${editingClient ? 'Editar' : 'Crear'} Cliente`}
          text={"Añadir Cliente"}
          isModalOpen={modalIsOpen}
          setIsModalOpen={setModalIsOpen}
          onCancel={onCancel}
          onOk={form.submit}
          component={
            <CustomForm
              form={form} 
              onFinish={handleSubmit} 
              fields={makeItems({
                sexos: data.sexos || []
              })}
            />
          }
        />
      </div>
      <AntTable 
        columns={makeColumns({
          form: form,
          setPlanesIsModalOpen: setPlanesIsModalOpen,
          remove: remove,
          setEditingClient: setEditingClient, 
          setModalIsOpen: setModalIsOpen,
        })} 
        data={data.list} 
      />
    </div>
  )
    
  
}

export default Clientes;
