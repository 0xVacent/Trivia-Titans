import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreguntaApi } from '../../interface/pregunta-api';
import { CommonModule } from '@angular/common';

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

  respuestaSeleccionada: boolean = false;   //booleano para saber si ya se eligio una respuesta

  seleccionarRespuesta() {   //funcion que cambia el estado de respuestaSeleccionada a true para establecer que ya se eligio una respuesta
    this.respuestaSeleccionada = true;
    clearInterval(this.intervalId);  // detenemos el intervalo cuando el componente se destruye
  }



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
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000)
  }

}
