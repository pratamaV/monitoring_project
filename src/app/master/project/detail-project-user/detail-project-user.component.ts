import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../project.model';
import {TaskModel, TaskModel2} from './../../task/task.model';
import {ReleaseModel} from './../../release/release.model';
import {ProjectServiceService} from "../project-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-project-user',
  templateUrl: './detail-project-user.component.html',
  styleUrls: ['./detail-project-user.component.css']
})
export class DetailProjectUserComponent implements OnInit {

  projectModel: ProjectModel;
  taskModel: TaskModel[] = [];
  releaseModel: ReleaseModel[];
  constructor(private projectService: ProjectServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.projectModel = history.state;
    this.getDetailProject();
  }

  getDetailProject(){
    this.releaseModel = this.projectModel.releaseList;
  }


  getTaskByReleaseId(id){
    this.projectService.getTaskByReleaseId(id)
      .subscribe(data => {
        this.taskModel = data;
      }, error => {
        alert(error);
      });
  }

  onGolistProject() {
    const back = localStorage.getItem('backtoproject');
    if (back === 'listprojectuser') {
      this.router.navigate(['/dashboard/project/project-user']);
    } else if (back === 'backmyproject') {
      this.router.navigate(['/dashboard/project/my-project']);
    }
  }
}
