import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectServiceService} from '../project-service.service';
import {DivisionModel, ProjectModel, ProjectModel2, UserModel} from '../project.model';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent implements OnInit {
  projectForm: FormGroup;
  project: ProjectModel2;
  loadedUser: UserModel[] = [];
  userPMO: UserModel[] = [];
  userPM: UserModel[] = [];
  userCoPM: UserModel[] = [];
  loadedDivision: DivisionModel[] = [];
  id: string;
  pmId: '';
  pmoId: '';
  coPMId: '';
  divisionId: '';

  constructor(private projectService: ProjectServiceService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onGetAllUser();
    this.onGetAllDivision();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        const id: string = params.id;
        this.projectService.getProjectById(id)
          .subscribe((response) => {
              this.id = id;
              this.setDataToForm(response);
            }, error => {
              alert(error.message);
            }
          );
      }
    });
  }

  private buildForm(): void {
    this.projectForm = new FormGroup({
      id: new FormControl(null),
      projectCode: new FormControl(null),
      projectName: new FormControl(null, [Validators.required]),
      pmo: new FormControl(null, [Validators.required]),
      pm: new FormControl(null, [Validators.required]),
      benefit: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      coPM: new FormControl(null, [Validators.required]),
      divisiUser: new FormControl(null, [Validators.required]),
      directorateUser: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      targetLive: new FormControl(null, [Validators.required]),
      prosentaseProject: new FormControl(0),
      budget: new FormControl(0),
      contracted_value: new FormControl(0),
      keyword : new FormControl(null),
      bagian : new FormControl(null),
      paymentRealization: new FormControl(0),
      score: new FormControl(null, [Validators.required, Validators.pattern('^(?:[1-9]|0[1-9]|10)$')]),
      weight: new FormControl(null),
      categoryActivity: new FormControl(null, [Validators.required]),
      categoryInitiative: new FormControl(null, [Validators.required]),
      statusProject: new FormControl('aktif')
    });
  }


  onSaveProject(postData, valid: boolean) {
    this.project = {
      id: postData.id,
      projectCode: postData.projectCode,
      projectName: postData.projectName,
      pmo: {
        id: postData.pmo
      },
      pm: {
        id: postData.pm
      },
      benefit: postData.benefit,
      description: postData.description,
      coPM: {
        id: postData.coPM
      },
      divisiUser: {
        id: postData.divisiUser
      },
      directorateUser: postData.directorateUser,
      status: postData.status,
      targetLive: postData.targetLive,
      prosentaseProject: postData.prosentaseProject,
      budget: postData.budget,
      contracted_value: postData.contracted_value,
      paymentRealization: postData.paymentRealization,
      score: postData.score,
      weight: postData.weight,
      categoryActivity: postData.categoryActivity,
      categoryInitiative: postData.categoryActivity,
      statusProject: postData.statusProject
    };
    if (valid) {
      this.projectService.saveProject(this.project, this.id)
        .subscribe(response => {
          Swal.fire( 'Success', 'Project that you input was successfully saved' , 'success'  );
          this.router.navigate(['/dashboard/project']);
        }, error => {
          Swal.fire( 'Failed', 'Failed to save project' , 'error'  );
        });
    }
  }

  onGetAllUser() {
    this.projectService.getAllUser()
      .subscribe(data => {
        this.loadedUser = data;
        for (const user of this.loadedUser) {
          if (user.userRole == '01') {
            this.userPMO.push(user)
          } if (user.userRole == '02'){
            this.userPM.push(user)
          } if (user.userRole == '03') {
            this.userCoPM.push(user)
          }
        }
        
      }, error => {
        alert(error);
      });
  }

  onGetAllDivision() {
    this.projectService.getAllDivison()
      .subscribe(data => {
        this.loadedDivision = data;
      }, error => {
        alert(error);
      });
  }

  private setDataToForm(projectForm): void {
    this.project = projectForm;
    if (this.project) {
      this.projectForm.get('id').setValue(this.project.id);
      this.projectForm.get('projectCode').setValue(this.project.projectCode);
      this.projectForm.get('projectName').setValue(this.project.projectName);
      this.projectForm.get('pmo').setValue(this.project.pmo);
      this.projectForm.get('pm').setValue(this.project.pm);
      this.projectForm.get('benefit').setValue(this.project.benefit);
      this.projectForm.get('description').setValue(this.project.description);
      this.projectForm.get('coPM').setValue(this.project.coPM);
      this.projectForm.get('divisiUser').setValue(this.project.divisiUser);
      this.projectForm.get('directorateUser').setValue(this.project.directorateUser);
      this.projectForm.get('status').setValue(this.project.status);
      this.projectForm.get('targetLive').setValue(this.project.targetLive);
      this.projectForm.get('prosentaseProject').setValue(this.project.prosentaseProject);
      this.projectForm.get('budget').setValue(this.project.budget);
      this.projectForm.get('contracted_value').setValue(this.project.contracted_value);
      this.projectForm.get('paymentRealization').setValue(this.project.paymentRealization);
      // this.projectForm.get('keyword').setValue(this.project.keyword)
      // this.projectForm.get('bagian').setValue(this.project.bagian)
      this.projectForm.get('score').setValue(this.project.score);
      this.projectForm.get('weight').setValue(this.project.weight);
      this.projectForm.get('categoryActivity').setValue(this.project.categoryActivity);
      this.projectForm.get('categoryInitiative').setValue(this.project.categoryInitiative);
      this.projectForm.get('statusProject').setValue(this.project.statusProject);
    }
  }

  form(property): AbstractControl {
    return this.projectForm.get(property);
  }

  onGolistProject() {
    this.router.navigate(['/dashboard/project'])
  }
}
