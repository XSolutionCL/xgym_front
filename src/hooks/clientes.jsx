import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import useTableFilters from "../common/store/tableFiltersStore";
import { axiosDelete, axiosGet, axiosPaginateGet, axiosPost, baseGetBlobFile } from "../apis/calls";
import { omit } from 'lodash';
import { downloadExcel } from "../utils/files";


const key = "clientes";


export const usePaginateClientes = () => {
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


export const useSaveCliente = () => {
    const queryClient = useQueryClient();
    // const { tableFilters } = useTableFilters();
    return useMutation({
        mutationFn: (cuerpo) => axiosPost(`${key}/guardar`, cuerpo),
        onSuccess: (response) => {
            queryClient.invalidateQueries([key]);
            /* let oldData = queryClient.getQueryData([key, tableFilters]);
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
            }); */
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
            /* const list = queryClient.getQueryData([key]);
            if (list) {
            const newList = list.filter(record => record.id !== response.cod_cliente);
            queryClient.setQueryData(key, newList);
            } */
        },
        onError: () => {
            toast.error("Error al eliminar el cliente");
        }
  })}


  export const useDesasociarPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cuerpo) => axiosDelete(`${key}/desasociar-plan`, cuerpo),
        onSuccess: (response) => {
            toast.success("Plan desacociado correctamente");
            queryClient.invalidateQueries([key + "data-asociar-plan"]);
        },
        onError: () => {
            toast.error("Error al desacociadar el plan");
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
            queryClient.invalidateQueries([key + "data-asociar-plan"]);
            toast.success("Plan asociado correctamente");
        },
        onError: () => {
            toast.error("Error al asociar plan");
        }
    }
    ); 
}


export const useDownloadExcelClientes = () => {
    let toastID = null;
    return useMutation({
      mutationFn: (data) => baseGetBlobFile(`${key}/excel`, data),
      onMutate: (mutation) => {
        toastID = toast.loading("Generando Excel...");
      },
      onSuccess: (response) => {
        if (response){
          downloadExcel(response, key);
          toastID && toast.success("Se generó el Excel correctamente!", {id: toastID});
        }
      },
      onError: (error) => {
        toastID && toast.error("Error al generar Excel", {id: toastID});
        console.log("ERROR", error);
      }
  })
  }