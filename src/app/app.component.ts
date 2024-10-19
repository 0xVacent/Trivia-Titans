import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPrincipalComponent } from './features/menu-principal/menu-principal.component';
import { MenuSingleplayerComponent } from './features/menu-singleplayer/menu-singleplayer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuPrincipalComponent, MenuSingleplayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Trivia-Titans';
}
