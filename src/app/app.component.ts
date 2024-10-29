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
 /* isMuted = true;

   toggleMute() {
    const player = document.getElementById('youtubePlayer') as HTMLIFrameElement;

    // Envía un mensaje al iframe para alternar entre mute y unmute
    const command = this.isMuted ? 'unMute' : 'mute';
    player.contentWindow?.postMessage(`{"event":"command","func":"${command}","args":[]}`, '*');
    
    // Cambia el estado de isMuted
    this.isMuted = !this.isMuted;
  } */
}
