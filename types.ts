export interface Ring {
  innerRadius: number;
  outerRadius: number;
}

export interface CelestialBodyData {
  id: string;
  name: string;
  textureUrl: string;
  size: number;
  orbitRadius: number;
  orbitalSpeed: number;
  rotationSpeed: number;
  isSun?: boolean;
  ring?: Ring;
  satellites?: CelestialBodyData[];

  // Educational Info
  description: string;
  diameter: string;
  distanceFromSun: string;
  orbitalPeriod: string;
  initialOrbitAngle?: number;
  
  // New properties for advanced features
  type: 'star' | 'planet' | 'dwarf-planet' | 'moon' | 'asteroid';
  orbitInclination?: number; // in degrees
  orbitEccentricity?: number; // 0 for circle, <1 for ellipse
  isTogglable?: boolean;
}
