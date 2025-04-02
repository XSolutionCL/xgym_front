import { Typography, Spin, Form } from "antd";
import AntTable from "../../components/Tables/AntTable";
import useTableFilters from "../../common/store/tableFiltersStore";
import BaseModal from "../../components/Modals/BaseModal";
import { useEffect, useState } from "react";
import CustomForm from "../../components/Forms/CustomForm";
import { makeColumns, makeItems } from "./usuarios.base";
import {
  useDeleteUsuario,
  usePaginateUsuarios,
  useSaveUsuario,
} from "../../hooks/usuarios";
import { useHasPermission } from "../../utils/permissions";

const { Title } = Typography;

const Usuarios = () => {
  const { data, isFetching } = usePaginateUsuarios();
  const { mutate: save, isLoading } = useSaveUsuario();
  const { mutate: remove, isLoading: isRemoving } = useDeleteUsuario();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { hasPermission } = useHasPermission();

  const [tableFilters, setTableFilters] = useTableFilters((state) => [
    state.tableFilters,
    state.setTableFilters,
  ]);

  useEffect(() => {
    if (!tableFilters.sorter.field) {
      setTableFilters({
        ...tableFilters,
        sorter: {
          ...tableFilters.sorter,
          field: "cod_usuario",
        },
      });
    }
    return () => {
      setTableFilters({
        ...tableFilters,
        filters: {},
        sorter: {
          columnKey: 0,
          field: null,
          order: "descend",
        },
      });
    };
  }, []);

  const [form] = Form.useForm();

  const [editingUsuario, setEditingUsuario] = useState(null);

  const handleSubmit = (d) => {
    const cuerpo = {
      ...d,
      ...(editingUsuario ? { cod_usuario: editingUsuario } : {}),
    };

    form.isFieldsTouched() ? save(cuerpo) : null;

    setModalIsOpen(false);
    setEditingUsuario(null);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    setModalIsOpen(false);
    setEditingUsuario(null);
  };

  if (isFetching || isLoading || isRemoving) {
    return (
      <Spin
        className="flex flex-row items-center justify-center w-full h-full"
        size="large"
      />
    );
  }

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
              fields={makeItems({cargos: data?.cargos})}
            />
          }
        />
      </div>
      <AntTable
        columns={makeColumns({
          form: form,
          remove: remove,
          setEditingUsuario: setEditingUsuario,
          setModalIsOpen: setModalIsOpen,
          hasPermission: hasPermission,
        })}
        data={data?.list}
      />
    </div>
  );
};

export default Usuarios;
