import { Button, Result, Divider, Form, Input, Typography, Descriptions, Tag, Spin, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { SmileOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useGetClienteInfo, useGetIngresosDia, useRegistrarIngreso } from "../../hooks/ingresos";
import { makeColumns, makeDescClienteItems, makeDescPlanItems } from "./ingresos.base";
import { toast } from 'react-hot-toast';
import { PiSealWarningThin } from "react-icons/pi";
import { CgGym } from "react-icons/cg";

const { Title, Text } = Typography;

const Ingreso = () => {
  
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [isDeveloping, setIsDeveloping] = useState(false);

  const [codCliente, setCodCliente] = useState(null);

  const { data: ingresosDia, isFetching: ingresosDiaisLoading } = useGetIngresosDia();

  const { data: clienteInfo, isFetching: clienteInfoIsLoading, isFetched } = useGetClienteInfo(codCliente);

  const { mutate: ingresar, isLoading: isIngresando } = useRegistrarIngreso();

  useEffect(() => {
    if (!clienteInfo && isFetched){
      toast.error("Cliente no registrado o sin plan asociado");
    }
  }, [clienteInfoIsLoading])
  

  const onFinish = (values) => {
    console.log(values);
    if (values.cod_cliente){
      setCodCliente(values.cod_cliente);
    }else{
      setCodCliente(null);
    }
  }

  const handleIngreso = () => {
    ingresar({ cod_cliente: clienteInfo.cod_cliente });
    form.resetFields();
    setCodCliente(null);
  }
  
  

  return (
    <>
      {isDeveloping ? <div className="flex flex-col items-center justify-center w-full h-full">
        <Result
          status="info"
          icon={<SmileOutlined />}
          title="En Desarrollo"
          subTitle="Pronto estará disponible este módulo."
          extra={<Button  onClick={() => navigate(-1)}>Back Home</Button>}
        />
      </div>: 
      <div className="flex flex-col w-full h-full p-4 lg:flex-row">
        {/* Ingreso Nuevo */}
        <div className="flex flex-col w-full h-full lg:w-1/2">
          <Title level={4}>Nuevo Ingreso Cliente</Title>
          <Form onFinish={onFinish} className="flex flex-row justify-between w-full gap-2" form={form}>
            <Form.Item 
              name="cod_cliente"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Debe ingresar un código válido"
                },
              ]}
            >
              <Input autoFocus type="text" placeholder="Ingrese el Código del Cliente"/>
            </Form.Item>
            <Form.Item
            >
              <Button htmlType="submit">Buscar Cliente</Button>
            </Form.Item>
          </Form>
          <Divider className="mt-2 mb-5"/>
          {clienteInfoIsLoading || isIngresando ? <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" /> :
            clienteInfo &&  
            <div className="flex flex-col justify-start w-full h-full gap-4">
              {/* Info Cliente */}
              <Descriptions 
                title="Cliente"
                bordered
                extra={<div className="flex flex-row items-center gap-2">
                        {
                          ingresosDia.map(c => c.cod_cliente).includes(clienteInfo?.cod_cliente) && 
                          <Tooltip title="EL Cliente ya ingresó el día de hoy">
                            <PiSealWarningThin className="animate-bounce" color="orange" size="1.5em"/>
                          </Tooltip>
                        }
                        <Tag color={clienteInfo.acceso_permitido === "S" ? "green": "volcano"}>
                          {clienteInfo.acceso_permitido === "S" ? "Acceso Permitido": "Acceso Denegado"}
                        </Tag>
                        <Tooltip title="Confirmar Ingreso">
                          <Button
                            // shape="circle"
                            size="small"
                            disabled={clienteInfo.acceso_permitido === "N" || ingresosDia.map(c => c.cod_cliente).includes(clienteInfo?.cod_cliente)}
                            onClick={() => handleIngreso()}
                            icon={<CgGym size="1.5em"/>} 
                          />
                        </Tooltip>
                      </div>
                      }
                layout="vertical" 
                items={makeDescClienteItems({clienteInfo: clienteInfo})}
              />
              {/* Info Plan Cliente */}
              <Descriptions 
                title="Plan Activo"
                bordered
                layout="vertical"
                items={makeDescPlanItems({clienteInfo: clienteInfo})}
              />
            </div>
          }
        </div>
        {/* Ingresos del día */}
        <Divider type="vertical" className="h-full"/>
        <div className="flex flex-col w-full h-full lg:overflow-hidden lg:w-1/2">
          <div className="flex flex-row items-center justify-between w-full text-center lg:overflow-hidden">
            <Title className="p-0 m-0" level={4}>Ingreso Diario</Title>
            <Title className="p-0 m-0" level={5}>Total: {ingresosDia?.length}</Title>
          </div>
          <Table
            className="overflow-y-auto"
            bordered
            dataSource={ingresosDia}
            loading={ingresosDiaisLoading}
            columns={makeColumns()}
          />
        </div>
      </div>
      }
    </>
  )
}

export default Ingreso;