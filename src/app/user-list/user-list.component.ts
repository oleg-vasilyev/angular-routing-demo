import { Component, OnInit } from '@angular/core';
import { DataService, IUser } from '../data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private _users$: Observable<IUser[]>;
  public get users$(): Observable<IUser[]> {
    return this._users$;
  }

  constructor(
    private _dataService: DataService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._users$ = this._dataService.getUsers();
  }

  public onUserClick(user: IUser): void {
    this._router.navigate(['/users', user.id]);
  }

}
