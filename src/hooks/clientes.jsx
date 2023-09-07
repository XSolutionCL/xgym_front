import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useTableFilters from "../common/store/tableFiltersStore";
import { axiosPaginateGet } from "../apis/calls";


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
            }
        }
    ); 
}