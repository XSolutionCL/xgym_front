

export function formatCLP(num) {
  if (num){
    return num.toLocaleString("es-CL",{
      style: "currency",
      currency: "CLP"
    })
  }
  return "";
}

export const formatterNumber = (val) => {
    if (!val) return "";
    return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\.(?=\d{0,2}$)/g, ",");
  }
  
  export const parserNumber = (val) => {
    if (!val) return "";
    return Number.parseFloat(val.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")).toFixed(2)
  }