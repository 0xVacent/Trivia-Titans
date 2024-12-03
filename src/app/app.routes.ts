import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './features/menu-principal/menu-principal.component';
import { MenuSingleplayerComponent } from './features/menu-singleplayer/menu-singleplayer.component';
import { TopScorersComponent } from './features/top-scorers/top-scorers.component';
import { MenuMultiplayerComponent } from './features/menu-multiplayer/menu-multiplayer.component';
import { SingleplayerGamePageComponent } from './pages/singleplayer-game-page/singleplayer-game-page.component';
import { EndGameComponent } from './shared/end-game/end-game.component';
import { MultiplayerGamePageComponent } from './pages/multiplayer-game-page/multiplayer-game-page.component';
import { endgameGuardFn } from './gameGuard/guard/endgame.guard-fn';

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
        path: "singleplayer-game/:nombre/:categoria/:dificultad",  //categoria y dificultad son opcionales
        component: SingleplayerGamePageComponent
    },
    {
        path: "endgame/singleplayer/:nombre/:puntos/:categoria/:dificultad",    //redirecciona con la categoria, la dificultad, el nombre y los puntos para el modo singleplayer
        component: EndGameComponent,
        canActivate: [endgameGuardFn]
    },
    {
        path: "endgame/multiplayer/:nombre/:puntos/:vidas/:tiempo",    //redirecciona con el nombre, los puntos obtenidos, las vidas y el tiempo para el modo multiplayer
        component: EndGameComponent,
        canActivate: [endgameGuardFn]
    },
    {
        path: "multiplayer-game/:vidas/:tiempo",
        component: MultiplayerGamePageComponent
    },
    {
        path: "**",
        redirectTo: ""
    }

];
