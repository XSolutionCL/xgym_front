import dayjs from "dayjs";

export function formatDicomDate(str) {
    // Extraemos los valores de día, mes y año del string
    const year = str.slice(0, 4);
    const month = str.slice(4, 6);
    const day = str.slice(6, 8);
  
    // Construimos el string en formato "DD-MM-YYYY"
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }


export const formatDateDdMmYyyy = (date) => {
  return dayjs(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
}