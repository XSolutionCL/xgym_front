import { Typography, Spin, Form, Modal, Input, Button } from "antd";
import AntTable from "../../components/Tables/AntTable";
import { useClienteDelete, usePaginateClientes, useSaveCliente } from "../../hooks/clientes";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useEffect, useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import dayjs from "dayjs";
import { makeColumns, makeItems } from "./clientes.base";
import ClientePlanesModal from "./ClientePlanesModal";


const { Title } = Typography;
const { Search } = Input;


const Clientes = () => {

  const [tableFilters, setTableFilters] = useTableFilters((state) => {
    state.tableFilters.sorter.field = 'cod_cliente';
    return [state.tableFilters, state.setTableFilters];
});

  const [form] = Form.useForm();

  const [editingClient, setEditingClient] = useState(null)

  const { data, isFetching } = usePaginateClientes();

  const { mutate: save, isLoading } = useSaveCliente();
  const { mutate: remove, isLoading: isRemoving } = useClienteDelete();

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [planesIsModalOpen, setPlanesIsModalOpen] = useState(false)

  useEffect(() => {
    return () => {
      setTableFilters({
        ...tableFilters,
        filters: {}
      })
    }
  }, [])
  

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

  const onSearch = (value) => {
    if (value && value?.length > 0) {
      setTableFilters({
        ...tableFilters,
        filters: {search: value},
      })
    }else{
      setTableFilters({
        ...tableFilters,
        filters: {},
      })
    }
  }

  if (isFetching || !tableFilters.sorter.field || isLoading || isRemoving) {
    return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <ClientePlanesModal isModalOpen={planesIsModalOpen} setIsModalOpen={setPlanesIsModalOpen}/>
      <div className="flex flex-row items-center justify-between w-full">
        <Title level={2}>Lista de Clientes</Title>
        <div className="flex flex-col items-end justify-between w-1/4 gap-4">
          <Search 
            autoFocus
            value={tableFilters.filters.search}
            placeholder="Nombre, Apellidos o Rut"
            allowClear
            size="large"
            onSearch={onSearch}
          />
          <Title level={4}>Total: {tableFilters.pagination.total}</Title>
        </div>
      </div>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          style={{
            top: 50
          }}
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
