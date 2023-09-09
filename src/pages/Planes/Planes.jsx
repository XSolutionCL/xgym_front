import { Typography, Spin, Form } from "antd";
import AntTable from "../../components/Tables/AntTable";
//import { useClienteDelete, usePaginateClientes, useSaveCliente } from "../../hooks/clientes";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import { makeColumns, makeItems } from "./planes.base";


const { Title } = Typography;


const Planes = () => {

  const [tableFilters] = useTableFilters((state) => {
    state.tableFilters.sorter.field = 'cod_plan';
    return [state.tableFilters];
});

  const [form] = Form.useForm();

  const [editingPlan, setEditingPlan] = useState(null)

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
      <Title>Lista de Planes</Title>
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
          setEditingPlan: setEditingPlan, 
          setModalIsOpen: setModalIsOpen,
        })} 
        //data={data.list} 
        data={[
          {
            cod_plan: 1,
            desc_plan: "Plan Mensual",
            precio_mensual: 20000,
            cant_meses: 1,
            precio_total: 20000,
            cod_activo: "S"
          },
          {
            cod_plan: 2,
            desc_plan: "Plan Trimestral",
            precio_mensual: 18000,
            cant_meses: 3,
            precio_total: 54000,
            cod_activo: "N"
          },
          {
            cod_plan: 3,
            desc_plan: "Plan Semestral",
            precio_mensual: 15000,
            cant_meses: 6,
            precio_total: 90000,
            cod_activo: "S"
          }
        ]} 
      />
    </div>
  )
    
  
}

export default Planes;
