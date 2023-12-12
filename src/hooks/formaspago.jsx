import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import useTableFilters from "../common/store/tableFiltersStore";
import { axiosDelete, axiosGet, axiosPaginateGet, axiosPost } from "../apis/calls";


const key = "formas_pago";


export const usePaginateFormasPago = () => {
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


export const useSaveFormasPago = () => {
    const queryClient = useQueryClient();
    const { tableFilters } = useTableFilters();
    return useMutation({
        mutationFn: (cuerpo) => axiosPost(`${key}/guardar`, cuerpo),
        onSuccess: (response) => {
            let oldData = queryClient.getQueryData([key, tableFilters]);
            let newList = [...oldData.list];
            const indexToUpdate = newList.findIndex(
                (item) => item.cod_forma_pago === response.cod_forma_pago
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
            toast.success("Forma de Pago guardada correctamente");
        },
        onError: () => {
            toast.error("Error al guardar la forma de pago");
        }
    }
    ); 
}

export const useDeleteFormasPago = () => {
    const queryClient = useQueryClient();
    // const { tableFilters } = useTableFilters();
    return useMutation({
        mutationFn: (cuerpo) => axiosDelete(`${key}/eliminar`, cuerpo),
        onSuccess: (response) => {
            toast.success("Forma de Pago eliminada correctamente");
            queryClient.invalidateQueries([key]);
            /* const oldData = queryClient.getQueryData([key, tableFilters]);
            let newList = [...oldData.list];
            queryClient.setQueryData([key, tableFilters], {
                ...oldData,
                total: oldData.total - 1,
                list: newList.filter((item) => item.cod_plan !== response.cod_plan)
            }); */
        },
        onError: () => {
            toast.error("Error al eliminar la forma de pago");
        }
  })}



  export const useFormasPagoOps = (open) => {
    return useQuery(
        [key, "ops"],
        () => axiosGet(`${key}/ops`),
        {
            enabled: !!open
        }
    ); 
}