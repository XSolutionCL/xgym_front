import { Typography, Spin, Form, Modal, Input, Button, Tabs } from "antd";
import AntTable from "../../components/Tables/AntTable";
import { useClienteDelete, useDownloadExcelClientes, usePaginateClientes, useSaveCliente } from "../../hooks/clientes";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useEffect, useState } from "react";
import FlexForm from "../../components/Forms/FlexForm";
import dayjs from "dayjs";
import { makeColumns, makeItems, makeItemsDextras } from "./clientes.base";
import ClientePlanesModal from "./ClientePlanesModal";
import { useGetDatosEops } from "../../hooks/datosextras";
import { RiFileExcel2Fill } from "react-icons/ri";


const { Title, Text } = Typography;
const { Search } = Input;


const Clientes = () => {

  const [form] = Form.useForm();

  const [editingClient, setEditingClient] = useState(null)

  const { data, isFetching } = usePaginateClientes();

  const { mutate: save, isLoading } = useSaveCliente();
  const { mutate: remove, isLoading: isRemoving } = useClienteDelete();

  const { data: datosEops, isFetching: datosEisLoading } = useGetDatosEops();

  const {mutate: downloadExcel} = useDownloadExcelClientes();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [planesIsModalOpen, setPlanesIsModalOpen] = useState(false);

  const [tableFilters, setTableFilters] = useTableFilters((state) => [state.tableFilters, state.setTableFilters]);

  useEffect(() => {
    if (!tableFilters.sorter.field){
      setTableFilters({
        ...tableFilters,
        sorter: {
          ...tableFilters.sorter,
          field: "cod_cliente"
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
      fn_cliente: dayjs(d.fn_cliente).format("YYYY-MM-DD"),
      datos_extras: d.datos_extras
        ?.map((d, i) => (d !== null ? { [`${i}`]: d } : {})),
      ...(editingClient ? { cod_cliente: editingClient } : {}),
    }; 

    form.isFieldsTouched() ? save(cuerpo) : null;
    
    setModalIsOpen(false);
    setEditingClient(null);
    form.resetFields();
  }

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false);    
  };

  const onSearch = (value) => {
    if (value && value?.length > 0) {
      setTableFilters({
        ...tableFilters,
        filters: {search: value},
      })
    }else{
      setTableFilters({
        ...tableFilters,
        filters: {},
      })
    }
  }

  if (isFetching || !tableFilters.sorter.field || isLoading || isRemoving || datosEisLoading) {
    return <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4">
      <ClientePlanesModal isModalOpen={planesIsModalOpen} setIsModalOpen={setPlanesIsModalOpen}/>
      <div className="flex flex-row items-center justify-between w-full">
        <Title level={2}>Lista de Clientes</Title>
        <div className="flex flex-col items-end justify-between w-1/4 gap-4">
          <Search 
            autoFocus
            value={tableFilters.filters.search}
            placeholder="Nombre, Apellidos o Rut"
            allowClear
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          style={{
            top: 50
          }}
          width={1000}
          title={`${editingClient ? 'Editar' : 'Crear'} Cliente`}
          text={"Añadir Cliente"}
          isModalOpen={modalIsOpen}
          setIsModalOpen={setModalIsOpen}
          onCancel={onCancel}
          onOk={form.submit}
          component={
            <Tabs
              items={[
                {
                  key: "1",
                  label: "Datos Principales",
                  children: <FlexForm
                              form={form} 
                              onFinish={handleSubmit} 
                              fields={makeItems({
                                sexos: data.sexos || []
                              })}
                            />
                },
                {
                  key: "2",
                  label: "Datos Extras",
                  children: <FlexForm
                              form={form} 
                              onFinish={handleSubmit} 
                              fields={makeItemsDextras({datosEops:datosEops})}
                            />
                }
              ]}
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
        />
      </div>
      <AntTable 
        columns={makeColumns({
          form: form,
          setPlanesIsModalOpen: setPlanesIsModalOpen,
          remove: remove,
          setEditingClient: setEditingClient, 
          setModalIsOpen: setModalIsOpen,
        })} 
        data={data.list} 
      />
    </div>
  )
    
  
}

export default Clientes;
