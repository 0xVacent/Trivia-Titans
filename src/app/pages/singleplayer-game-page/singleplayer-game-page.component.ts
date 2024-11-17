import { Component, inject, OnInit } from '@angular/core';
import { ApiTrivia } from '../../interfaces/api-trivia.interface';
import { PreguntaApi, Respuesta } from '../../interfaces/pregunta.interface';
import { ApiService } from '../../services/api.service';
import { PreguntaComponent } from "../../shared/pregunta/pregunta.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Jugador } from '../../interfaces/jugador.interface';
import { GameService } from '../../gameGuard/service/game.service';

@Component({
  selector: 'app-singleplayer-game-page',
  standalone: true,
  imports: [PreguntaComponent],
  templateUrl: './singleplayer-game-page.component.html',
  styleUrl: './singleplayer-game-page.component.css'
})
export class SingleplayerGamePageComponent implements OnInit {

  jugador: Jugador = {
    nombre: "",
    puntos: 0,  //total de puntos del jugador
    color: "", //el color no importa en el singleplayer
    vidas: 3 //vidas jugador
  }

  loading: boolean = false;

  preguntas: PreguntaApi[] = [];  //arrayDePreguntas al que van las respuestas de la api
  preguntaActualIndex: number = 0;  //indice del array de preguntas

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,  //para poder recibir parametros enviados por url
              private gameService: GameService
  ) { }

  pasarSiguientePregunta(esCorrecta: boolean) {
    if (!esCorrecta) {    //si el flag (esCorrecta) traido de pregunta.component es false(no es correcta), resto una vida
      this.jugador.vidas--;
    } else {              //si no, sumo un punto
      this.jugador.puntos++;
    }

    console.log("VIDAS: " + this.jugador.vidas);
    console.log("PUNTOS: " + this.jugador.puntos);


    if (this.jugador.vidas > 0) {   //si el jugador todavia tiene vidas
      if (this.preguntaActualIndex < this.preguntas.length - 1) {   //si no se llego al ultimo elemento del array de preguntas traidas de la api aumento el indice en 1
        this.preguntaActualIndex++;
      } else {    //si no, reinicio el array de pregutnas y el indice y hago otra solicitud a la api
        this.preguntas = [];
        this.getInfoApi();
        this.preguntaActualIndex = 0;
      }
    } else {  //si el jugador no tiene mas vidas, navego a la pagina de endgame y llevo los datos de puntos y nombre del jugador
      this.gameService.setPartidaTerminada(true); //habilito a que se pueda ir a la pantalla de endgame (esto porque usamos un guard para que si no se jugo ninguna partida, no se pueda ir a la pantalla de engame)
      this.router.navigate(['/endgame', 'singleplayer', this.jugador.nombre.trim(), this.jugador.puntos]);
    }
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {this.jugador.nombre = param["nombre"]});    //recibo el nombre del jugador a traves de la url
    this.getInfoApi();
  }

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
