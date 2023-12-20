import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import useTableFilters from "../common/store/tableFiltersStore";
import {
  axiosDelete,
  axiosGet,
  axiosPaginateGet,
  axiosPost,
  baseGetBlobFile,
} from "../apis/calls";
import { downloadExcel } from "../utils/files";
import { omit } from "lodash";

const key = "pagos";

export const useFormCreatePagos = (search, cod_pago) => {
  const params = cod_pago ? `/?cod_pago=${cod_pago}` : "";
  return useQuery(
    [key, "data-pago-guardar", cod_pago],
    () => axiosGet(`${key}/data-pago-guardar${params}`),
    {
      enabled: !!search,
    }
  );
};

export const useGetFiltersOps = (search) => {
  return useQuery([key, "filters-ops"], () => axiosGet(`${key}/filters-ops`), {
    enabled: !!search,
  });
};

export const usePaginatePagos = () => {
  const { tableFilters, setTableFilters } = useTableFilters();
  return useQuery(
    [key, omit(tableFilters, ['pagination.total'])],
    () => axiosPaginateGet(`${key}/all`, tableFilters),
    {
      keepPreviousData: true,
      onSuccess: (response) => {
        let newFilters = { ...tableFilters };
        newFilters.pagination.total = response.total;
        setTableFilters(newFilters);
      },
      enabled: !!tableFilters.sorter.field
    }
  );
};

export const useSavePago = () => {
  const queryClient = useQueryClient();
  // const { tableFilters } = useTableFilters();
  return useMutation({
    mutationFn: (cuerpo) => axiosPost(`${key}/guardar`, cuerpo),
    onSuccess: (response) => {
      queryClient.invalidateQueries([key]);
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
    },
  });
};

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
    },
  });
};


export const useDownloadExcelPagos = () => {
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