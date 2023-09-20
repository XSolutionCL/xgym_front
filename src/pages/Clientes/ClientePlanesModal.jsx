import { Button, Descriptions, Form, Modal, Table, Tabs } from "antd"
import { makeModalColumns, makeModalFields } from "./clientes.base";
import { useAscociarPlanCliente, useGetHistoricoPlanes } from "../../hooks/clientes";
import CustomForm from "../../components/Forms/CustomForm";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


const ClientePlanesModal = ({isModalOpen, setIsModalOpen}) => {

    const [selectedTab, setSelectedTab] = useState("1")
    const [selectedPlan, setSelectedPlan] = useState(null)

    const { data, isFetching } = useGetHistoricoPlanes(isModalOpen?.cod_cliente);
    const { planes, historico } = data ? data : [];

    const { mutate: asociarPlan , isLoading } = useAscociarPlanCliente();

    const [form] = Form.useForm();

    const cod_plan = Form.useWatch('cod_plan', form);
    const desde = Form.useWatch('desde', form);
    const cuotas = Form.useWatch('total_cuotas', form);

    useEffect(() => {
      if(cod_plan){
        const selP = planes.filter((plan) => plan.value === cod_plan)[0]
        setSelectedPlan(selP)
        form.setFieldsValue({
            "desde": null,
            "hasta": null,
            "total_cuotas": null,
            "monto_cuota": null
        })
      }else{
        setSelectedPlan(null)
      }
    }, [cod_plan])

    useEffect(() => {
        if(desde && cod_plan && selectedPlan){
          form.setFieldValue("hasta", desde.add(selectedPlan.cant_meses, 'month'))
        }else{
            form.setFieldValue("hasta", null)
        }
      }, [desde, cod_plan])

      useEffect(() => {
        if(cuotas && cod_plan && selectedPlan){
          form.setFieldValue("monto_cuota", Number(selectedPlan.precio_total) / Number(cuotas))
        }
      }, [cuotas])

    const handleSubmit = (values) => {
        const cuerpo = {
            ...values,
            desde: dayjs(values.desde).format("YYYY-MM-DD"),
            hasta: dayjs(values.hasta).format("YYYY-MM-DD"),
            desc_plan: selectedPlan.label,
            cod_cliente: isModalOpen.cod_cliente
        }
        asociarPlan(cuerpo);
        setIsModalOpen(false);
        form.resetFields();
        setSelectedTab("1");
    }   
    

  return (
    <Modal
        title={`Planes de ${isModalOpen.desc_cliente}`}
        open={isModalOpen}
        onCancel={() => {
            form.resetFields();
            setIsModalOpen(false);
            setSelectedTab("1");
        }}
        destroyOnClose
        footer={
            <>
                <Button
                    onClick={() => {
                        form.resetFields();
                        setIsModalOpen(false);
                        setSelectedTab("1");
                    }}
                >
                    Cancelar
                </Button>
                { selectedTab === "2" &&
                    <Button
                        loading={isLoading}
                        onClick={() => form.submit()}
                    >
                        Agregar Plan
                    </Button>
                }
            </>
        }
        width="50%"    
    >
        <Tabs 
            defaultActiveKey={selectedTab}
            onChange={(key) => setSelectedTab(String(key))}
            items={[
                {
                    key: '1',
                    label: 'Histórico de Planes',
                    children: 
                        <>
                            <Table
                            rowKey="cod_historial_cliente_planes"
                                loading={isFetching}
                                dataSource={historico}
                                columns={makeModalColumns()}
                            />
                        </>,
                  },
                  {
                    key: '2',
                    label: 'Asociar Nuevo Plan',
                    children: 
                        <div className="flex flex-row-reverse justify-center items-center w-full h-full gap-3">
                            <Descriptions 
                                bordered 
                                layout="vertical"
                                className="w-2/5 min-h-full text-center"
                                items={[
                                    /* {
                                        key: '1',
                                        label: 'Plan',
                                        children: <p>{selectedPlan?.label}</p>,
                                        span: 4
                                    }, */
                                    {
                                        key: '1',
                                        label: 'Meses',
                                        children: <p>{selectedPlan?.cant_meses}</p>,
                                        span: 4
                                    },
                                    {
                                        key: '2',
                                        label: 'Precio Mensual',
                                        children: <p>{selectedPlan?.precio_mensual}</p>,
                                        span: 4
                                    },
                                    
                                    {
                                        key: '3',
                                        label: 'Precio Total',
                                        children: <p>{selectedPlan?.precio_total}</p>,
                                        span: 4
                                    },
                                ]}
                            />
                            <CustomForm
                                form={form}
                                onFinish={handleSubmit}
                                fields={makeModalFields({
                                    planes: planes,
                                    form: form,
                                })}
                            />
                        </div>,
                  },
            ]}
        />
    </Modal>
  )
}


export default ClientePlanesModal;