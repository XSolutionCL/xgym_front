import { useState } from "react";
import { Form, Spin, Typography } from "antd";
import { makeColumns, makeModalFields } from "./pagos.base";
import { useFormCreatePagos, usePaginatePagos, usePagoDelete, useSavePago } from "../../hooks/pagos";
import AntTable from "../../components/Tables/AntTable";
import BaseModal from "../../components/Modals/BaseModal";
import CustomForm from "../../components/Forms/CustomForm";
import { useEffect } from "react";
import dayjs from "dayjs";
import useTableFilters from "../../common/store/tableFiltersStore";


const { Title } = Typography;

export const Pagos = () => {

  const [tableFilters] = useTableFilters((state) => {
    state.tableFilters.sorter.field = 'cod_pago';
    return [state.tableFilters];
});

  const [editingPago, setEditingPago] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data, isFetching: pagosIsLoading } = usePaginatePagos();

  const { list } = data ? data : [];
  
  const { data: dataPagos, isFetching: isDataCrearLoading } = useFormCreatePagos(modalIsOpen);

  const { clientes, formas_pago } = dataPagos ? dataPagos: [];

  const { mutate: pagar, isLoading: isPagoLoading } = useSavePago();
  const { mutate: remove , isLoading: isRemoving } = usePagoDelete();

  const [form] = Form.useForm();

  //Poblando el campo 'Planes'
  const clienteSelected = Form.useWatch("cod_cliente", form);
  
  const [selectedClientePlanes, setSelectedClientePlanes] = useState([]);

  useEffect(() => {
    if (clientes && clienteSelected) {
      const person = clientes.find((item) => item.value === clienteSelected);
      setSelectedClientePlanes([...person.planes]);
    }
  }, [clienteSelected, clientes]);

  //Poblando el campo 'Cuotas a Pagar'
  const planesSelected = Form.useWatch("cod_historial_cliente_planes", form);
  const [selectedCuotas, setselectedCuotas] = useState([]);

  useEffect(() => {
    if (clientes && planesSelected && selectedClientePlanes.length > 0) {
      const plan = selectedClientePlanes.find(
        (item) => item.value === planesSelected
      );
      const result = [];
      for (let i = 1; i <= plan?.cuotas_restantes; i++) {
        result.push({ value: i, label: i });
      }
      setselectedCuotas(result);

      form.setFieldValue("monto_cuota", plan.monto_cuota);
    }
  }, [planesSelected, clientes, selectedClientePlanes]);

  const cuotaSelected = Form.useWatch("cant_cuotas_pagadas", form);
  
  useEffect(() => {
    console.log("USEEFFECT 3");
    if (cuotaSelected) {
      form.setFieldValue(
        "monto_pago",
        Number(form.getFieldValue("monto_cuota")) * Number(cuotaSelected)
      );
    }
  }, [cuotaSelected]);

  const handleSubmit = (values) => {
    console.log("Aaaaa");
    const cuerpo = {
      ...values,
      fecha_pago: dayjs(values.fecha_pago).format('YYYY-MM-DD'),
      ...(editingPago ? { cod_pago: editingPago } : {}),
    }
    pagar(cuerpo);
    setModalIsOpen(false);
    setEditingPago(null);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false);
  };


  if (isPagoLoading || pagosIsLoading || isRemoving) {
     return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-row items-center justify-between w-full">
        <Title level={2}>Lista de Pagos</Title>
        <Title level={4}>Total: {tableFilters.pagination.total}</Title>
      </div>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          style={{
            top: 50
          }}
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
          remove: remove,
          setEditingPago: setEditingPago,
          setModalIsOpen: setModalIsOpen
        })}
        data={list}
      />
    </div>
  );
};
