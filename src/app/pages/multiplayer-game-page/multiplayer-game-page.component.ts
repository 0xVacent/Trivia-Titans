import { Component, inject, OnInit } from '@angular/core';
import { MultiplayerBoardComponent } from "../../features/multiplayer-board/multiplayer-board.component";
import { Jugador } from '../../interfaces/jugador.interface';
import { ApiService } from '../../services/api.service';
import { PreguntaApi, Respuesta } from '../../interfaces/pregunta.interface';
import { ApiTrivia } from '../../interfaces/api-trivia.interface';
import { PreguntaComponent } from "../../shared/pregunta/pregunta.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multiplayer-game-page',
  standalone: true,
  imports: [MultiplayerBoardComponent, PreguntaComponent],
  templateUrl: './multiplayer-game-page.component.html',
  styleUrl: './multiplayer-game-page.component.css'
})
export class MultiplayerGamePageComponent implements OnInit {

  jugadores: Jugador[] = [];

  vidasJugadores: number = 3; //3 por defecto
  tiempoElegido: number = 30; //30 por defecto

  turnoActualIndex = 0; //indice del array de jugadores del jugador que tiene el turno
  enTurno: boolean = false; //booleano para ocultar el tablero si se esta en un turno

  finPartida = false;

  preguntas: PreguntaApi[] = [];  //arrayDePreguntas al que van las respuestas de la api
  preguntaActualIndex: number = 0;  //indice del array de preguntas

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    //recibo las vidas y el tiempo para la configuracion de la partida a traves de la url
    this.activatedRoute.params.subscribe(param => {
      this.vidasJugadores= +param["vidas"];
      this.tiempoElegido = +param["tiempo"];
    });

    //traigo los jugadores pasados por url en el componente menu-multiplayer en la funcion iniciarJuego()
    this.jugadores = (history.state.jugadores || []).map((jugador: Jugador) => ({
      ...jugador,
      puntos: 0,  // inicializa puntos en 0
      vidas: this.vidasJugadores    // inicializa vidas con la cantidad traida por la url
    }));

    console.log(this.jugadores);
    this.getInfoApi();  //traigo preguntas de la api
  }

  empezarTurno(turnoBoolean: boolean) {
    this.enTurno = turnoBoolean;
  }

  finalizarTurno() {
    this.enTurno = false;
    this.turnoActualIndex++;
    if (this.turnoActualIndex >= this.jugadores.length){
      this.turnoActualIndex = 0;
    }
  }

  pasarSiguientePregunta(esCorrecta: boolean) {
    if (!esCorrecta) {    //si el flag (esCorrecta) traido de pregunta.component es false(no es correcta), resto una vida
      this.jugadores[this.turnoActualIndex].vidas--;
      this.finalizarTurno();    //finalizo el turno del jugador actual

    } else {              //si no, sumo un punto
      this.jugadores[this.turnoActualIndex].puntos++;
    }

    if (this.jugadores.some(jugador => jugador.puntos >= 30)) { //revisa si algun jugador llego a los 30 puntos
      this.finPartida = true; //termina la partida si algún jugador llega a 30 puntos
      this.finalizarTurno();    //finalizo el turno del jugador actual
    } else if (this.jugadores[this.turnoActualIndex].vidas > 0) {   //si el jugador todavia tiene vidas
      if (this.preguntaActualIndex < this.preguntas.length - 1) {   //si no se llego al ultimo elemento del array de preguntas traidas de la api aumento el indice en 1
        this.preguntaActualIndex++;
      } else {    //si no, reinicio el array de pregutnas y el indice y hago otra solicitud a la api
        this.preguntas = [];
        this.getInfoApi();
        this.preguntaActualIndex = 0;
      }
    } else {  //si se llega a este punto es porque el primer jugador se quedo sin vidas, por lo que al ser en ronda, el resto de jugadores tambeien
      this.finPartida = true; //se finaliza la partida y se comunica al tablero con el Input()
    }

    console.log("");
    console.log("JUGADOR: " + this.jugadores[this.turnoActualIndex].nombre);
    console.log("VIDAS: " + this.jugadores[this.turnoActualIndex].vidas);
    console.log("PUNTOS: " + this.jugadores[this.turnoActualIndex].puntos);
    console.log("");
  }



  //////////////api//////////////
  loading: boolean = false;

  private apiService: ApiService = inject(ApiService);

  getInfoApi() {
    this.loading = true;  //inicio el estado de carga
  
    this.apiService.getInfoApi().subscribe({
      next: (info) => {
        this.preguntas = this.mapearPreguntas(info.results);  //mapeo el array traido de la api y se lo asigno al array de preguntas
        this.loading = false;  //finalizo el estado de carga si es que se recibe la respuesta
      },
      error: (err) => {
        console.log(err);
        setTimeout(() => {  //si no se obtuvo una respuesta pq se hizo una solicitud con menos de 5 segs de diferencia de la anterior, se esperan 5 segs y se reintenta.
          console.log('Reintentando después de 5 segundos...');
          this.getInfoApi();
        }, 5000);
      }
    });
  }

  //funcion que a partir de un array con la interfaz ApiTrivia mapea a un array con la interfaz PreguntaApi
  mapearPreguntas(trivia: ApiTrivia[]): PreguntaApi[] {
    return trivia.map((pregunta) => ({
      tipoDePregunta: pregunta.type,
      pregunta: pregunta.question,
      categoria: pregunta.category,
      respuestas: this.combinarRespuestas(pregunta.correct_answer, pregunta.incorrect_answers)  	//combino las respuestas en un solo array
    }));
  }

  //funcion que junta la respuesta correcta y el array de respuestas incorrectas en un solo array de la interfaz Respuesta.
  combinarRespuestas(correctAnswer: string, incorrectAnswers: string[]): Respuesta[] {
    const respuestas = [...incorrectAnswers, correctAnswer];

    let respuestasMapeadas = respuestas.map((resp) => ({
      texto: resp,
      isCorrect: resp === correctAnswer //asigno un booleano true si la respuesta es correcta, si no, false
    }));

    return respuestasMapeadas = this.mezclarRespuestas(respuestasMapeadas);

  }

  //funcion que mezcla el array de respuestas de manera aleatoria
  mezclarRespuestas(respuestas: Respuesta[]): Respuesta[] {
    for (let i = respuestas.length - 1; i > 0; i--) { //arranca desde el ultimo indice del array
      const j = Math.floor(Math.random() * (i + 1)); // calcula un indice aleatorio entre 0 y i
      [respuestas[i], respuestas[j]] = [respuestas[j], respuestas[i]]; // intercambiar los elementos del indice actual y el aleatorio
    }
    return respuestas;
  }

}
