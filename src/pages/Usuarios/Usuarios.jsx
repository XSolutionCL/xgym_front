import { Typography, Spin, Form } from "antd";
import AntTable from "../../components/Tables/AntTable";
//import { useClienteDelete, usePaginateClientes, useSaveCliente } from "../../hooks/clientes";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import { makeColumns, makeItems } from "./usuarios.base";

const { Title } = Typography;

const Usuarios = () => {
  const [tableFilters] = useTableFilters((state) => {
    state.tableFilters.sorter.field = "cod_usuario";
    return [state.tableFilters];
  });

  const [form] = Form.useForm();

  const [editingUsuario, setEditingUsuario] = useState(null);

  //TODO
  //const { data, isFetching, isError } = usePaginateClientes();
  //const { mutate: save, isLoading } = useSaveCliente();
  //const { mutate: remove, isLoading: isRemoving } = useClienteDelete();

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  };

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
      <Title>Lista de Usuarios</Title>
      <div className="flex flex-row justify-start mb-2">
        <BaseModal
          title={`${editingUsuario ? "Editar" : "Crear"} Usuario`}
          text={"Añadir Usuario"}
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
          setEditingUsuario: setEditingUsuario,
          setModalIsOpen: setModalIsOpen,
        })}
        //data={data.list}
        data={[
          {
            cod_usuario: 1,
            desc_usuario: "Descripción Usuario 1",
            login_usuario: "user1",
            contrasena: "1.user",
          },
          {
            cod_usuario: 2,
            desc_usuario: "Descripción Usuario 2",
            login_usuario: "user2",
            contrasena: "2.user",
          },
          {
            cod_usuario: 3,
            desc_usuario: "Descripción Usuario 3",
            login_usuario: "user3",
            contrasena: "3.user",
          },
        ]}
      />
    </div>
  );
};

export default Usuarios;
