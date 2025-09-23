// src/data/mockResults.js

export const mockResults = { // <-- El nombre es "mockResults"
  "quiniela-nacional": {
    id: "quiniela-nacional",
    nombre: "Quiniela Nacional",
    fecha: "martes, 23 de septiembre de 2025",
    sorteos: [
      { titulo: "La Previa", cabeza: { numero: "5409", significado: "Arroyo" }, lista: ["5409", "2988", "7906", "0854", "5406", "4235", "4325", "0557", "9079", "2517", "9073", "1373", "7679", "2486", "4294", "9947", "9961", "3630", "0981", "1969"] },
      { titulo: "La Primera", cabeza: { numero: "5956", significado: "La caída" }, lista: ["5956", "7279", "0528", "3596", "9654", "2214", "9649", "0513", "1308", "3720", "4255", "1078", "7610", "1807", "2938", "6329", "9980", "2185", "4405", "3931"] },
      { titulo: "Matutina", cabeza: { numero: "8843", significado: "Balcón" }, lista: ["8843", "3775", "4866", "4438", "1858", "6594", "9237", "1914", "4202", "0035", "8799", "6516", "1692", "9680", "6251", "6620", "1781", "0599", "9521", "1018"] },
      { titulo: "Vespertina", cabeza: { numero: "5992", significado: "Médico" }, lista: ["5992", "1520", "3609", "8064", "6450", "5429", "5642", "7374", "3171", "7519", "5832", "3031", "8720", "1031", "2910", "8108", "8945", "1372", "9432", "0690"] },
    ],
  },
  "quiniela-mendoza": {
    id: "quiniela-mendoza",
    nombre: "Quiniela de Mendoza",
    fecha: "martes, 23 de septiembre de 2025",
    sorteos: [
      { titulo: "La Previa", cabeza: { numero: "0874", significado: "Negros" }, lista: ["0874", "2158", "0851", "2280", "3804", "4861", "6824", "2167", "6902", "6279", "5557", "0669", "3730", "1377", "8584", "2698", "3990", "5854", "4011", "4251"] },
      { titulo: "La Primera", cabeza: { numero: "3654", significado: "La vaca" }, lista: ["3654", "2031", "5586", "1124", "2404", "8618", "4544", "7775", "8983", "9831", "6963", "5785", "9683", "3030", "9618", "9497", "7336", "3864", "9846", "1524"] },
    ],
  },
  "quini6": {
    id: "quini6",
    nombre: "Quini 6",
    fecha: "domingo, 21 de septiembre de 2025",
    sorteoNro: "3306",
    modalidades: [
      { titulo: "Tradicional", numeros: ["01", "16", "19", "21", "35", "38"], premios: [{ aciertos: 6, ganadores: 0, monto: "650.000.000" }, { aciertos: 5, ganadores: 21, monto: "1.658.346" }, { aciertos: 4, ganadores: 1055, monto: "9.902" }] },
      { titulo: "La Segunda", numeros: ["23", "20", "37", "30", "11", "21"], premios: [{ aciertos: 6, ganadores: 0, monto: "3.554.256.803" }, { aciertos: 5, ganadores: 17, monto: "2.048.545" }] },
      { titulo: "Revancha", numeros: ["41", "11", "37", "24", "45", "30"], premios: [{ aciertos: 6, ganadores: 0, monto: "1.091.763.954" }] },
      { titulo: "Siempre Sale", numeros: ["45", "25", "21", "14", "18", "29"], premios: [{ aciertos: 5, ganadores: 39, monto: "8.007.280" }] },
    ]
  },
  "loto": {
    id: "loto",
    nombre: "Loto Plus",
    fecha: "sábado, 20 de septiembre de 2025",
    sorteoNro: "3815",
    nroPlus: "06",
    modalidades: [
      { titulo: "Tradicional", numeros: ["00", "02", "07", "08", "18", "34"], premios: [{ aciertos: 6, ganadores: 0, monto: "383.812.564,92" }, { aciertos: 5, ganadores: 6, monto: "14.380.043,78" }] },
      { titulo: "Match", numeros: ["01", "13", "14", "16", "20", "28"], premios: [{ aciertos: 6, ganadores: 0, monto: "4.830.980.782,21" }] },
      { titulo: "Desquite", numeros: ["09", "12", "16", "23", "42", "43"], premios: [{ aciertos: 6, ganadores: 0, monto: "939.972.048,40" }] },
      { titulo: "Sale o Sale", numeros: ["17", "27", "35", "37", "41", "42"], premios: [{ aciertos: 5, ganadores: 10, monto: "37.039.606,72" }] },
    ]
  }
};