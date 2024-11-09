import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './features/menu-principal/menu-principal.component';
import { MenuSingleplayerComponent } from './features/menu-singleplayer/menu-singleplayer.component';
import { TopScorersComponent } from './features/top-scorers/top-scorers.component';
import { MenuMultiplayerComponent } from './features/menu-multiplayer/menu-multiplayer.component';
import { SingleplayerGamePageComponent } from './pages/singleplayer-game-page/singleplayer-game-page.component';
import { EndGameComponent } from './shared/end-game/end-game.component';
import { MultiplayerBoardComponent } from './features/multiplayer-board/multiplayer-board.component';
import { MultiplayerGamePageComponent } from './pages/multiplayer-game-page/multiplayer-game-page.component';

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
        path: "endgame/:modo/:nombre/:puntos",    //redirecciona con los puntos obtenidos en el juego
        component: EndGameComponent
    },
    {
        path: "multiplayer-game",
        component: MultiplayerGamePageComponent
    },
    {
        path: "**",
        redirectTo: ""
    }

];
