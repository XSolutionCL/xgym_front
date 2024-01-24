import { Typography, Spin, Form } from "antd";
import AntTable from "../../components/Tables/AntTable";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useEffect, useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import { makeColumns, makeItems } from "./cargos.base";
import { useDeleteCargo, usePaginateCargos, useSaveCargo } from "../../hooks/cargos";


const { Title } = Typography;


const Cargos = () => {

  const [form] = Form.useForm();

  const [editingCargo, setEditingCargo] = useState(null)

  const { data, isFetching, isError } = usePaginateCargos();
  const { mutate: save, isLoading } = useSaveCargo();
  const { mutate: remove, isLoading: isRemoving } = useDeleteCargo();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [tableFilters, setTableFilters] = useTableFilters((state) => [state.tableFilters, state.setTableFilters]);

  useEffect(() => {
    if (!tableFilters.sorter.field){
      setTableFilters({
        ...tableFilters,
        sorter: {
          ...tableFilters.sorter,
          field: "cod_cargo"
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
      ...(editingCargo ? { cod_cargo: editingCargo } : {}),
    };    

    form.isFieldsTouched() ? save(cuerpo) : null;
    
    setModalIsOpen(false);
    setEditingCargo(null);
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
      <Title>Lista de Cargos</Title>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          title={`${editingCargo ? 'Editar' : 'Crear'} Cargo`}
          text={"Añadir Cargo"}
          isModalOpen={modalIsOpen}
          setIsModalOpen={setModalIsOpen}
          onCancel={onCancel}
          onOk={form.submit}
          component={
            <CustomForm
              form={form} 
              onFinish={handleSubmit} 
              fields={makeItems({
                permisos: data.permisos_ops || [],
              })}
            />
          }
        />
      </div>
      <AntTable 
        columns={makeColumns({
          form: form,          
          remove: remove,          
          setEditingCargo: setEditingCargo, 
          setModalIsOpen: setModalIsOpen,
        })}
        data={data.list}
      />
    </div>
  )
    
  
}

export default Cargos;
