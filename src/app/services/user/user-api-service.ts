import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment.development';

@Injectable()
export class UserApiService {
  private CHALLENGES_SERVER_URL: string = environment.challengeMsApiUrl;
    private GET_USERS_BY_IDS: string = '/users';
    
  constructor(private http: HttpClient) { }

  getUsers = (userIds: string[]) => {
    if (!userIds || userIds.length === 0) {
      throw new Error("No userIds provided");
    }

    return this.http.get(`${this.CHALLENGES_SERVER_URL}${this.GET_USERS_BY_IDS}/${userIds}`);
  }
}
