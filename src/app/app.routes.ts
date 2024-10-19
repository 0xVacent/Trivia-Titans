import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './features/menu-principal/menu-principal.component';
import { MenuSingleplayerComponent } from './features/menu-singleplayer/menu-singleplayer.component';
import { TopScorersComponent } from './features/top-scorers/top-scorers.component';
import { MenuMultiplayerComponent } from './features/menu-multiplayer/menu-multiplayer.component';
import { PreguntaComponent } from './shared/pregunta/pregunta.component';

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
        path: "pregunta",
        component: PreguntaComponent
    },
    {
        path: "**",
        redirectTo: ""
    }
];
