import { Component, OnInit, OnDestroy, inject, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreguntaApi, Respuesta } from '../../interfaces/pregunta.interface';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ApiTrivia } from '../../interfaces/api-trivia.interface';

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css'
})

export class PreguntaComponent implements OnInit, OnDestroy {

  triviaResponse: PreguntaApi = {
    tipoDePregunta: "multiple",
    pregunta: "What are the names of the main characters in How I Met Your Mother?",

    respuestas: [
      { texto: "Ted, Robin, Barney, Lily, Marshall", isCorrect: true },
      { texto: "Joey, Chandler, Rachel, Monica", isCorrect: false },
      { texto: "Sheldon, Leonard, Penny, Howard", isCorrect: false },
      { texto: "Ross, Rachel, Phoebe, Monica", isCorrect: false }
    ]

  }

  @Input()
  pregunta: PreguntaApi = {
    tipoDePregunta: '',
    pregunta: '',
    respuestas: []
  };


  @Output()
  preguntaRespondida = new EventEmitter<boolean>();

  
  //trivia: ApiTrivia[] = [];

  isRespondida: boolean = false;   //booleano para saber si ya se eligio una respuesta
  esCorrecta: boolean | undefined;

  //contador de tiempo
  contador: number = 20;
  intervalId: any;

  ngOnInit() {
    this.iniciarContador();
    //this.getInfoApi();

  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);  // Detenemos el intervalo cuando el componente se destruye
    }
  }

  iniciarContador() {
    this.intervalId = setInterval(() => {   //establece un intervalo que disminuyer el contador en 1 cada segundo
      if (this.contador > 0) {
        this.contador--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000)
  }

  seleccionarRespuesta(respuesta:Respuesta) {   //funcion que cambia el estado de respuestaSeleccionada a true para establecer que ya se eligio una respuesta
    this.isRespondida = true;
    this.esCorrecta = respuesta.isCorrect;

    clearInterval(this.intervalId);  // detenemos el intervalo cuando el componente se destruye
  }

  siguientePregunta() {
    this.preguntaRespondida.emit(this.esCorrecta);  // Emitimos el evento al componente padre
    this.resetearEstado();           // Reseteamos el estado del componente para la siguiente pregunta
  }

  resetearEstado() {
    this.isRespondida = false;
    this.contador = 20;  // Restablecemos el contador
    this.iniciarContador();  // Reiniciamos el contador
  }








    // Función para decodificar entidades HTML
    decodeHtml(html: string): string {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }




  /*
  
    
  
    apiService: ApiService = inject(ApiService);
  
    getInfoApi() {
      this.apiService.getInfoApi().subscribe(
        {
          next: (info) => {
            this.trivia = info.results;
  
            this.preguntas = this.mapearPreguntas(this.trivia);
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
  
      return respuestas.map((resp) => ({
        texto: resp,
        isCorrect: resp === correctAnswer
      }));
    }*/

}
