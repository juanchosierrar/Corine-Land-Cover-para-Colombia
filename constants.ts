import { LandCoverItem } from './types';

// Helper to construct data. 
// Note: This is a structured subset based on the provided OCR to ensure application functionality 
// focusing on Level 1, 2, and 3 as requested.

export const LAND_COVER_DATA: LandCoverItem[] = [
  {
    code: '1',
    name: 'Territorios Artificializados',
    rgb: '230-000-077', // Representative color
    level: 1,
    children: [
      {
        code: '1.1',
        name: 'Zonas urbanizadas',
        rgb: '204-000-000', // Inherited representative
        level: 2,
        children: [
          { code: '1.1.1', name: 'Tejido urbano continuo', rgb: '204-000-000', level: 3 },
          { code: '1.1.2', name: 'Tejido urbano discontinuo', rgb: '255-000-000', level: 3 },
        ]
      },
      {
        code: '1.2',
        name: 'Zonas industriales o comerciales',
        rgb: '204-077-042',
        level: 2,
        children: [
           { code: '1.2.1', name: 'Zonas industriales o comerciales', rgb: '204-077-042', level: 3 },
           { code: '1.2.2', name: 'Red vial, ferroviaria y terrenos asociados', rgb: '217-101-069', level: 3 },
           { code: '1.2.3', name: 'Zonas portuarias', rgb: '225-132-107', level: 3 },
           { code: '1.2.4', name: 'Aeropuertos', rgb: '231-156-135', level: 3 },
           { code: '1.2.5', name: 'Obras hidráulicas', rgb: '238-185-170', level: 3 },
        ]
      },
      {
        code: '1.3',
        name: 'Zonas de extracción minera y escombreras',
        rgb: '166-000-204',
        level: 2,
        children: [
          { code: '1.3.1', name: 'Zonas de extracción minera', rgb: '166-000-204', level: 3 },
          { code: '1.3.2', name: 'Zonas de disposición de residuos', rgb: '211-023-255', level: 3 },
        ]
      },
      {
        code: '1.4',
        name: 'Zonas verdes artificializadas no agrícolas',
        rgb: '255-128-128',
        level: 2,
        children: [
           { code: '1.4.1', name: 'Zonas verdes urbanas', rgb: '255-128-128', level: 3 },
           { code: '1.4.2', name: 'Instalaciones recreativas', rgb: '255-175-175', level: 3 },
        ]
      }
    ]
  },
  {
    code: '2',
    name: 'Territorios Agrícolas',
    rgb: '255-255-166',
    level: 1,
    children: [
      {
        code: '2.1',
        name: 'Cultivos transitorios',
        rgb: '255-255-166',
        level: 2,
        children: [
          { code: '2.1.1', name: 'Otros cultivos transitorios', rgb: '255-255-166', level: 3 },
          { code: '2.1.2', name: 'Cereales', rgb: '238-232-000', level: 3 },
          { code: '2.1.3', name: 'Oleaginosas y leguminosas', rgb: '255-255-095', level: 3 },
          { code: '2.1.4', name: 'Hortalizas', rgb: '225-210-000', level: 3 },
          { code: '2.1.5', name: 'Tubérculos', rgb: '210-205-000', level: 3 },
        ]
      },
      {
        code: '2.2',
        name: 'Cultivos permanentes',
        rgb: '242-204-166',
        level: 2,
        children: [
          { code: '2.2.1', name: 'Cultivos permanentes herbáceos', rgb: '242-204-166', level: 3 },
          { code: '2.2.2', name: 'Cultivos permanentes arbustivos', rgb: '242-166-077', level: 3 },
          { code: '2.2.3', name: 'Cultivos permanentes arbóreos', rgb: '230-166-000', level: 3 },
          { code: '2.2.4', name: 'Cultivos agroforestales', rgb: '204-144-010', level: 3 },
          { code: '2.2.5', name: 'Cultivos confinados', rgb: '130-074-018', level: 3 },
        ]
      },
      {
        code: '2.3',
        name: 'Pastos',
        rgb: '204-255-204',
        level: 2,
        children: [
           { code: '2.3.1', name: 'Pastos limpios', rgb: '204-255-204', level: 3 },
           { code: '2.3.2', name: 'Pastos arbolados', rgb: '158-255-158', level: 3 },
           { code: '2.3.3', name: 'Pastos enmalezados', rgb: '158-255-200', level: 3 },
        ]
      },
      {
        code: '2.4',
        name: 'Áreas agrícolas heterogéneas',
        rgb: '255-230-166',
        level: 2,
        children: [
           { code: '2.4.1', name: 'Mosaico de cultivos', rgb: '255-230-166', level: 3 },
           { code: '2.4.2', name: 'Mosaico de pastos y cultivos', rgb: '255-216-117', level: 3 },
           { code: '2.4.3', name: 'Mosaico de cultivos, pastos y espacios naturales', rgb: '255-201-065', level: 3 },
           { code: '2.4.4', name: 'Mosaico de pastos con espacios naturales', rgb: '254-181-000', level: 3 },
           { code: '2.4.5', name: 'Mosaico de cultivos y espacios naturales', rgb: '255-176-060', level: 3 },
        ]
      }
    ]
  },
  {
    code: '3',
    name: 'Bosques y Áreas Seminaturales',
    rgb: '071-143-000',
    level: 1,
    children: [
      {
        code: '3.1',
        name: 'Bosques',
        rgb: '071-143-000',
        level: 2,
        children: [
          { code: '3.1.1', name: 'Bosque denso', rgb: '071-143-000', level: 3 },
          { code: '3.1.2', name: 'Bosque abierto', rgb: '085-171-000', level: 3 },
          { code: '3.1.3', name: 'Bosque fragmentado', rgb: '097-194-000', level: 3 },
          { code: '3.1.4', name: 'Bosque de galería y ripario', rgb: '112-224-000', level: 3 },
          { code: '3.1.5', name: 'Plantación forestal', rgb: '128-255-000', level: 3 },
        ]
      },
      {
        code: '3.2',
        name: 'Áreas con vegetación herbácea y/o arbustiva',
        rgb: '204-242-078',
        level: 2,
        children: [
          { code: '3.2.1', name: 'Herbazal', rgb: '204-242-078', level: 3 },
          { code: '3.2.2', name: 'Arbustal', rgb: '172-219-015', level: 3 },
          { code: '3.2.3', name: 'Vegetación secundaria o en transición', rgb: '150-191-013', level: 3 },
        ]
      },
      {
        code: '3.3',
        name: 'Áreas abiertas sin o con poca vegetación',
        rgb: '194-194-194',
        level: 2,
        children: [
          { code: '3.3.1', name: 'Zonas arenosas naturales', rgb: '194-194-194', level: 3 },
          { code: '3.3.2', name: 'Afloramientos rocosos', rgb: '179-179-179', level: 3 },
          { code: '3.3.3', name: 'Tierras desnudas y degradadas', rgb: '158-158-158', level: 3 },
          { code: '3.3.4', name: 'Zonas quemadas', rgb: '137-137-137', level: 3 },
          { code: '3.3.5', name: 'Zonas glaciares y nivales', rgb: '101-101-180', level: 3 },
        ]
      }
    ]
  },
  {
    code: '4',
    name: 'Áreas Húmedas',
    rgb: '166-166-255',
    level: 1,
    children: [
      {
        code: '4.1',
        name: 'Áreas húmedas continentales',
        rgb: '166-166-255',
        level: 2,
        children: [
           { code: '4.1.1', name: 'Zonas Pantanosas', rgb: '166-166-255', level: 3 },
           { code: '4.1.2', name: 'Turberas', rgb: '077-145-255', level: 3 },
           { code: '4.1.3', name: 'Vegetación acuática sobre cuerpos de agua', rgb: '080-080-255', level: 3 },
        ]
      },
      {
        code: '4.2',
        name: 'Áreas húmedas costeras',
        rgb: '204-204-255',
        level: 2,
        children: [
           { code: '4.2.1', name: 'Pantanos costeros', rgb: '204-204-255', level: 3 },
           { code: '4.2.2', name: 'Salitral', rgb: '183-183-255', level: 3 },
           { code: '4.2.3', name: 'Sedimentos expuestos en bajamar', rgb: '166-166-230', level: 3 },
        ]
      }
    ]
  },
  {
    code: '5',
    name: 'Superficies de Agua',
    rgb: '000-204-242',
    level: 1,
    children: [
      {
        code: '5.1',
        name: 'Aguas continentales',
        rgb: '000-204-242',
        level: 2,
        children: [
           { code: '5.1.1', name: 'Ríos (50 m)', rgb: '000-000-248', level: 3 },
           { code: '5.1.2', name: 'Lagunas, lagos y ciénagas naturales', rgb: '000-128-255', level: 3 },
           { code: '5.1.3', name: 'Canales', rgb: '000-178-255', level: 3 },
           { code: '5.1.4', name: 'Cuerpos de agua artificiales', rgb: '000-206-242', level: 3 },
        ]
      },
      {
        code: '5.2',
        name: 'Aguas marítimas',
        rgb: '069-224-245',
        level: 2,
        children: [
           { code: '5.2.1', name: 'Lagunas costeras', rgb: '069-224-245', level: 3 },
           { code: '5.2.2', name: 'Mares y océanos', rgb: '169-241-255', level: 3 },
           { code: '5.2.3', name: 'Estanques para acuicultura marina', rgb: '204-246-255', level: 3 },
        ]
      }
    ]
  }
];

export const parseRGB = (rgbString: string) => {
  const parts = rgbString.split('-');
  if (parts.length === 3) {
    return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
  }
  return '#ccc'; // Default gray
};
