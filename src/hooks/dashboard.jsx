import { useQuery } from "react-query";
import { axiosGet } from "../apis/calls";


const key = "dashboard";


export const useDashboardInfo = (desde, hasta) => {
    return useQuery(
        [key, desde, hasta], 
        () => axiosGet(`${key}/all/?desde=${desde}&hasta=${hasta}`),
        {
            keepPreviousData: true,
        }
    ); 
}