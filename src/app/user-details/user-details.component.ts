import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService, IUser } from '../data.service';
import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private _currentUserId: number;

  private _activateRouteSubscription: Subscription;

  private _user$: Observable<IUser>;
  public get user$(): Observable<IUser> {
    return this._user$;
  }

  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this._activateRouteSubscription = this._activateRoute.paramMap.subscribe((param: ParamMap) => {
      this._currentUserId = +param.get('id');

      this._user$ = this._dataService.getUserById(this._currentUserId).pipe(
        catchError(errorMessage => {
          console.warn(errorMessage);
          this._router.navigate(['/404']);
          return of(null);
        })
      );
    });
  }

  ngOnDestroy(): void {
    if (this._activateRouteSubscription) {
      this._activateRouteSubscription.unsubscribe();
    }
  }

  private _changeHandler(vector: 'prev' | 'next') {
    const method = vector === 'prev'
      ? this._dataService.getPrevUserId.bind(this._dataService)
      : this._dataService.getNextUserId.bind(this._dataService);

    method(this._currentUserId)
      .pipe(
        catchError(errorMessage => {
          console.warn(errorMessage);
          return of(null);
        })
      )
      .toPromise()
      .then(id => id === null ? this._router.navigate(['/404']) : this._router.navigate(['/users', id]));
  }

  public onNext(): void {
    this._changeHandler('next');
  }

  public onPrev(): void {
    this._changeHandler('prev');
  }
}
