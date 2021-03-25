<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailTaskComponent } from './detail-task/detail-task.component';


const routes: Routes = [
  {
    path: 'detail',
    component: DetailTaskComponent
  },

];


=======
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from './list-task/list-task.component';
import {FormTaskComponent} from './form-task/form-task.component';
import {DetailTaskComponent} from './detail-task/detail-task.component';
import {MyTaskComponent} from './my-task/my-task.component';
import { AuthGuardService } from 'src/app/auth-guard.service';
import {UserTaskComponent} from "./user-task/user-task.component";

const routes: Routes = [

  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '05'
      ]
    },
    component: ListTaskComponent
  },
  {
    path: 'form-task',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '05'
      ]
    },
    component: FormTaskComponent
  },
  {
    path: 'form-task/:id',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '05'
      ]
    },
    component: FormTaskComponent
  },
  {
    path: 'detail-task',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '05'
      ]
    },
    component: DetailTaskComponent
  },
  {
    path: 'user-task',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '05'
      ]
    },
    component: UserTaskComponent
  },
  {
    path: 'my-task',
    component: MyTaskComponent
  }
];

>>>>>>> development-pull-wnt
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD

=======
>>>>>>> development-pull-wnt
export class TaskRoutingModule { }
