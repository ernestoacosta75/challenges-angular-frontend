import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment.development';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import { LeaderBoardRowModel } from '../state/leader-board.model';

@Injectable()
export class LeaderboardApiService {
  private GAMIFICATION_SERVER_URL: string = environment.gamificationMsApiUrl;
  private GET_LEADERS_BOARD: string = '/leaders';  
  private POST_RESULT: string = '/attempts';

  constructor(private http: HttpClient) { }

  getLeadersBoard = (): Observable<LeaderBoardRowModel[]> => {
    return this.http.get<LeaderBoardRowModel[]>(`${this.GAMIFICATION_SERVER_URL}${this.GET_LEADERS_BOARD}`);
  }
  
  postResult = (data: any) => {
    return this.http.post(`${this.GAMIFICATION_SERVER_URL}${this.POST_RESULT}`, {
      attemptId: R.path(['attemptId'], data),
      correct: R.path(['correct'], data),
      factorA: R.path(['factorA'], data),
      factorB: R.path(['factorB'], data),
      userId: R.path(['userId'], data),
      userAlias: R.path(['userAlias'], data)
    });
  }
}
