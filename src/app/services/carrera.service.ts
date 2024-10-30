import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrera } from '../Models/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrl = 'http://localhost:8080/api/carreras';

  constructor(private http: HttpClient) {}

  // CRUD para Carrera
  getCarrera():Observable<Carrera[]>{
    return this.http.get<Carrera[]>(this.apiUrl);
  }

  getCarreraById(id:number):Observable<Carrera>{
    return this.http.get<Carrera>(`${this.apiUrl}/${id}`);
  }

  createCarrera(categoria: Carrera): Observable<Carrera> {    
    return this.http.post<Carrera>(this.apiUrl, categoria);
  }

  deleteCarrera(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateCarrera(categoria:Carrera, id:number): Observable<Carrera>{
    return this.http.put<Carrera>(`${this.apiUrl}/${id}`, categoria);
  }
}
