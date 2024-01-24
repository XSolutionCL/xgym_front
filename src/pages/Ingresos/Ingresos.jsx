import {
  Button,
  Result,
  Divider,
  Form,
  Input,
  Typography,
  Descriptions,
  Tag,
  Spin,
  Table,
  Tooltip,
  Image,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  SmileOutlined,
  DollarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  useGetClienteInfo,
  useGetIngresosDia,
  useRegistrarIngreso,
  useRegistrarIngresoDiario,
} from "../../hooks/ingresos";
import {
  makeColumns,
  makeDescClienteItems,
  makeDescPlanItems,
} from "./ingresos.base";
import { toast } from "react-hot-toast";
import { PiSealWarningThin } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { v4 } from "uuid";
import IngresoDiarioModal from "./IngresoDiarioModal";
import HistoricoDrawer from "./HistoricoDrawer";

const { Title, Text } = Typography;

const baseURL = {
  production: import.meta.env.VITE_PROD_API,
  qa: import.meta.env.VITE_QA_API,
  development: import.meta.env.VITE_DEV_API,
};
const ENV = import.meta.env.VITE_ENV;

const API_IMAGE_CLIENTES = `${baseURL[ENV]}images/clientes/`

const Ingreso = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [isDeveloping, setIsDeveloping] = useState(false);

  const [pagoDiarioModalIsOpen, setPagoDiarioModalIsOpen] = useState(false);

  const [historicoDrawerIsOpen, setHistoricoDrawerIsOpen] = useState(false);

  const [codCliente, setCodCliente] = useState(null);

  const { data: ingresosDia, isFetching: ingresosDiaisLoading } =
    useGetIngresosDia();

  const {
    data: clInfo,
    isFetching: clienteInfoIsLoading,
    isFetched,
  } = useGetClienteInfo(codCliente);

  const { clienteInfo, historico } = clInfo ? clInfo : {};

  const { mutate: ingresar, isLoading: isIngresando } = useRegistrarIngreso();

  const { mutate: ingresarDiario, isLoading: isIngresandoDiario } =
    useRegistrarIngresoDiario();

  useEffect(() => {
    if (!clienteInfo && isFetched) {
      toast.error("Cliente no registrado o sin plan asociado");
    }
  }, [clienteInfoIsLoading]);

  const onFinish = (values) => {
    console.log(values);
    if (values.cod_cliente) {
      setCodCliente(values.cod_cliente);
    } else {
      setCodCliente(null);
    }
  };

  const handleIngreso = () => {
    ingresar({ cod_cliente: clienteInfo.cod_cliente });
    form.resetFields();
    setCodCliente(null);
  };

  const handleIngresoDiario = ({ cod_forma_pago, codigo_autorizacion }) => {
    ingresarDiario({
      cod_cliente: clienteInfo.cod_cliente,
      cod_forma_pago,
      codigo_autorizacion,
    });
    form.resetFields();
    setCodCliente(null);
  };

  return (
    <>
      {isDeveloping ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Result
            status="info"
            icon={<SmileOutlined />}
            title="En Desarrollo"
            subTitle="Pronto estará disponible este módulo."
            extra={<Button onClick={() => navigate(-1)}>Back Home</Button>}
          />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full p-4 lg:flex-row">
          {/* Ingreso Nuevo */}
          <div className="flex flex-col w-full h-full lg:w-1/2">
            <Title level={4}>Nuevo Ingreso Cliente</Title>
            <Form
              onFinish={onFinish}
              className="flex flex-row justify-between w-full gap-2"
              form={form}
            >
              <Form.Item
                name="cod_cliente"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar un código válido",
                  },
                ]}
              >
                <Input
                  autoFocus
                  type="text"
                  placeholder="Ingrese el Código del Cliente"
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Buscar Cliente</Button>
              </Form.Item>
            </Form>
            <Divider className="mt-2 mb-5" />
            {clienteInfoIsLoading || isIngresando || isIngresandoDiario ? (
              <Spin
                className="flex flex-row items-center justify-center w-full h-full"
                size="large"
              />
            ) : (
              clienteInfo && (
                <div className="relative flex flex-col justify-start w-full h-full gap-4">
                  <IngresoDiarioModal
                    open={pagoDiarioModalIsOpen}
                    setOpen={setPagoDiarioModalIsOpen}
                    pagar={handleIngresoDiario}
                  />
                  <HistoricoDrawer
                    open={historicoDrawerIsOpen}
                    setOpen={setHistoricoDrawerIsOpen}
                    historico={historico}
                  />
                  {/* Info Cliente */}
                  <Descriptions
                    title={
                      <div className="flex items-center justify-start gap-2">
                        <>Cliente</>
                        {clienteInfo?.imagen_cliente && (
                          <Image
                            width={40}
                            height={40}
                            src="avatar.avif"
                            loading="eager"
                            preview={{
                              src: `${API_IMAGE_CLIENTES}${
                                clienteInfo.imagen_cliente
                              }`,
                              destroyOnClose: true,
                            }}
                          />
                        )}
                        {historico?.length > 0 && (
                          <Tooltip title="Ver Histórico">
                            <Button
                              style={{width: 30, height: 30}}
                              size="small"
                              shape="circle"
                              icon={<UnorderedListOutlined />}
                              onClick={() => setHistoricoDrawerIsOpen(true)}
                            />
                          </Tooltip>
                        )}
                      </div>
                    }
                    bordered
                    extra={
                      <div className="flex flex-row items-center gap-2">
                        {ingresosDia
                          .map((c) => c.cod_cliente)
                          .includes(clienteInfo?.cod_cliente) && (
                          <Tooltip title="EL Cliente ya ingresó el día de hoy">
                            <PiSealWarningThin
                              className="animate-bounce"
                              color="orange"
                              size="1.5em"
                            />
                          </Tooltip>
                        )}
                        <Tag
                          color={
                            clienteInfo.acceso_permitido === "S"
                              ? "green"
                              : "volcano"
                          }
                        >
                          {clienteInfo.acceso_permitido === "S"
                            ? "Acceso Permitido"
                            : "Acceso Denegado"}
                        </Tag>
                        {clienteInfo.acceso_permitido === "S" &&
                          !ingresosDia
                            .map((c) => c.cod_cliente)
                            .includes(clienteInfo?.cod_cliente) && (
                            <Tooltip title="Confirmar Ingreso">
                              <Button
                                size="small"
                                onClick={() => handleIngreso()}
                                icon={<CgGym size="1.5em" />}
                              />
                            </Tooltip>
                          )}
                        {clienteInfo.acceso_permitido === "N" &&
                          !ingresosDia
                            .map((c) => c.cod_cliente)
                            .includes(clienteInfo?.cod_cliente) && (
                            <Tooltip title="Pago Diario">
                              <Button
                                size="small"
                                icon={<DollarOutlined />}
                                onClick={() => setPagoDiarioModalIsOpen(true)}
                              />
                            </Tooltip>
                          )}
                      </div>
                    }
                    layout="vertical"
                    items={makeDescClienteItems({ clienteInfo: clienteInfo })}
                  />
                  {/* Info Plan Cliente */}
                  <Descriptions
                    title="Plan Activo"
                    bordered
                    layout="vertical"
                    items={makeDescPlanItems({ clienteInfo: clienteInfo })}
                  />
                </div>
              )
            )}
          </div>
          {/* Ingresos del día */}
          <Divider type="vertical" className="h-full" />
          <div className="flex flex-col w-full h-full lg:overflow-hidden lg:w-1/2">
            <div className="flex flex-row items-center justify-between w-full text-center">
              <Title className="p-0 m-0" level={4}>
                Ingreso Diario
              </Title>
              <Title className="p-0 m-0" level={5}>
                Total: {ingresosDia?.length}
              </Title>
            </div>
            <Table
              className="overflow-y-auto"
              pagination={{
                simple: true,
              }}
              rowKey={(record) => v4()}
              bordered
              dataSource={ingresosDia}
              loading={ingresosDiaisLoading}
              columns={makeColumns()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Ingreso;
