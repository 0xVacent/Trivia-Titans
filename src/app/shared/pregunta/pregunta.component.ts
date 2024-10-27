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
    categoria: "Television",

    respuestas: [
      { texto: "Ted, Robin, Barney, Lily, Marshall", isCorrect: true },
      { texto: "Joey, Chandler, Rachel, Monica", isCorrect: false },
      { texto: "Sheldon, Leonard, Penny, Howard", isCorrect: false },
      { texto: "Ross, Rachel, Phoebe, Monica", isCorrect: false }
    ]

  }

  @Input()
  pregunta: PreguntaApi = {
    categoria:'',
    tipoDePregunta: '',
    pregunta: '',
    respuestas: []
  };


  vidasNum: number | undefined;
  vidasArray : number[] = [];

  @Input()
  set vidas(value: number) {
    this.vidasNum = value;
    this.vidasArray = Array(this.vidasNum).fill(0);
  };

  @Output()
  preguntaRespondida = new EventEmitter<boolean>();

  isRespondida: boolean = false;   //booleano para saber si ya se eligio una respuesta
  esCorrecta: boolean | undefined;

  //contador de tiempo
  contador: number = 20;
  intervalId: any;

  ngOnInit() {
    this.iniciarContador();
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
      } else {  //si se termina el tiempo se da por hecho que la respuesta se respondio incorrectamente
        this.esCorrecta = false;
        this.isRespondida = true;
        clearInterval(this.intervalId);
      }
    }, 1000)
  }

  seleccionarRespuesta(respuesta: Respuesta) {   //funcion que cambia el estado de respuestaSeleccionada a true para establecer que ya se eligio una respuesta
    if (!this.isRespondida) { //si no se eligio una respuesta, dejo elegir una, si no, no
      this.isRespondida = true;
      this.esCorrecta = respuesta.isCorrect;
      clearInterval(this.intervalId);  // detenemos el intervalo cuando el componente se destruye
    } else {
      alert("ya elegiste una respuesta tramposo");
    }
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


}
