import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserContactInfoComponent } from './user-contact-info/user-contact-info.component';
import { ContactInfoGuard } from './contact-info.guard';
import { UsersGuard } from './user-list/users.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [UsersGuard]
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    children: [
      {
        path: 'contact-info',
        component: UserContactInfoComponent,
        canActivate: [ContactInfoGuard]
      },
      {
        path: 'overview',
        loadChildren: './overview/overview.module#OverviewModule',
      }
    ]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    UsersGuard,
    ContactInfoGuard
  ]
})
export class AppRoutingModule { }

export const ROUTING_COMPONENT = routes
  .map(routes => routes.component)
  .filter(component => !!component);
