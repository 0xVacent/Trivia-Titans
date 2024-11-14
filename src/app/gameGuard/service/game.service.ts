import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private partidaTerminada: boolean = false;

  setPartidaTerminada(finalizada: boolean) {
    this.partidaTerminada = finalizada; //pone el estado de la partida como finalizada
  }

  estaTerminada(): boolean {
    return this.partidaTerminada;
  }
}
