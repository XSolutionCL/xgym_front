export const makeColumns = () => {
  const columns = [
    {
      dataIndex: "desc_cliente",
      title: "Cliente",
      width: 50,
    },
    {
      dataIndex: "desc_plan",
      title: "Plan",
      width: 50,
    },
    {
      dataIndex: "monto_pago",
      title: "Monto",
      width: 50,
    },
    {
      dataIndex: "desc_forma_pago",
      title: "Forma Pago",
      width: 30,
    },
    {
      dataIndex: "fecha_pago",
      title: "Fecha",
      width: 30,
    },
  ];
  return columns;
};

export const makeModalFields = ({ data, selectedClientePlanes, selectedCuotas }) => {
  
  
  const fields = [
    {
      name: "cod_cliente",
      label: "Cliente",
      type: "select",
      options: data || [],
      required: true,
    },
    {
      name: "cod_plan",
      label: "Planes",
      type: "select",
      options: selectedClientePlanes, 
      required: true,
    },
    {
      name: "monto_cuota",
      label: "Monto Cuota",
      disabled: true,
      type: "number",
    },
    {
      name: "cuotas_restantes",
      label: "Cuotas Pagar",
      type: "select",
      required: true,
      options: selectedCuotas,     
    },
    //TODO
    {
      name: "cod_forma_pago",
      label: "Forma Pago",
      type: "select",
      required: true,
      options: [],     
    },
    {
      name: "monto_total",
      label: "Monto Total",
      disabled: true,
      type: "number",      
    },
  ];
  return fields;
};
