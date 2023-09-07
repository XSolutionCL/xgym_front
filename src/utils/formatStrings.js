
export const siglas = (nombreCompleto) => {
    const palabras = nombreCompleto.split(" "); // Dividir el string en palabras usando el espacio como separador
    let iniciales = "";

    for (const palabra of palabras) {
    iniciales += palabra[0]; // Agregar la primera letra de cada palabra a las iniciales
    }
    return iniciales;
}