import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Trivia-Titans';
  isMuted = true;   //arranca muteado pq los navegadores no permiten reproducir audio automaticamente hasta que el usuario interactue
  audio: HTMLAudioElement = new (Audio);

  constructor() {
    this.audio.src="music/ambient.mp3"; //cargamos el audio en el constructor
    this.audio.load();
    this.audio.loop = true; //musica en loop
  }

  playSound(){
    if (this.isMuted) {   //si esta muteado y clickeamos, se desmutea y sigue la musica
      this.audio.play();
      this.isMuted = false;
    } else {              //si esta demuteado y clickeamos, se mutea y se pausa la musica
      this.audio.pause();
      this.isMuted = true;
    }
  
  }
}
