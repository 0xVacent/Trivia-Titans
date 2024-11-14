import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Jugador } from '../../interfaces/jugador.interface';
import { CommonModule } from '@angular/common';
import { GameService } from '../../gameGuard/service/game.service';

@Component({
  selector: 'app-multiplayer-board',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './multiplayer-board.component.html',
  styleUrl: './multiplayer-board.component.css'
})
export class MultiplayerBoardComponent {

  @Input()
  jugadores: Jugador[] = [];

  @Input()
  jugadorEnTurno = 0; //indice del array de jugadores del jugador que tiene el turno

  @Input()
  partidaFinalizada = false;

  @Output()
  empezarTurnoEvent: EventEmitter<boolean> = new EventEmitter();


  calcularDesplazamientoPorPuntos(puntos: number) {
    const desplazamiento = puntos * 4.5;  //30p puntos equivale al 100% de la pista
    return `${desplazamiento}rem`;  //devuelve el valor en rem para aplicarle al margin left de la imagen de cada chaboncito
  }

  empezarTurno() {
    this.empezarTurnoEvent.emit(true);
  }

  private router = inject(Router);
  private gameService = inject(GameService);
  finalizarPartida() {  //en esta funcion se pasa a end-game el jugador con mas puntos por parametro y con lo de state se pasa el array de jugadores para que se pueda iniciar otra partida si se quiere
    const jugador = this.jugadorConMasPuntos();
    this.gameService.setPartidaTerminada(true); //habilito a que se pueda ir a la pantalla de endgame (esto porque usamos un guard para que si no se jugo ninguna partida, no se pueda ir a la pantalla de engame)
    this.router.navigate(['/endgame', 'multiplayer', jugador.nombre, jugador.puntos], { state: { jugadores: this.jugadores } });  
  }

  //esta funcion devuelve el jugador con mas puntos, se usa al finalizar todos los turnos para dar el ganaador de la partida
  jugadorConMasPuntos() {
    return this.jugadores.reduce((jugadorConMasPuntos, jugadorActual) => {
      if (jugadorActual.puntos > jugadorConMasPuntos.puntos) {
        jugadorConMasPuntos = jugadorActual;  //si el jugador actual tiene mas puntos q el jugador con mas puntos, actualizamos el jugador con mas puntos al actual
      }
      return jugadorConMasPuntos;
    }, this.jugadores[0]);  //el jugador con mas puntos inicialmente va a ser el primero del array
  }

}
