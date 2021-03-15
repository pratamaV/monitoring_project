import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';


const routes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
      ]
    },
    loadChildren: () => import('./user/user.module').then(u => u.UserModule)
  },
  {
    path: 'project',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
      ]
    },
    loadChildren: () =>
      import('./project/project.module').then(p => p.ProjectModule)
  },
  {
    path: 'release',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
      ]
    },
    loadChildren: () =>
      import('./release/release.module').then(p => p.ReleaseModule)
  },
  {
    path: 'task',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./task/task.module').then(p => p.TaskModule)
  },
  {
    path: 'issued',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
      ]
    },
    loadChildren: () =>
      import('./issued/issued.module').then(p => p.IssuedModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
