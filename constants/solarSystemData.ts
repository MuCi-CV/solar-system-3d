import type { CelestialBodyData } from '../types.ts';

const textureBaseUrl = 'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/';
const customTexturesUrl = 'https://cdn.jsdelivr.net/gh/MuCi-CV/deep-space-sound@main/public/images/';
const customMoonTexturesUrl = 'https://cdn.jsdelivr.net/gh/MuCi-CV/deep-space-sound@main/public/images/moons/';

export const SOLAR_SYSTEM_DATA: CelestialBodyData[] = [
  {
    id: 'sun',
    name: 'Sol',
    type: 'star',
    textureUrl: `${customTexturesUrl}sunmap.jpg`,
    size: 8,
    orbitRadius: 0,
    orbitalSpeed: 0,
    rotationSpeed: 0.05,
    isSun: true,
    description: "La estrella en el centro de nuestro sistema solar. Su gravedad mantiene a todo, desde los planetas más grandes hasta los más pequeños escombros, en su órbita.",
    diameter: "1,392,684 km",
    distanceFromSun: "0 km",
    orbitalPeriod: "N/A"
  },
  {
    id: 'mercury',
    name: 'Mercurio',
    type: 'planet',
    textureUrl: `${textureBaseUrl}mercurymap.jpg`,
    size: 0.8,
    orbitRadius: 15,
    orbitalSpeed: 0.8,
    rotationSpeed: 0.1,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "El planeta más pequeño de nuestro sistema solar y el más cercano al Sol. Es un mundo de extremos, con temperaturas abrasadoras durante el día y heladas por la noche.",
    diameter: "4,879 km",
    distanceFromSun: "57.9 millones km",
    orbitalPeriod: "88 días terrestres"
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    textureUrl: `${textureBaseUrl}venusmap.jpg`,
    size: 1.2,
    orbitRadius: 22,
    orbitalSpeed: 0.65,
    rotationSpeed: 0.08,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "A menudo llamado el 'gemelo de la Tierra' por su tamaño similar. Su atmósfera es tóxica y densa, atrapando el calor en un efecto invernadero desbocado.",
    diameter: "12,104 km",
    distanceFromSun: "108.2 millones km",
    orbitalPeriod: "225 días terrestres"
  },
  {
    id: 'earth',
    name: 'Tierra',
    type: 'planet',
    textureUrl: `${textureBaseUrl}earthmap1k.jpg`,
    size: 1.3,
    orbitRadius: 32,
    orbitalSpeed: 0.5,
    rotationSpeed: 0.2,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "Nuestro hogar, el único lugar conocido en el universo donde se ha originado y evolucionado la vida. Es el quinto planeta más grande del sistema solar.",
    diameter: "12,742 km",
    distanceFromSun: "149.6 millones km",
    orbitalPeriod: "365.25 días terrestres",
    satellites: [
      { 
        id: 'moon', 
        name: 'Luna', 
        type: 'moon',
        isTogglable: false,
        textureUrl: `${textureBaseUrl}moonmap1k.jpg`, 
        size: 0.4, 
        orbitRadius: 2.5, 
        orbitalSpeed: 2, 
        rotationSpeed: 0.3,
        initialOrbitAngle: Math.random() * Math.PI * 2,
        description: "El único satélite natural de la Tierra. Su presencia estabiliza el eje de nuestro planeta y modera nuestro clima.",
        diameter: "3,474 km",
        distanceFromSun: "149.6 millones km (orbita la Tierra)",
        orbitalPeriod: "27.3 días terrestres"
      }
    ]
  },
  {
    id: 'mars',
    name: 'Marte',
    type: 'planet',
    textureUrl: `${textureBaseUrl}marsmap1k.jpg`,
    size: 1,
    orbitRadius: 45,
    orbitalSpeed: 0.4,
    rotationSpeed: 0.22,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "Conocido como el 'Planeta Rojo' por su óxido de hierro. Es un mundo desértico y frío con una atmósfera muy delgada, casquetes polares y cañones gigantescos.",
    diameter: "6,779 km",
    distanceFromSun: "227.9 millones km",
    orbitalPeriod: "687 días terrestres",
    satellites: [
        {
            id: 'phobos', name: 'Fobos', type: 'moon', isTogglable: true,
            textureUrl: `${customMoonTexturesUrl}phobosmap.jpg`, size: 0.1, orbitRadius: 1.5, orbitalSpeed: 4, rotationSpeed: 0.5, initialOrbitAngle: Math.random() * Math.PI * 2,
            description: "La más grande de las dos lunas de Marte. Tiene una forma irregular y está cubierta de cráteres.",
            diameter: "22.5 km", distanceFromSun: "227.9 millones km (orbita Marte)", orbitalPeriod: "0.3 días terrestres"
        },
        {
            id: 'deimos', name: 'Deimos', type: 'moon', isTogglable: true,
            textureUrl: `${customMoonTexturesUrl}deimosmap.jpg`, size: 0.08, orbitRadius: 2.2, orbitalSpeed: 3, rotationSpeed: 0.4, initialOrbitAngle: Math.random() * Math.PI * 2,
            description: "La más pequeña y externa de las dos lunas de Marte. Su superficie es más lisa que la de Fobos.",
            diameter: "12.4 km", distanceFromSun: "227.9 millones km (orbita Marte)", orbitalPeriod: "1.3 días terrestres"
        }
    ]
  },
  {
    id: 'ceres', name: 'Ceres', type: 'asteroid', isTogglable: true,
    textureUrl: `${customTexturesUrl}ceresmap.jpg`, size: 0.5, orbitRadius: 55, orbitalSpeed: 0.3, rotationSpeed: 0.3, initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "El objeto más grande del cinturón de asteroides y el único planeta enano en el sistema solar interior. Compuesto de roca y hielo.",
    diameter: "940 km", distanceFromSun: "413.7 millones km", orbitalPeriod: "4.6 años terrestres"
  },
  {
    id: 'vesta', name: 'Vesta', type: 'asteroid', isTogglable: true,
    textureUrl: `${customTexturesUrl}vestamap.jpg`, size: 0.3, orbitRadius: 52, orbitalSpeed: 0.32, rotationSpeed: 0.4, initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "El segundo objeto más masivo del cinturón de asteroides. Tiene una forma irregular y un gran cráter de impacto en su polo sur.",
    diameter: "525 km", distanceFromSun: "353.2 millones km", orbitalPeriod: "3.6 años terrestres"
  },
  {
    id: 'pallas', name: 'Palas', type: 'asteroid', isTogglable: true,
    textureUrl: `${customTexturesUrl}pallasmap.jpg`, size: 0.3, orbitRadius: 58, orbitalSpeed: 0.28, rotationSpeed: 0.35, initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "El tercer asteroide más grande, notable por su órbita altamente inclinada en comparación con los planetas.",
    diameter: "512 km", distanceFromSun: "414.7 millones km", orbitalPeriod: "4.6 años terrestres"
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    type: 'planet',
    textureUrl: `${textureBaseUrl}jupitermap.jpg`,
    size: 4,
    orbitRadius: 75,
    orbitalSpeed: 0.2,
    rotationSpeed: 0.4,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "El planeta más grande de nuestro sistema solar. La Gran Mancha Roja es una tormenta gigante más grande que la Tierra.",
    diameter: "139,820 km",
    distanceFromSun: "778.5 millones km",
    orbitalPeriod: "11.9 años terrestres",
    satellites: [
        {
            id: 'io', name: 'Ío', type: 'moon', isTogglable: true,
            textureUrl: `${customMoonTexturesUrl}iomap.jpg`, size: 0.5, orbitRadius: 5, orbitalSpeed: 2.5, rotationSpeed: 0.6, initialOrbitAngle: Math.random() * Math.PI * 2,
            description: "El cuerpo con mayor actividad volcánica del sistema solar, con cientos de volcanes y flujos de lava.",
            diameter: "3,642 km", distanceFromSun: "778.5 millones km (orbita Júpiter)", orbitalPeriod: "1.8 días terrestres"
        },
        {
            id: 'europa', name: 'Europa', type: 'moon', isTogglable: true,
            textureUrl: `${customMoonTexturesUrl}europamap.jpg`, size: 0.45, orbitRadius: 6, orbitalSpeed: 2.2, rotationSpeed: 0.5, initialOrbitAngle: Math.random() * Math.PI * 2,
            description: "Tiene una superficie helada y lisa, y se cree que esconde un océano de agua líquida, haciéndolo un candidato para la vida extraterrestre.",
            diameter: "3,122 km", distanceFromSun: "778.5 millones km (orbita Júpiter)", orbitalPeriod: "3.5 días terrestres"
        },
        {
            id: 'ganymede', name: 'Ganímedes', type: 'moon', isTogglable: true,
            textureUrl: `${customMoonTexturesUrl}ganymedemap.jpg`, size: 0.7, orbitRadius: 7.5, orbitalSpeed: 1.8, rotationSpeed: 0.4, initialOrbitAngle: Math.random() * Math.PI * 2,
            description: "La luna más grande del sistema solar, incluso más grande que el planeta Mercurio. Es la única luna con su propio campo magnético.",
            diameter: "5,268 km", distanceFromSun: "778.5 millones km (orbita Júpiter)", orbitalPeriod: "7.2 días terrestres"
        },
        {
            id: 'callisto', name: 'Calisto', type: 'moon', isTogglable: true,
            textureUrl: `${customMoonTexturesUrl}callistomap.jpg`, size: 0.65, orbitRadius: 9, orbitalSpeed: 1.5, rotationSpeed: 0.3, initialOrbitAngle: Math.random() * Math.PI * 2,
            description: "Tiene una de las superficies más antiguas y con más cráteres del sistema solar. Puede albergar un océano subterráneo.",
            diameter: "4,821 km", distanceFromSun: "778.5 millones km (orbita Júpiter)", orbitalPeriod: "16.7 días terrestres"
        }
    ]
  },
  {
    id: 'saturn',
    name: 'Saturno',
    type: 'planet',
    textureUrl: `${textureBaseUrl}saturnmap.jpg`,
    size: 3.5,
    orbitRadius: 100,
    orbitalSpeed: 0.15,
    rotationSpeed: 0.35,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "Famoso por su espectacular sistema de anillos, compuesto por miles de millones de partículas de hielo y roca.",
    diameter: "116,460 km",
    distanceFromSun: "1.4 mil millones km",
    orbitalPeriod: "29.5 años terrestres",
    ring: { innerRadius: 4.5, outerRadius: 7 },
    satellites: [
        {
            id: 'titan', name: 'Titán', type: 'moon', isTogglable: true,
            textureUrl: `${customMoonTexturesUrl}titanmap.jpg`, size: 0.7, orbitRadius: 9, orbitalSpeed: 1.6, rotationSpeed: 0.4, initialOrbitAngle: Math.random() * Math.PI * 2,
            description: "La luna más grande de Saturno y la única luna con una atmósfera densa. Tiene lagos y ríos de metano y etano líquidos.",
            diameter: "5,149 km", distanceFromSun: "1.4 mil millones km (orbita Saturno)", orbitalPeriod: "16 días terrestres"
        }
    ]
  },
  {
    id: 'uranus',
    name: 'Urano',
    type: 'planet',
    textureUrl: `${textureBaseUrl}uranusmap.jpg`,
    size: 2.5,
    orbitRadius: 125,
    orbitalSpeed: 0.1,
    rotationSpeed: 0.3,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "Un gigante de hielo con una característica única: gira de lado, con el eje de su rotación casi apuntando hacia el Sol.",
    diameter: "50,724 km",
    distanceFromSun: "2.9 mil millones km",
    orbitalPeriod: "84 años terrestres"
  },
  {
    id: 'neptune',
    name: 'Neptuno',
    type: 'planet',
    textureUrl: `${textureBaseUrl}neptunemap.jpg`,
    size: 2.4,
    orbitRadius: 150,
    orbitalSpeed: 0.08,
    rotationSpeed: 0.28,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    description: "El mundo más distante y ventoso. Es oscuro, frío y azotado por vientos supersónicos. Fue el primer planeta localizado a través de cálculos matemáticos.",
    diameter: "49,244 km",
    distanceFromSun: "4.5 mil millones km",
    orbitalPeriod: "164.8 años terrestres",
    satellites: [
        {
            id: 'triton', name: 'Tritón', type: 'moon', isTogglable: true,
            textureUrl: `${customMoonTexturesUrl}tritonmap.jpg`, size: 0.4, orbitRadius: 4, orbitalSpeed: 1.8, rotationSpeed: 0.4, initialOrbitAngle: Math.random() * Math.PI * 2,
            description: "La luna más grande de Neptuno y el único satélite grande con una órbita retrógrada (orbita en dirección opuesta a la rotación de Neptuno).",
            diameter: "2,700 km", distanceFromSun: "4.5 mil millones km (orbita Neptuno)", orbitalPeriod: "5.9 días terrestres"
        }
    ]
  },
  {
    id: 'pluto',
    name: 'Plutón',
    type: 'dwarf-planet',
    textureUrl: `${customTexturesUrl}plutomap1k.jpg`,
    size: 0.5,
    orbitRadius: 170,
    orbitalSpeed: 0.07,
    rotationSpeed: 0.15,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    orbitInclination: 17.16,
    orbitEccentricity: 0.248,
    description: "Un planeta enano en el cinturón de Kuiper. Tiene una órbita elíptica y altamente inclinada, y un corazón gigante de hielo de nitrógeno en su superficie.",
    diameter: "2,376 km",
    distanceFromSun: "5.9 mil millones km",
    orbitalPeriod: "248 años terrestres"
  },
  {
    id: 'eris',
    name: 'Eris',
    type: 'dwarf-planet',
    textureUrl: `${customTexturesUrl}erismap.jpg`,
    size: 0.48,
    orbitRadius: 250,
    orbitalSpeed: 0.05,
    rotationSpeed: 0.1,
    initialOrbitAngle: Math.random() * Math.PI * 2,
    orbitInclination: 44,
    orbitEccentricity: 0.44,
    isTogglable: true,
    description: "Eris es uno de los planetas enanos más grandes conocidos en nuestro sistema solar. Es notable por su órbita altamente inclinada y excéntrica, que lo lleva mucho más allá del plano de los planetas principales.",
    diameter: "2,326 km",
    distanceFromSun: "10.1 mil millones km (promedio)",
    orbitalPeriod: "558 años terrestres"
  }
];