import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  getGameDetails(gameId: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${gameId}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${gameId}/movies`
    );

    const gameScreenShotsRequest = this.http.get(
      `${env.BASE_URL}/games/${gameId}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenShotsRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenShotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        }
      })
    )
  }

  constructor(private http: HttpClient) { }

  gameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if(search) {
      params = new HttpParams().set("ordering", ordering).set('search', search)
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }
}
