import { useState } from "react";
import { Form, Spin, Typography } from "antd";
import { makeColumns, makeModalFields } from "./pagos.base";
import { useFormCreatePagos } from "../../hooks/pagos";
import AntTable from "../../components/Tables/AntTable";
import BaseModal from "../../components/Modals/BaseModal";
import CustomForm from "../../components/Forms/CustomForm";
import { useEffect } from "react";


const { Title } = Typography;

export const Pagos = () => {

  const [editingPago, setEditingPago] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const { data: dataPagos, isFetching: isDataCrearLoading } = useFormCreatePagos(modalIsOpen);

  const { clientes, formas_pago } = dataPagos ? dataPagos: [];

  const [form] = Form.useForm();

  //Poblando el campo 'Planes'
  const clienteSelected = Form.useWatch("cod_cliente", form);
  const [selectedClientePlanes, setSelectedClientePlanes] = useState([]);

  useEffect(() => {
    if (clientes && clienteSelected) {
      const person = clientes.find((item) => item.value === clienteSelected);
      setSelectedClientePlanes(person.planes);
    }
  }, [clienteSelected, clientes]);

  //Poblando el campo 'Cuotas a Pagar'
  const planesSelected = Form.useWatch("cod_plan", form);
  const [selectedCuotas, setselectedCuotas] = useState([]);

  useEffect(() => {
    if (clientes && planesSelected) {
      const plan = selectedClientePlanes.find(
        (item) => item.value === planesSelected
      );

      const result = [];
      for (let i = 1; i <= plan.cuotas_restantes; i++) {
        result.push({ value: i, label: i });
      }
      setselectedCuotas(result);

      form.setFieldValue("monto_cuota", plan.monto_cuota);
    }
  }, [planesSelected, clientes, selectedClientePlanes]);

  const cuotaSelected = Form.useWatch("cuotas_restantes", form);
  useEffect(() => {
    if (cuotaSelected) {
      form.setFieldValue(
        "monto_total",
        Number(form.getFieldValue("monto_cuota")) * Number(cuotaSelected)
      );
    }
  }, [cuotaSelected]);

  const handleSubmit = (d) => {
    console.log(d);
    //TODO: mutate...
    setModalIsOpen(false);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false);
  };

  // TODO: Habilitar Spin cuando haya data en la tabla
  // if (isFetching || !tableFilters.sorter.field || isLoading || isRemoving) {
  //   return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  // }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-row items-center justify-between w-full">
        <Title level={2}>Lista de Pagos</Title>
        {/* //TODO */}
        {/* <Title level={4}>Total: {tableFilters.pagination.total}</Title> */}
      </div>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          title={`${editingPago ? "Editar" : "Crear"} Pago`}
          text={"Añadir Pago"}
          isModalOpen={modalIsOpen}
          setIsModalOpen={setModalIsOpen}
          onCancel={onCancel}
          onOk={form.submit}
          component={
            isDataCrearLoading ? 
            <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />
            :
            <CustomForm
              form={form}
              onFinish={handleSubmit}
              fields={makeModalFields({
                form: form,
                data: clientes || [],
                selectedClientePlanes: selectedClientePlanes,
                selectedCuotas: selectedCuotas,
                formasPago: formas_pago
              })}
            />
          }
        />
      </div>

      <AntTable
        columns={makeColumns({
          form: form,          
        })}
        data={[]}
      />
    </div>
  );
};
