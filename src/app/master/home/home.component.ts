import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {HomeService} from './home.service';
import {ProjectServiceService} from "../project/project-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  deliveryStage = 0;
  development = 0;
  implementation = 0;
  live = 0;
  migration = 0;
  notStarted = 0;
  procurement = 0;
  PTR = 0;
  requirementGathering = 0;
  uat = 0;

  onSchedule = 0;
  ptrLive = 0;
  notStart = 0;

  constructor(private homeService: HomeService,
              private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.onGetAllRelases();
    this.onGetListProject();
    const productCanvas = document.getElementById('releaseByStage');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 14;
    const productData = {
      labels: [
        'Delivery Barang',
        'Development',
        'Implementation',
        'Live',
        'Migration',
        'Not Started',
        'Procurement',
        'PTR',
        'Requirement Gathering',
        'UAT'
      ],
      datasets: [
        {
          data: [this.deliveryStage, this.development, this.implementation, this.live, this.migration, this.notStarted,
            this.procurement, this.PTR, this.requirementGathering, this.uat],
          backgroundColor: [
            '#f9e0ae',
            '#fc8621',
            '#682c0e',
            '#b3a30c',
            '#c6c36e',
            '#26b186',
            '#428ec1',
            '#680e4f',
            '#4d0651',
            '#8c0b6c'
          ]
        }]
    };

    const pieChart = new Chart(productCanvas, {
      type: 'pie',
      data: productData
    });


    const ctx = document.getElementById('barChart');
    const myChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Delivery Barang',
          'Development',
          'Implementation',
          'Live',
          'Migration',
          'Not Started',
          'Procurement',
          'PTR',
          'Requirement Gathering',
          'UAT'],
        datasets: [{
          label: '',
          data: [this.deliveryStage, this.development, this.implementation, this.live, this.migration, this.notStarted,
            this.procurement, this.PTR, this.requirementGathering, this.uat],
          backgroundColor: [
            '#f9e0ae',
            '#fc8621',
            '#682c0e',
            '#b3a30c',
            '#c6c36e',
            '#26b186',
            '#428ec1',
            '#680e4f',
            '#4d0651',
            '#8c0b6c'
          ],
          borderColor: [
            '#f9e0ae',
            '#fc8621',
            '#682c0e',
            '#b3a30c',
            '#c6c36e',
            '#26b186',
            '#428ec1',
            '#680e4f',
            '#4d0651',
            '#8c0b6c'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 80
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  onGetAllRelases() {
    this.homeService.getAllRelease()
      .subscribe(data => {
        for (const release of data) {
          if (release.stage === 'Delivery Barang'){
            this.deliveryStage = this.deliveryStage + 1;
          } else if (release.stage === 'Development'){
            this.development = this.development + 1;
          } else if (release.stage === 'Implementation'){
            this.implementation = this.implementation + 1;
          } else if (release.stage === 'Live'){
            this.live = this.live + 1;
          } else if (release.stage === 'Migration'){
            this.migration = this.migration + 1;
          } else if (release.stage === 'Not Started'){
            this.notStarted = this.notStarted + 1;
          } else if (release.stage === 'Procurement'){
            this.procurement = this.procurement + 1;
          } else if (release.stage === 'PTR'){
            this.PTR = this.PTR + 1;
          } else if (release.stage === 'Requirement Gathering'){
            this.requirementGathering = this.requirementGathering + 1;
          } else if (release.stage === 'UAT'){
            this.uat = this.uat + 1;
          } else if (release.status === 'On Schedule'){
            this.uat = this.onSchedule + 1;
          } else if (release.status === 'PTR/ Live'){
            this.uat = this.ptrLive + 1;
          } else if (release.status === 'Not Started'){
            this.uat = this.notStart + 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  onGetListProject() {
    this.projectService.getAllProject()
      .subscribe(data => {
        console.log(data);
      }, error => {
        alert(error);
      });
  }

}
