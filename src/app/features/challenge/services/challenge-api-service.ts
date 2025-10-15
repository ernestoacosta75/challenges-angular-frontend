import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChallengeModel } from '../state/challenge.model';
import { environment } from '@app/environments/environment.development';

@Injectable()
export class ChallengeApiService {
  
  private CHALLENGES_SERVER_URL: string = environment.challengeMsApiUrl;
  private GET_CHALLENGE: string = '/challenges/random';
  private GET_USERS_BY_IDS: string = '/users';
  private POST_RESULT: string = '/attempts';
  private GET_ALL_RESULTS: string = '/attempts/all';

  constructor(private http: HttpClient) { }

  getChallenge = () => {
    return this.http.get(`${this.CHALLENGES_SERVER_URL}${this.GET_CHALLENGE}`);
  }

  getAllAttempts = () => {
    return this.http.get(`${this.CHALLENGES_SERVER_URL}${this.GET_ALL_RESULTS}`);
  }  
  
  getUsers = (userIds: string[]) => {
    if (!userIds || userIds.length === 0) {
      throw new Error("No userIds provided");
    }

    return this.http.get(`${this.CHALLENGES_SERVER_URL}${this.GET_USERS_BY_IDS}`, {
      params: {
        userIds: userIds
      }
    });
  }

  sendGuess = (data: Partial<ChallengeModel>) => {
    return this.http.post(`${this.CHALLENGES_SERVER_URL}${this.POST_RESULT}`, {
      user: data.user,
      factorA: data.factorA,
      factorB: data.factorB,
      guess: data.guess
    });
  }
}
