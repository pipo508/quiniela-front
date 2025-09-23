// src/data/mockData.js

// Exportamos los datos para poder importarlos en cualquier parte de la app
export const quinielas = [
  // Agencias que ofrecen Quiniela Nacional (algunas ahora también Quini 6 y Loto)
  { 
    id: 1, 
    games: ['nacional', 'quini6', 'loto'], // MODIFICADO
    nombre: 'Quiniela "El Trebol"', 
    ubicacion: 'Av. Corrientes 123, CABA', 
    telefono: '11-4567-8901' 
  },
  { 
    id: 2, 
    games: ['nacional'], 
    nombre: 'Agencia 24/7', 
    ubicacion: 'Calle Florida 456, CABA', 
    telefono: '11-2345-6789' 
  },
  { 
    id: 4, 
    games: ['nacional', 'quini6'], 
    nombre: 'La Fortuna Nacional', 
    ubicacion: 'Av. de Mayo 789, CABA', 
    telefono: '11-9012-3456' 
  },
  
  // Agencias que ofrecen Quiniela de Mendoza
  { 
    id: 3, 
    games: ['mendoza'], 
    nombre: 'Agencia "El Aconcagua"', 
    ubicacion: 'Av. San Martín 789, Mendoza', 
    telefono: '261-456-7890' 
  },
  { 
    id: 5, 
    games: ['mendoza', 'quini6', 'loto'], // MODIFICADO
    nombre: 'Quiniela del Sol', 
    ubicacion: 'Las Heras 456, Mendoza', 
    telefono: '261-234-5678' 
  },

  // Agencias que ofrecen principalmente Quini 6
  {
    id: 6,
    games: ['quini6'],
    nombre: 'Punto Quini',
    ubicacion: 'Av. Santa Fe 2300, CABA',
    telefono: '11-6543-2109'
  },
  {
    id: 7,
    games: ['quini6', 'brinco', 'loto'], // MODIFICADO
    nombre: 'El Millonario',
    ubicacion: 'Peatonal Sarmiento 12, Mendoza',
    telefono: '261-876-5432'
  },

  // NUEVO: Agencia que ofrece principalmente Loto
  {
    id: 8,
    games: ['loto'],
    nombre: 'Loto Center',
    ubicacion: 'Av. Cabildo 1800, CABA',
    telefono: '11-3333-4444'
  }
];