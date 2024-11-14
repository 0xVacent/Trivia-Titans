import { inject } from "@angular/core"
import { GameService } from "../service/game.service"
import { Router } from "@angular/router";

export const endgameGuardFn = () => {
   const gameService = inject(GameService);
   const router = inject(Router);

   if (gameService.estaTerminada()) {
    return true;
  } else {
    router.navigateByUrl("/");
    return false;
  }
}