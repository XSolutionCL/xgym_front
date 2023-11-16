import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import useTableFilters from "../common/store/tableFiltersStore";
import {
  axiosDelete,
  axiosGet,
  axiosPaginateGet,
  axiosPost,
} from "../apis/calls";

const key = "pagos";

export const useFormCreatePagos = (search, cod_pago) => {
    const params = cod_pago ? `/?cod_pago=${cod_pago}` : "";
  return useQuery(
    [key, "data-pago-guardar"],
    () => axiosGet(`${key}/data-pago-guardar${params}`),
    {
      enabled: !!search
    }
  );
};

 export const usePaginatePagos = () => {
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


export const useSavePago = () => {
  const queryClient = useQueryClient();
  const { tableFilters } = useTableFilters();
  return useMutation({
      mutationFn: (cuerpo) => axiosPost(`${key}/guardar`, cuerpo),
      onSuccess: (response) => {
            queryClient.invalidateQueries([key, tableFilters]);
          /* let oldData = queryClient.getQueryData([key, tableFilters]);
          let newList = [...oldData.list];
          const indexToUpdate = newList.findIndex(
              (item) => item.cod_pago === response.cod_pago
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
          toast.success("Pago guardado correctamente");
      },
      onError: () => {
          toast.error("Error al guardar pago");
      }
  }
  ); 
}


export const usePagoDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: (cuerpo) => axiosDelete(`${key}/eliminar`, cuerpo),
      onSuccess: (response) => {
          toast.success("Pago eliminado correctamente");
          queryClient.invalidateQueries([key]);
          /* const list = queryClient.getQueryData([key]);
          if (list) {
          const newList = list.filter(record => record.id !== response.cod_cliente);
          queryClient.setQueryData(key, newList);
          } */
      },
      onError: () => {
          toast.error("Error al eliminar pago");
      }
})}