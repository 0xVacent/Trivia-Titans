import { Component, inject, OnInit } from '@angular/core';
import { ApiTrivia } from '../../interfaces/api-trivia.interface';
import { PreguntaApi, Respuesta } from '../../interfaces/pregunta.interface';
import { ApiService } from '../../services/api.service';
import { PreguntaComponent } from "../../shared/pregunta/pregunta.component";

@Component({
  selector: 'app-singleplayer-game-page',
  standalone: true,
  imports: [PreguntaComponent],
  templateUrl: './singleplayer-game-page.component.html',
  styleUrl: './singleplayer-game-page.component.css'
})
export class SingleplayerGamePageComponent implements OnInit {

  vidas: number = 3;

  preguntas: PreguntaApi[] = [];

  preguntaActualIndex: number = 0;

  pasarSiguientePregunta(esCorrecta: boolean) {
    if (!esCorrecta) {
      this.vidas--;
    }

    if (this.vidas > 0) {
      if (this.preguntaActualIndex < this.preguntas.length - 1) {
        this.preguntaActualIndex++;
      } else {
        this.preguntaActualIndex = 0; //reinicio el contador
        this.getInfoApi(); //hace otra soli a la a api
      }
    } else {
      alert("fin del juego")
    }


  }


  ngOnInit() {
    this.getInfoApi();

  }

  apiService: ApiService = inject(ApiService);

  getInfoApi() {
    this.apiService.getInfoApi().subscribe(
      {
        next: (info) => {
          this.preguntas = this.mapearPreguntas(info.results);
          console.log(this.preguntas);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  mapearPreguntas(trivia: ApiTrivia[]): PreguntaApi[] {
    return trivia.map((pregunta) => ({
      tipoDePregunta: pregunta.type,
      pregunta: pregunta.question,
      respuestas: this.combinarRespuestas(pregunta.correct_answer, pregunta.incorrect_answers)
    }));
  }

  combinarRespuestas(correctAnswer: string, incorrectAnswers: string[]): Respuesta[] {
    const respuestas = [...incorrectAnswers, correctAnswer];

    let respuestasMapeadas = respuestas.map((resp) => ({
      texto: resp,
      isCorrect: resp === correctAnswer
    }));

   return respuestasMapeadas = this.mezclarRespuestas(respuestasMapeadas);

  }
   mezclarRespuestas(respuestas: Respuesta[]): Respuesta[] {
    for (let i = respuestas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 y i
      [respuestas[i], respuestas[j]] = [respuestas[j], respuestas[i]]; // Intercambiar los elementos
    }
    return respuestas;
  }
}
