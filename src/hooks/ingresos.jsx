import { axiosGet, axiosPost } from "../apis/calls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from 'react-hot-toast';

const key = "ingresos";

export const useGetIngresosDia = () => {
    return useQuery(
      [key],
      () => axiosGet(`${key}/all`),
    );
  };


  export const useGetClienteInfo = (codCliente) => {
    return useQuery(
      [key, codCliente],
      () => axiosGet(`${key}/by-cod/?cod_cliente=${codCliente}`),
      {
        enabled: !!codCliente
      }
    );
  };


  export const useRegistrarIngreso = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (cuerpo) => axiosPost(`${key}/registrar`, cuerpo),
      onSuccess: (response) => {
        queryClient.invalidateQueries([key]);
        toast.success("Ingreso cliente guardado correctamente");
      },
      onError: () => {
        toast.error("Error al guardar ingreso cliente");
      },
    });
  };


  export const useRegistrarIngresoDiario = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (cuerpo) => axiosPost(`${key}/diario`, cuerpo),
      onSuccess: (response) => {
        queryClient.invalidateQueries([key]);
        toast.success("Ingreso diario cliente guardado correctamente");
      },
      onError: () => {
        toast.error("Error al guardar ingreso diario cliente");
      },
    });
  };