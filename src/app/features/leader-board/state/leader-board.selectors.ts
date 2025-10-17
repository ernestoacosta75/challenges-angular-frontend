import { Selector } from "@ngxs/store";
import { LeaderBoardStateModel } from "./leader-board.model";
import { LeadersBoardState } from "./leader-board.state";

export class LeadersBoardStateSelectors {
  @Selector([LeadersBoardState])
  static getLeadersBoard(state: LeaderBoardStateModel) {
    return state.leadersBoard;
  }

  @Selector([LeadersBoardState])
  static loading(state: LeaderBoardStateModel) {
    return state.loading;
  }  
}
