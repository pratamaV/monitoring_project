import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2} from '../task.model';
import {FormControl, FormGroup} from "@angular/forms";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  taskForm: FormGroup;
  loadedTask: TaskModel2[] = [];
  task: TaskModel;
  role: string;
  fileName = 'List-MyTask-' + new Date().toDateString() + '.xlsx';
  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.onGetTaskByUserId();
    this.buildForm();
  }

  private buildForm(): void {
    this.taskForm  = new FormGroup({
      taskDoc: new FormControl(null)
    });
  }

  onGetTaskByUserId() {
    this.taskService.getTaskByUserId(localStorage.getItem('idUser'))
      .subscribe(data => {
        this.loadedTask = data;
      }, error => {
        alert(error);
      });
  }

  onDoneTask(task, idRelease){
    this.task = {
      id: task.id,
      taskName: task.taskName,
      taskCode: task.taskCode,
      assignedTo: JSON.stringify({
        id: task.assignedTo.id
      }) ,
      score: task.score,
      weight: task.weight,
      statusDone: 'Ya',
      taskProsentase: task.taskProsentase,
      finalTarget: new Date(task.finalTarget),
      taskDoc: task.taskDoc,
      release: JSON.stringify({
        id: task.release.id
      })
    };
    this.taskService.onDoneTask(this.task, idRelease)
      .subscribe(data => {
        alert('success');
        window.location.reload();
      }, error => {
        alert(error.message);
      });
  }

  onUploadDocument(postData, valid: boolean, id){
    console.log(postData);
    if (valid) {
      this.taskService.uploadDocumentTask(postData, id)
        .subscribe(response => {
          window.location.reload();
        }, error => {
          alert(error.message);
        });
    }
  }

  processFile(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      this.taskForm.get('taskDoc').setValue(file);
    }
  }

  downloadTaskDoc(taskCode){
    this.taskService.getTaskDocument(taskCode).subscribe((response) => {
      alert('success');
    }, error => {
      alert('tidak ada dokumen yang di upload');
    });
  }

  exportexcel() {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
