import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { ReversiGameEngineService } from './reversi-game-engine.service';
import { BoardtoString, Board_RO, C, GameState, TileCoords } from './ReversiDefinitions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  //Declare un tableau de tablea de boolean 
  canPlay : boolean[] = [];

  gs?: GameState;
  strBoard :string = "";
  Lplay : TileCoords[] = [];

  constructor(public RGS: ReversiGameEngineService ) {
// Je m'abonne a mon observable GameState qui a chaque modification de l'état du jeu va me dire 
    RGS.gameStateObs.subscribe(gs => {
      this.gs = gs;
      this.strBoard = BoardtoString(gs.board);
      this.Lplay = [...RGS.whereCanPlay()];
    })
    
  }
  play(coup: TileCoords): void { 
    this.RGS.play(...coup); 
  } 
 //Je definie une methode permettant d'affecter le player 1 et 2 respectivement a X et 0
  getStringFor(c: C){
    switch(c){
      case 'Player1':return 'X';
      case 'Player2':return '0';
      default : return ' ';
    }

  }
}
