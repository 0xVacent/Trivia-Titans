import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-singleplayer',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './menu-singleplayer.component.html',
  styleUrl: './menu-singleplayer.component.css'
})
export class MenuSingleplayerComponent {
  nombreJugador: string = "";
  categoriaElegida: string = "any";   //any por defecto
  dificultadElegida: string = "any";  //any por defecto
}
