import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTriviaResponse } from '../interfaces/api-trivia.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //urlBase: string = "https://opentdb.com/api.php?amount=10";
  urlBase: string = "https://opentdb.com/api.php?amount=10&difficulty=easy";
  //urlBase: string= "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy";
  constructor(private http:HttpClient) { }

  getInfoApi(): Observable<ApiTriviaResponse> {
    return this.http.get<ApiTriviaResponse>(this.urlBase);
  }

}
