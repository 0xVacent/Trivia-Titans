import { Jugador } from './../../interfaces/jugador.interface';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ScoresService } from '../../services/scores.service';
import { ToastrService } from 'ngx-toastr';


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
  jugadoresOrdenados: Jugador[] = [] //array auxiliar para ordenar los jugadores

  modo: string = "";

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(param => { this.modo = param['modo'] });  //agarro el valor del parametro "nombre" de la url y se lo asigno a this.nombreJugador
    this.actRoute.params.subscribe(param => { this.jugador.nombre = param['nombre'] });  //agarro el valor del parametro "nombre" de la url y se lo asigno a this.nombreJugador
    this.actRoute.params.subscribe(param => { this.jugador.puntos = +param['puntos'] });  //agarro el valor del parametro "puntos" de la url y se lo asigno a this.puntos. El + lo connvierte a numero

    if (this.modo === "multiplayer") {
      this.jugadores = history.state.jugadores || []; //agarro los jugadores si vengo del modo multiplayer
      this.jugadoresOrdenados = this.jugadores.slice().sort((a, b) => b.puntos - a.puntos); //guardo los jugadores ordenados en un array aparte para no perder el orden original de los jugadores en la partida por si se quiere iniciar otra
    }
    
    this.resultadoGuardado = false;
  }

  private router = inject(Router);
  tryAgain() {
    if (this.modo === 'multiplayer') {
      this.router.navigate(["/multiplayer-game"], { state: { jugadores: this.jugadores } });  //redirijo a multiplayer-game y paso el array de los jugadores para empezar otra partida con los mismos
    } else {
      this.router.navigate(['/singleplayer-game', this.jugador.nombre]);  //redirijo a singleplayer-game con el nombre para empezar otra partida
    }
  }

  //json-server
  private scoresService = inject(ScoresService);

  //hago un post del resultado del jugador en el json-server
  postScore() {
    this.scoresService.postSingleplayerScore(this.jugador).subscribe(
      {
        next: (score) => {
          console.log(`${score.nombre}'s score was saved`);
        },
        error: (err: Error) => {
          console.log(err.message);
        }
      }
    );
  }

  resultadoGuardado: boolean = false;
  private toast = inject(ToastrService); //para usar las alertas de toastr
  //funcion relacionada al boton de save score
  guardarResultado() {
    if (!this.resultadoGuardado) { //si el resultado no fue guardado todavia
      this.postScore();
      this.resultadoGuardado = true;
      this.toast.success(`${this.jugador.nombre}'s score was saved`, "", { timeOut: 1500 }); //alerta cuando se guarda
    } else {
      this.toast.info("Score was already saved", "", { timeOut: 1500 }); //alerta cuando ya se habia guardado antteriormente
    }
  }

  compartirResultado() {
    if (this.modo === "singleplayer") {
        const mensaje = `I just finished playing Trivia Titans and got a score of ${this.jugador.puntos} points! Can you beat it? \nhttps://trivia-titans-three.vercel.app/`;
        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;
        window.open(urlWhatsApp, '_blank');
    } else {
      let mensaje = 'Game results:\n';
      this.jugadoresOrdenados.forEach((jugador, index) => {
        mensaje += `${index + 1}- ${jugador.nombre}: ${jugador.puntos} points\n`;
      });
      mensaje += `Do you want to play? https://trivia-titans-three.vercel.app/`;
      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;
      window.open(urlWhatsApp, '_blank');
    }
  }

}
