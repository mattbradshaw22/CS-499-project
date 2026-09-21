// Declares Angular client-side routes for the admin application.
import { Routes } from '@angular/router';
import { Intake } from './components/intake/intake';

export const routes: Routes = [
  { 
    path: 'intake', component: Intake }
];
