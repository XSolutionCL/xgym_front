import dayjs from "dayjs";



export const formatTime24Hrs = (value) => {
    return dayjs(value, "HH:mm").format("HH:mm");
}


export const formatFullDateToTime24Hrs = (value) => {
    return dayjs(value).format("HH:mm");
}


const test = () => {
  const t = "Probado Atajos";
  return test;
}
