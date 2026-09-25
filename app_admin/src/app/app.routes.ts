// Declares Angular client-side routes for the admin application.
import { Routes } from '@angular/router';
import { Intake } from './components/intake/intake';
import { FindAnimal } from './components/find-animal/find-animal';

export const routes: Routes = [
  { 
    path: 'animal-intake', component: Intake },
  { 
    path: 'find-an-animal', component: FindAnimal }
];
