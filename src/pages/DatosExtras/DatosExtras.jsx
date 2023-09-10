import { Typography, Spin, Form } from "antd";
import AntTable from "../../components/Tables/AntTable";
//import { useClienteDelete, usePaginateClientes, useSaveCliente } from "../../hooks/clientes";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import { makeColumns, makeItems } from "./datosextras.base";


const { Title } = Typography;


const DatosExtras = () => {

  const [tableFilters] = useTableFilters((state) => {
    state.tableFilters.sorter.field = 'cod_datos_extra';
    return [state.tableFilters];
});

  const [form] = Form.useForm();

  const [editingDatosExtra, setEditingDatosExtra] = useState(null)

  //TODO
  //const { data, isFetching, isError } = usePaginateClientes();
  //const { mutate: save, isLoading } = useSaveCliente();
  //const { mutate: remove, isLoading: isRemoving } = useClienteDelete();

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleSubmit = (d) => {
    //TODO
    // const cuerpo = {
    //   ...d,
    //   fn_cliente: dayjs(d.fn_cliente).format("YYYY-MM-DD"),
    //   ...(editingClient ? { cod_cliente: editingClient } : {}),
    // };    

    // form.isFieldsTouched() ? save(cuerpo) : null;
    
    // setModalIsOpen(false);
    // setEditingClient(null);
    // form.resetFields();
    console.log(d);
  }

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false);    
  };

  //TODO
  // if (isFetching || !tableFilters.sorter.field || isLoading || isRemoving) {
  //   return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  // }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <Title>Lista de Datos Extra</Title>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          title={`${editingDatosExtra ? 'Editar' : 'Crear'} Datos Extra`}
          text={"Añadir Datos Extra"}
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
          //TODO
          //remove: remove,
          remove: () => {},
          setEditingDatosExtra: setEditingDatosExtra, 
          setModalIsOpen: setModalIsOpen,
        })} 
        //data={data.list} 
        data={[
          {
            cod_datos_extra: 1,
            desc_datos_extra: "Datos Extra A",           
          },
          {
            cod_datos_extra: 2,
            desc_datos_extra: "Datos Extra B",           
          },
          {
            cod_datos_extra: 3,
            desc_datos_extra: "Datos Extra C",           
          },
          
        ]} 
      />
    </div>
  )
    
  
}

export default DatosExtras;
