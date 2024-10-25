import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  urlSingleplayerScores: string = "http://localhost:3000/singleplayer-scores";

  constructor(private http:HttpClient) { }

  getSingleplayerScores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.urlSingleplayerScores);
  }

  postSingleplayerScore(jugador: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(this.urlSingleplayerScores, jugador);
  }

}
