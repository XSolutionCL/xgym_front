import { Typography, Spin, Form } from "antd";
import AntTable from "../../components/Tables/AntTable";
//import { useClienteDelete, usePaginateClientes, useSaveCliente } from "../../hooks/clientes";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useEffect, useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import { makeColumns, makeItems } from "./formapago.base";
import { useDeleteFormasPago, usePaginateFormasPago, useSaveFormasPago } from "../../hooks/formaspago";


const { Title } = Typography;


const FormaPago = () => {

  const [form] = Form.useForm();

  const [editingFormaPago, setEditingFormaPago] = useState(null)

  const { data, isFetching } = usePaginateFormasPago();
  const { mutate: save, isLoading } = useSaveFormasPago();
  const { mutate: remove, isLoading: isRemoving } = useDeleteFormasPago();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [tableFilters, setTableFilters] = useTableFilters((state) => [state.tableFilters, state.setTableFilters]);

  useEffect(() => {
    if (!tableFilters.sorter.field){
      setTableFilters({
        ...tableFilters,
        sorter: {
          ...tableFilters.sorter,
          field: "cod_forma_pago"
        }
      })
    }
    return () => {
      setTableFilters({
        ...tableFilters,
        filters: {},
        sorter: {
          columnKey: 0,
          field: null,
          order: "descend"
        }
      })
    }
  }, [])

  const handleSubmit = (d) => {
    const cuerpo = {
      ...d,      
      ...(editingFormaPago ? { cod_forma_pago: editingFormaPago } : {}),
    };    

    form.isFieldsTouched() ? save(cuerpo) : null;
    
    setModalIsOpen(false);
    setEditingFormaPago(null);
    form.resetFields();    
  }

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false);  
    setEditingFormaPago(null);
  };

  if (isFetching || !tableFilters.sorter.field || isLoading || isRemoving) {
    return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <Title>Lista de Formas de Pago</Title>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          title={`${editingFormaPago ? 'Editar' : 'Crear'} Forma de Pago`}
          text={"Añadir Forma de Pago"}
          isModalOpen={modalIsOpen}
          setIsModalOpen={setModalIsOpen}
          onCancel={onCancel}
          onOk={form.submit}
          component={
            <CustomForm
              form={form} 
              onFinish={handleSubmit} 
              fields={makeItems()}
            />
          }
        />
      </div>
      <AntTable 
        columns={makeColumns({
          form: form,          
          remove: remove,          
          setEditingFormaPago: setEditingFormaPago, 
          setModalIsOpen: setModalIsOpen,
        })} 
        data={data.list}
      />
    </div>
  )
    
  
}

export default FormaPago;
