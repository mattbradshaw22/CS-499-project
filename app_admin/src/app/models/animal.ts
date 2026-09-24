/**
 * Defines the structure of rescue animal data exchanged
 * between the Angular application and the Express REST API.
 */

export interface AcquisitionLocation {
  city: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Animal {
  _id?: string;

  name: string;
  animalType: 'Dog' | 'Monkey';

  breed: string;
  species?: string;

  gender: string;
  age: number;
  weight: number;

  acquisitionDate: string;
  acquisitionLocation: AcquisitionLocation;

  trainingStatus:
    | 'Intake'
    | 'In Training'
    | 'Phase 2'
    | 'Phase 3'
    | 'Phase 4'
    | 'Completed'
    | 'In Service';

  reserved: boolean;

  graduationDate?: string | null;
  description?: string;
  imagePath?: string;

  tailLength?: number;
  height?: number;
  bodyLength?: number;
}