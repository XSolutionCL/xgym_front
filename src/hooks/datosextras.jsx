import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import useTableFilters from "../common/store/tableFiltersStore";
import { axiosDelete, axiosGet, axiosPaginateGet, axiosPost } from "../apis/calls";
import { omit } from "lodash";


const key = "datos_extras";


export const usePaginateDatosExtras = () => {
    const { tableFilters, setTableFilters } = useTableFilters();
    return useQuery(
        [key, omit(tableFilters, ['pagination.total'])],
        () => axiosPaginateGet(`${key}/all`, tableFilters),
        {
            keepPreviousData: true,
            onSuccess: (response) => {
                let newFilters = {...tableFilters};
                newFilters.pagination.total = response.total;
                setTableFilters(newFilters);
            },
            enabled: !!tableFilters.sorter.field
        }
    ); 
}


export const useGetDatosEops = () => {
    return useQuery(
        [key, "ops"],
        () => axiosGet(`${key}/ops`),
    ); 
}


export const useSaveDatosExtras = () => {
    const queryClient = useQueryClient();
    const { tableFilters } = useTableFilters();
    return useMutation({
        mutationFn: (cuerpo) => axiosPost(`${key}/guardar`, cuerpo),
        onSuccess: (response) => {
            let oldData = queryClient.getQueryData([key, tableFilters]);
            let newList = [...oldData.list];
            const indexToUpdate = newList.findIndex(
                (item) => item.cod_datos_extra === response.cod_datos_extra
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
            toast.success("Datos Extras guardados correctamente");
        },
        onError: () => {
            toast.error("Error al guardar datos extras");
        }
    }
    ); 
}

export const useDeleteDatosExtras = () => {
    const queryClient = useQueryClient();
    // const { tableFilters } = useTableFilters();
    return useMutation({
        mutationFn: (cuerpo) => axiosDelete(`${key}/eliminar`, cuerpo),
        onSuccess: (response) => {
            toast.success("Datos Extras eliminados correctamente");
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
            toast.error("Error al eliminar los datos extras");
        }
  })}