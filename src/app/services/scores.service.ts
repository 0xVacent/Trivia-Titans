import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  private urlSingleplayerScores = environment.urlSingleplayerScores;

  constructor(private http:HttpClient) { }

  getSingleplayerScores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.urlSingleplayerScores);
  }

  postSingleplayerScore(jugador: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(this.urlSingleplayerScores, jugador);
  }

}
