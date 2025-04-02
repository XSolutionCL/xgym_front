import { Typography, Spin, Form } from "antd";
import AntTable from "../../components/Tables/AntTable";
//import { useClienteDelete, usePaginateClientes, useSaveCliente } from "../../hooks/clientes";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useEffect, useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import { makeColumns, makeItems } from "./planes.base";
import { useDeletePlan, usePaginatePlanes, useSavePlan } from "../../hooks/planes";


const { Title } = Typography;


const Planes = () => {

  const [form] = Form.useForm();

  const [editingPlan, setEditingPlan] = useState(null)
  
  const { data, isLoading: isFetching } = usePaginatePlanes();
  const { mutate: save, isLoading } = useSavePlan();
  const { mutate: remove, isLoading: isRemoving } = useDeletePlan();

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [tableFilters, setTableFilters] = useTableFilters((state) => [state.tableFilters, state.setTableFilters]);

  useEffect(() => {
    if (!tableFilters.sorter.field){
      setTableFilters({
        ...tableFilters,
        sorter: {
          ...tableFilters.sorter,
          field: "cod_plan"
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
       ...(editingPlan ? { cod_plan: editingPlan } : {}),
     };    

    form.isFieldsTouched() ? save(cuerpo) : null;
    
    setModalIsOpen(false);
    setEditingPlan(null);
    form.resetFields();
  }

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false);   
    setEditingPlan(null);
  };


   if (isFetching || !tableFilters.sorter.field || isLoading || isRemoving) {
    return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-row items-center justify-between w-full">
        <Title level={2}>Lista de Planes</Title>
      </div>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          title={`${editingPlan ? 'Editar' : 'Crear'} Plan`}
          text={"Añadir Plan"}
          isModalOpen={modalIsOpen}
          setIsModalOpen={setModalIsOpen}
          onCancel={onCancel}
          onOk={form.submit}
          component={
            <CustomForm
              form={form}
              onFinish={handleSubmit} 
              fields={makeItems({
                form: form,
              })}
            />
          }
        />
      </div>
      <AntTable 
        columns={makeColumns({
          form: form,
          remove: remove,
          setEditingPlan: setEditingPlan, 
          setModalIsOpen: setModalIsOpen,
        })} 
        data={data.list} 
      />
    </div>
  )
    
  
}

export default Planes;
