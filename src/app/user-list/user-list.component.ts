import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, IUser } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private _selectedId: number;

  private _activateRouteSubscription: Subscription;

  private _users$: Observable<IUser[]>;
  public get users$(): Observable<IUser[]> {
    return this._users$;
  }

  constructor(
    private _dataService: DataService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._users$ = this._dataService.getUsers();

    this._activateRouteSubscription = this._activateRoute.paramMap.subscribe((param: ParamMap) => {
      this._selectedId = parseInt(param.get('id'));
    });
  }

  ngOnDestroy(): void {
    if (this._activateRouteSubscription) {
      this._activateRouteSubscription.unsubscribe();
    }
  }

  public onUserClick(user: IUser): void {
    this._router.navigate([`./${user.id}`], { relativeTo: this._activateRoute });
  }

  public isSelected(user: IUser): boolean {
    const output = user.id === this._selectedId;
    return output;
  }

}
