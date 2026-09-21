// Defines the root Angular application component and imports the intake experience.
import { Component } from '@angular/core';
import { Intake } from './components/intake/intake';

@Component({
  selector: '#angular-intake-root',
  imports: [Intake],
  template: '<app-intake></app-intake>',
  styleUrl: './app.css'
})
export class App {}
