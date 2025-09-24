// src/data/mockBets.js
export const mockBets = [
  {
    id: 101,
    juego: 'quiniela',
    apostadorEmail: 'jugador1@email.com',
    fecha: '2025-09-24T10:30:00Z',
    estado: 'pendiente',
    detalles: {
      quinielaNombre: 'Quiniela "El Trebol"',
      montoTotal: 150.00,
      premioTotal: 10500.00,
      apuestas: [
        { numero: '123', monto: 50.00, tipo: { texto: 'A la Cabeza' } },
        { numero: '45', monto: 100.00, tipo: { texto: 'A los 10' } },
      ],
    }
  },
  {
    id: 102,
    juego: 'quini6',
    apostadorEmail: 'suerte@email.com',
    fecha: '2025-09-23T18:45:00Z',
    estado: 'pendiente',
    detalles: {
      numeros: [5, 12, 23, 31, 40, 45],
      revancha: true,
      siempreSale: false,
      costo: 3000,
    }
  },
  {
    id: 103,
    juego: 'loto',
    apostadorEmail: 'fanatico_loto@email.com',
    fecha: '2025-09-23T15:10:00Z',
    estado: 'cargado', // Este ya está procesado
    detalles: {
      numeros: [2, 11, 20, 28, 33, 41],
      costo: 4000,
    }
  },
  {
    id: 104,
    juego: 'quiniela',
    apostadorEmail: 'otro_jugador@email.com',
    fecha: '2025-09-22T21:00:00Z',
    estado: 'rechazado', // Este fue rechazado
    detalles: {
      quinielaNombre: 'Agencia 24/7',
      montoTotal: 200.00,
      premioTotal: 14000.00,
      apuestas: [
        { numero: '77', monto: 200.00, tipo: { texto: 'A la Cabeza' } },
      ],
    }
  }
];