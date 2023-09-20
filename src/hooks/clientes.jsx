import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import useTableFilters from "../common/store/tableFiltersStore";
import { axiosDelete, axiosGet, axiosPaginateGet, axiosPost } from "../apis/calls";


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
    const { tableFilters } = useTableFilters();
    return useMutation({
        mutationFn: (cuerpo) => axiosPost(`${key}/guardar`, cuerpo),
        onSuccess: (response) => {
            let oldData = queryClient.getQueryData([key, tableFilters]);
            let newList = [...oldData.list];
            const indexToUpdate = newList.findIndex(
                (item) => item.cod_cliente === response.cod_cliente
            )
            if (indexToUpdate === -1){
                newList.push({...response});
            }else{
                newList[indexToUpdate] = {...response};
            }
            queryClient.setQueryData([key, tableFilters], {
                ...oldData,
                total: indexToUpdate === -1 ? oldData.total + 1 : oldData.total,
                list: newList
            });
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


  export const useGetHistoricoPlanes = (cod_cliente) => {
    return useQuery(
        [key + "data-asociar-plan", cod_cliente], 
        () => axiosGet(`${key}/data-asociar-plan/?cod_cliente=${cod_cliente}`),
        {
            enabled: !!cod_cliente
        }
    ); 
}


export const useAscociarPlanCliente = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cuerpo) => axiosPost(`${key}/asociar-plan`, cuerpo),
        onSuccess: (response, vars) => {
            queryClient.setQueryData([key + "data-asociar-plan"] , old => [...old||[], {...response}]);
            toast.success("Plan asociado correctamente");
        },
        onError: () => {
            toast.error("Error al asociar plan");
        }
    }
    ); 
}