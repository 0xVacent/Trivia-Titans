import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Jugador } from '../../interfaces/jugador.interface';
import { ScoresService } from '../../services/scores.service';

@Component({
  selector: 'app-top-scorers',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-scorers.component.html',
  styleUrl: './top-scorers.component.css'
})
export class TopScorersComponent implements OnInit {
  puntajesJugadores: Jugador[] = [];

  ngOnInit(): void {
    this.getSingleplayerScores();
  }

  //json-server
  private scoresService = inject(ScoresService)

  getSingleplayerScores() {
    this.scoresService.getSingleplayerScores().subscribe(
      {
        next: (scores: Jugador[]) => {
          this.puntajesJugadores = scores.sort((a, b) => b.puntos - a.puntos);  //guardo en el array puntajesJugadores lo que esta en el json-server pero antes lo ordeno de manera descendente
        },
        error: (err: Error) => {
          console.log(err.message);
        }
      }
    )
  }

  
}
