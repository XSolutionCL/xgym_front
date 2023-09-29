import { useState } from "react";
import { Form, Typography } from "antd";
import { makeColumns, makeModalFields } from "./pagos.base";
import { useFormCreatePagos } from "../../hooks/pagos";
import AntTable from "../../components/Tables/AntTable";
import BaseModal from "../../components/Modals/BaseModal";
import CustomForm from "../../components/Forms/CustomForm";
import { useEffect } from "react";


const { Title } = Typography;

export const Pagos = () => {
  const { data, isFetching } = useFormCreatePagos(true);

  const [form] = Form.useForm();

  const [editingPago, setEditingPago] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Poblando el campo 'Planes'
  const clienteSelected = Form.useWatch("cod_cliente", form);
  const [selectedClientePlanes, setSelectedClientePlanes] = useState([]);

  useEffect(() => {
    if (data && clienteSelected) {
      const person = data.find((item) => item.value === clienteSelected);
      setSelectedClientePlanes(person.planes);
    }
  }, [clienteSelected, data]);

  //Poblando el campo 'Cuotas a Pagar'
  const planesSelected = Form.useWatch("cod_plan", form);
  const [selectedCuotas, setselectedCuotas] = useState([]);

  useEffect(() => {
    if (data && planesSelected) {
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
  }, [planesSelected, data, selectedClientePlanes]);

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
    const cuerpo = {
      ...d,
    };
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
      <div className="flex flex-row w-full justify-between items-center">
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
            <CustomForm
              form={form}
              onFinish={handleSubmit}
              fields={makeModalFields({
                form: form,
                data: data,
                selectedClientePlanes: selectedClientePlanes,
                selectedCuotas: selectedCuotas,
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
