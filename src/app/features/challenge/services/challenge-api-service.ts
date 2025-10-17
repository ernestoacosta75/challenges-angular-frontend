import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChallengeModel } from '../state/challenge.model';
import { environment } from '@app/environments/environment.development';

@Injectable()
export class ChallengeApiService {
  
  private CHALLENGES_SERVER_URL: string = environment.challengeMsApiUrl;
  private GET_CHALLENGE: string = '/challenges/random';
  private POST_RESULT: string = '/attempts';
  private GET_ALL_RESULTS: string = '/attempts/all';

  constructor(private http: HttpClient) { }

  getChallenge = () => {
    return this.http.get(`${this.CHALLENGES_SERVER_URL}${this.GET_CHALLENGE}`);
  }

  getStatsForUser = (userAlias: string) => {
    return this.http.get(`${this.CHALLENGES_SERVER_URL}${this.POST_RESULT}?alias=${userAlias}`);
  }    

  getAllAttempts = () => {
    return this.http.get(`${this.CHALLENGES_SERVER_URL}${this.GET_ALL_RESULTS}`);
  }  
  
  sendGuess = (data: Partial<ChallengeModel>) => {
    return this.http.post(`${this.CHALLENGES_SERVER_URL}${this.POST_RESULT}`, {
      userAlias: data.userAlias,
      factorA: data.factorA,
      factorB: data.factorB,
      guess: data.guess
    });
  }
}
