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

export const useFormCreatePagos = (search) => {
  
  return useQuery(
    [key, "data-pago-guardar"],
    () => axiosGet(`${key}/data-pago-guardar`),
    {
      enabled: !!search
    }
  );
};

// export const usePaginateClientes = () => {
//     const { tableFilters, setTableFilters } = useTableFilters();
//     return useQuery(
//         [key, tableFilters],
//         () => axiosPaginateGet(`${key}/all`, tableFilters),
//         {
//             keepPreviousData: true,
//             onSuccess: (response) => {
//                 let newFilters = {...tableFilters};
//                 newFilters.pagination.total = response.total;
//                 setTableFilters(newFilters);
//             },
//         }
//     );
// }
