import { useState } from "react";
import { Button, Form, Spin, Typography } from "antd";
import { makeColumns, makeFilterFields, makeModalFields } from "./pagos.base";
import { useDownloadExcelPagos, useFormCreatePagos, useGetFiltersOps, usePaginatePagos, usePagoDelete, useSavePago } from "../../hooks/pagos";
import AntTable from "../../components/Tables/AntTable";
import BaseModal from "../../components/Modals/BaseModal";
import CustomForm from "../../components/Forms/CustomForm";
import { useEffect } from "react";
import dayjs from "dayjs";
import useTableFilters from "../../common/store/tableFiltersStore";
import { RiFileExcel2Fill } from "react-icons/ri";
import Filters from "../../components/Filters/Filters";


const { Title, Text } = Typography;

export const Pagos = () => {

  const [editingPago, setEditingPago] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filtersIsOpen, setFiltersIsOpen] = useState(false);

  const { data, isFetching: pagosIsLoading } = usePaginatePagos();

  const { list } = data ? data : [];
  
  const { data: dataPagos, isFetching: isDataCrearLoading } = useFormCreatePagos(modalIsOpen, editingPago);

  const { clientes, formas_pago } = dataPagos ? dataPagos: [];

  const { mutate: pagar, isLoading: isPagoLoading } = useSavePago();
  const { mutate: remove , isLoading: isRemoving } = usePagoDelete();

  const [form] = Form.useForm();

  const {data: filtersOps, isFetching: isFilterDataIsLoading} = useGetFiltersOps(filtersIsOpen);

  const { planes: planesOps, clientes: clientesOps, formas_pago: formaPagosOps } = filtersOps ? filtersOps : [];

  const { mutate: downloadExcel } = useDownloadExcelPagos();

  //Poblando el campo 'Planes'
  const clienteSelected = Form.useWatch("cod_cliente", form);
  
  const [selectedClientePlanes, setSelectedClientePlanes] = useState([]);

  const [tableFilters, setTableFilters] = useTableFilters((state) => [state.tableFilters, state.setTableFilters]);

  useEffect(() => {
    if (!tableFilters.sorter.field){
      setTableFilters({
        ...tableFilters,
        sorter: {
          ...tableFilters.sorter,
          field: "cod_pago"
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

      form.setFieldValue("monto_cuota", plan?.monto_cuota);
    }
  }, [planesSelected, clientes, selectedClientePlanes]);

  const cuotaSelected = Form.useWatch("cant_cuotas_pagadas", form);

  const formaPagoSelected = Form.useWatch("cod_forma_pago", form);
  
  useEffect(() => {
    if (cuotaSelected) {
      form.setFieldValue(
        "monto_pago",
        Number(form.getFieldValue("monto_cuota")) * Number(cuotaSelected)
      );
    }
  }, [cuotaSelected]);

  const handleSubmit = (values) => {
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
    setEditingPago(null);
  };


  if (isPagoLoading || pagosIsLoading || isRemoving) {
     return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-row items-center justify-between w-full">
        <Title level={2}>Lista de Pagos</Title>
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
                formasPago: formas_pago,
                formaPagoSelected:formaPagoSelected
              })}
            />
          }
          extraButtons={
            <div className="flex flex-row w-full">
              <Button
                className="text-black"
                type="primary" 
                onClick={() => downloadExcel()} 
              >
                <div className="flex flex-row items-center justify-center w-full h-full gap-4 text-center">
                <RiFileExcel2Fill color="green"/>
                  <Text>Exportar</Text>
                </div>
              </Button>
            </div>
          }
          filters={
            <Filters
              loading={isFilterDataIsLoading}
              isOpen={filtersIsOpen}
              setIsOpen={setFiltersIsOpen}
              fields={makeFilterFields({
                clientes: clientesOps || [],
                planes: planesOps || [],
                formasPago: formaPagosOps || [],
              })}
              tableFilters={tableFilters}
              setTableFilters={setTableFilters}
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
