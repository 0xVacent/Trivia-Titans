import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Jugador } from '../../interfaces/jugador.interface';
import { ScoresService } from '../../services/scores.service';


@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css'
})
export class EndGameComponent implements OnInit {

  jugador: Jugador = {
    nombre: "",
    puntos: 0,
    color: "",
    vidas: 0
  }

  jugadores: Jugador[] = [];  //array de jugadores para cuando se viene al end-game desde el modo multiplayer

  modo: string = "";

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(param => { this.modo = param['modo'] });  //agarro el valor del parametro "nombre" de la url y se lo asigno a this.nombreJugador
    this.actRoute.params.subscribe(param => { this.jugador.nombre = param['nombre'] });  //agarro el valor del parametro "nombre" de la url y se lo asigno a this.nombreJugador
    this.actRoute.params.subscribe(param => { this.jugador.puntos = +param['puntos'] });  //agarro el valor del parametro "puntos" de la url y se lo asigno a this.puntos. El + lo connvierte a numero
    
    if (this.modo === "multiplayer") {
      this.jugadores = history.state.jugadores || []; //agarro los jugadores si vengo del modo multiplayer
    }

    this.resultadoGuardado = false;
  }

  router = inject(Router);
  tryAgain() {
    if (this.modo === 'multiplayer') {
      this.router.navigate(["/multiplayer-game"], { state: { jugadores: this.jugadores } });  //redirijo a multiplayer-game y paso el array de los jugadores para empezar otra partida con los mismos
    } else {
      this.router.navigate(['/singleplayer-game', this.jugador.nombre]);  //redirijo a singleplayer-game con el nombre para empezar otra partida
    }
  }


  //json-server
  scoresService = inject(ScoresService);

  //hago un post del resultado del jugador en el json-server
  postScore() {
    this.scoresService.postSingleplayerScore(this.jugador).subscribe(
      {
        next: (score) => {
          alert(`${score.nombre}'s score was saved`);
        },
        error: (err: Error) => {
          console.log(err.message);
        }
      }
    );
  }

  resultadoGuardado: boolean = false;

  //funcion relacionada al boton de save score
  guardarResultado() {
    if (!this.resultadoGuardado) { //si el resultado no fue guardado todavia
      this.postScore();
      this.resultadoGuardado = true;
    } else {
      alert("Score was already saved");
    }
  }


}
