import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTriviaResponse } from '../interfaces/api-trivia.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlBase = environment.urlBase;
  constructor(private http:HttpClient) { }

  getInfoApi(categoria?: string, dificultad?: string): Observable<ApiTriviaResponse> {

    let url = this.urlBase;

    if (categoria) {
      url = url + `&category=${categoria}`;  //le agregamos categoria a la url si la tiene (para el singleplayer)
    }

    if (dificultad) {
      url = url + `&difficulty=${dificultad}`; //le agregamos dificultad a la url si la tiene (para el singleplayer)
    }

    return this.http.get<ApiTriviaResponse>(url);
  }

}
