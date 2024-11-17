import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Jugador } from '../../interfaces/jugador.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-multiplayer',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './menu-multiplayer.component.html',
  styleUrl: './menu-multiplayer.component.css'
})
export class MenuMultiplayerComponent {
  coloresUsados:Array<string> = [];
  arrayJugadores: Array<Jugador> = [];

  tiempoElegido: number = 30;
  vidasElegidas: number = 3;

 agregarJugador(){
    if (this.arrayJugadores.length < 4) {
      this.crearJugador();    //si hay menos de 4 jugadores agrego un jugador al array
    }
  }
  
  crearJugador() {
    const jugador: Jugador = {
      nombre: "",
      puntos: 0,
      color: "",
      vidas: 3
    }
    this.arrayJugadores.push(jugador);
  }

  eliminarJugador(index: number) {
    const colorJugador = this.arrayJugadores[index].color; //guardo el color del jugador que se va a borrar (si tiene)
    if (colorJugador) {
      this.coloresUsados = this.coloresUsados.filter(color => color !== colorJugador) //hago un filter en el array de colores con todos los que no sean el color del jugador 
    }
    this.arrayJugadores.splice(index, 1); //borro el jugador del array de jugadores
  }

  seleccionarColor(index: number, colorSeleccionado: string) {
    const jugador = this.arrayJugadores[index];   //agarro el jugador del array a partir del indice pasado en el for del html
    if(jugador.color === colorSeleccionado) {   //si el color seleccionado es el que ya tenia seleccionado lo des-selecciona
      this.coloresUsados = this.coloresUsados.filter(c => c !== jugador.color)  //si el jugador tenia un color seleccionado anteriormente, saco ese color del array de colores usados
      jugador.color = "";
    } else if (!this.coloresUsados.includes(colorSeleccionado)) {
      if (jugador.color) {
        this.coloresUsados = this.coloresUsados.filter(c => c !== jugador.color)  //si el jugador tenia un color seleccionado anteriormente, saco ese color del array de colores usados
      }
      jugador.color = colorSeleccionado;  //asigno el color seleccionado al jugador obtenido a partir del indice
      this.coloresUsados.push(colorSeleccionado); //pongo al color seleccionado en el array de colores usados
    }
  }

  sePuedeEmpezarJuego(): boolean {  //si hay 2 jugadores minimo y si tienen nombre (entre 1 y 17 caracteres) y color elegido
    if (this.arrayJugadores.length >= 2 && this.arrayJugadores.every(jugador => jugador.nombre.trim() && jugador.color) && this.arrayJugadores.every(jugador => jugador.nombre.trim().length < 18)) {
      return true;
    } else {
      return false;
    }
  }

  private router = inject(Router);
  iniciarJuego() {
    this.arrayJugadores = this.arrayJugadores.map(jugador => ({
      ...jugador,
      nombre: jugador.nombre.trim().toLowerCase()   // sacamos los espacios al inicio y al final y pasamos todos los nombres a minusculas para no tener problemas con la fuente
    }));
    this.router.navigate(["/multiplayer-game", this.vidasElegidas, this.tiempoElegido], { state: { jugadores: this.arrayJugadores } });
  }
}

