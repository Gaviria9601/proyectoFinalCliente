import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Places } from '../_interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private readonly API_URL = 'http://localhost:3000/places';
  addPlaces: Places;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get(this.API_URL);
  }

  crear(places:Places){
    return this.http.post(this.API_URL,places);
  }

  eliminar(_id:string) {
    return this.http.delete(this.API_URL + `/${_id}`);
  }

  actualizar(_id:string,places:Places){
    return this.http.put(this.API_URL + `/${_id}`,places);
  }

}

