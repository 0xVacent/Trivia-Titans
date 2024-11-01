import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPrincipalComponent } from './features/menu-principal/menu-principal.component';
import { MenuSingleplayerComponent } from './features/menu-singleplayer/menu-singleplayer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuPrincipalComponent, MenuSingleplayerComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Trivia-Titans';
  isMuted = false;

   toggleMute() {
    const player = document.getElementById('audioplayer') as HTMLAudioElement;

    // Cambia el estado de isMuted
    this.isMuted = !this.isMuted;
    // Envía un mensaje al audioplayer para alternar entre mute y unmute
    player.muted = this.isMuted;
    
 
  }
}
