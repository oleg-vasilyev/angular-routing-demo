import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, zip, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface IUser {
  id: number;
  name: string;
  info: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _USERS_URL = 'http://localhost:3000/users';

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getUsers(): Observable<IUser[]> {
    // const users$ = this._httpClient.get<IUser[]>(this._USERS_URL);
    const users$ = of([
      {
        id: 0,
        name: 'user0',
        info: 'info0'
      },
      {
        id: 1,
        name: 'user1',
        info: 'info1'
      },
      {
        id: 2,
        name: 'user2',
        info: 'info2'
      },
    ])
    return users$;
  }

  public getUserById(id: number): Observable<IUser> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(d => d.id === id);
        if (!user) {
          throw Error(`user with id=${id} is not exist`);
        }
        return user;
      }),
      catchError(e => {
        return throwError(e.message);
      })
    );
  }

  private _changeHandler(currentUserId: number, vector: 'next' | 'prev') {
    return zip(
      this.getUsers(),
      this.getUserById(currentUserId)
    ).pipe(
      map(([users, currentUser]) => {
        const currentUserIndex = users.findIndex(d => d.id === currentUser.id);
        const newIndex = vector === 'next' ? currentUserIndex + 1 : currentUserIndex - 1;
        const user = users[newIndex];
        if(!user) {
          throw Error(`next user is not exist`);
        }
        return user.id;
      }),
      catchError(e => {
        return throwError(e.message);
      })
    )
  }

  public getNextUserId(currentUserId: number): Observable<number> {
    return this._changeHandler(currentUserId, 'next');
  }

  public getPrevUserId(currentUserId: number): Observable<number> {
    return this._changeHandler(currentUserId, 'prev');
  }
}
