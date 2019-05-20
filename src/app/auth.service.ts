import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthorized: boolean;
  public get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  constructor() {
    this._isAuthorized = false;
  }
}
