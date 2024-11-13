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

  getInfoApi(): Observable<ApiTriviaResponse> {
    return this.http.get<ApiTriviaResponse>(this.urlBase);
  }

}
