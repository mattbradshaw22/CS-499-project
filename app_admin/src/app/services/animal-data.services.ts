/**
 * Provides HTTP access to the rescue animal REST API.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalDataService {

  private readonly animalsUrl = '/api/animals';

  constructor(private http: HttpClient) { }

  // GET: /api/animals
  // Retrieves all rescue animal records.
  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.animalsUrl);
  }

  // POST: /api/animals
  // Adds a new rescue animal record.
  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.animalsUrl, animal);
  }
}