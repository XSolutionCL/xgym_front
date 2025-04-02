import { Typography, Spin, Form } from "antd";
import AntTable from "../../components/Tables/AntTable";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useEffect, useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import { makeColumns, makeItems } from "./datosextras.base";
import { useDeleteDatosExtras, usePaginateDatosExtras, useSaveDatosExtras } from "../../hooks/datosextras";


const { Title } = Typography;


const DatosExtras = () => {

  const [form] = Form.useForm();

  const [editingDatosExtra, setEditingDatosExtra] = useState(null)

  const { data, isFetching } = usePaginateDatosExtras();
  const { mutate: save, isLoading } = useSaveDatosExtras();
  const { mutate: remove, isLoading: isRemoving } = useDeleteDatosExtras();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [tableFilters, setTableFilters] = useTableFilters((state) => [state.tableFilters, state.setTableFilters]);

  useEffect(() => {
    if (!tableFilters.sorter.field){
      setTableFilters({
        ...tableFilters,
        sorter: {
          ...tableFilters.sorter,
          field: "cod_datos_extra"
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
      ...(editingDatosExtra ? { cod_datos_extra: editingDatosExtra } : {}),
    };    

    form.isFieldsTouched() ? save(cuerpo) : null;
    
    setModalIsOpen(false);
    setEditingDatosExtra(null);
    form.resetFields();    
  }

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false); 
    setEditingDatosExtra(null);
  };
  
  if (isFetching || !tableFilters.sorter.field || isLoading || isRemoving) {
    return ( <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" /> );
  }

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
          remove: remove,          
          setEditingDatosExtra: setEditingDatosExtra, 
          setModalIsOpen: setModalIsOpen,
        })} 
        data={data.list} 
      />
    </div>
  )
    
  
}

export default DatosExtras;
