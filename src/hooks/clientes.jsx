import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useTableFilters from "../common/store/tableFiltersStore";
import { axiosDelete, axiosPaginateGet, axiosPost } from "../apis/calls";


const key = "clientes";


export const usePaginateClientes = () => {
    const { tableFilters, setTableFilters } = useTableFilters();
    return useQuery(
        [key, tableFilters], 
        () => axiosPaginateGet(`${key}/all`, tableFilters),
        {
            keepPreviousData: true,
            onSuccess: (response) => {
                let newFilters = {...tableFilters};
                newFilters.pagination.total = response.total;
                setTableFilters(newFilters);
            },
        }
    ); 
}


export const useSaveCliente = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cuerpo) => axiosPost(`${key}/guardar`, cuerpo),
        onSuccess: (response) => {
            queryClient.invalidateQueries([key]);
            toast.success("Cliente guardado correctamente");
        },
        onError: () => {
            toast.error("Error al guardar cliente");
        }
    }
    ); 
}

export const useClienteDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cuerpo) => axiosDelete(`${key}/eliminar`, cuerpo),
        onSuccess: (response) => {
            toast.success("Cliente eliminado correctamente");
            queryClient.invalidateQueries([key]);
            const list = queryClient.getQueryData([key]);
            if (list) {
            const newList = list.filter(record => record.id !== response.cod_cliente);
            queryClient.setQueryData(key, newList);
            }
        },
        onError: () => {
            toast.error("Error al eliminar el cliente");
        }
  })}