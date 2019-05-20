import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { OverviewGuard } from './overview.guard';

const routes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [OverviewGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OverviewGuard]
})
export class OverviewRoutingModule { }
