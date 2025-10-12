import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChallengeModel } from '../state/challenge.model';

@Injectable()
export class ChallengeApiService {
  
  private SERVER_URL: string = 'http://localhost:8080';
  private GET_CHALLENGE: string = '/challenges/random';
  private GET_USERS_BY_IDS: string = '/users';
  private POST_RESULT: string = '/attempts';

  constructor(private http: HttpClient) { }

  getChallenge = () => {
    return this.http.get(`${this.SERVER_URL}${this.GET_CHALLENGE}`);
  }
  
  getUsers = (userIds: string[]) => {
    if (!userIds || userIds.length === 0) {
      throw new Error("No userIds provided");
    }

    return this.http.get(`${this.SERVER_URL}${this.GET_USERS_BY_IDS}`, {
      params: {
        userIds: userIds
      }
    });
  }

  sendGuess = (data: Partial<ChallengeModel>) => {
    return this.http.post(`${this.SERVER_URL}${this.POST_RESULT}`, {
      user: data.user,
      factorA: data.factorA,
      factorB: data.factorB,
      guess: data.guess
    });
  }
}
