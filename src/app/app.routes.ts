import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './features/menu-principal/menu-principal.component';
import { MenuSingleplayerComponent } from './features/menu-singleplayer/menu-singleplayer.component';
import { TopScorersComponent } from './features/top-scorers/top-scorers.component';
import { MenuMultiplayerComponent } from './features/menu-multiplayer/menu-multiplayer.component';
import { SingleplayerGamePageComponent } from './pages/singleplayer-game-page/singleplayer-game-page.component';
import { EndGameComponent } from './shared/end-game/end-game.component';
import { MultiplayerLoadingScreenComponent } from './pages/multiplayer-loading-screen/multiplayer-loading-screen.component';

export const routes: Routes = [
    {
        path: "",
        component: MenuPrincipalComponent
    },
    {
        path: "menu-singleplayer",
        component: MenuSingleplayerComponent
    },
    {
        path: "menu-multiplayer",
        component: MenuMultiplayerComponent
    },
    {
        path: "top-scorers",
        component: TopScorersComponent
    },
    {
        path: "singleplayer-game/:nombre",
        component: SingleplayerGamePageComponent
    },
    {
        path: "endgame/:nombre/:puntos",    //redirecciona con los puntos obtenidos en el juego
        component: EndGameComponent
    },
    {
        path: "multiplayer-Loading",
        component:MultiplayerLoadingScreenComponent
    },
    {
        path: "**",
        redirectTo: ""
    }

];
