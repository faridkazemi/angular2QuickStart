import { Component } from "@angular/core";
import { CommonService } from "./services/common.service";
import { SecurityService } from "./services/security.service";
import { HomeService } from "./services/home.service";

@Component({
  selector: 'home-app',
  templateUrl:'./app/templates/home.html',
  providers: [SecurityService, HomeService]     
})

export class AppComponent {

  currentUser: any = 0;
  isDataLoaded: boolean = false;
  model:any;
  constructor(private _commonService: CommonService, private _securityService: SecurityService,
              private _homeService: HomeService) {
    this.getCurentUser();
    
  }

  getCurentUser() {
    
    let obj = this;
    this._securityService.getCurrentUser(function(data) {
      obj.currentUser = data;
      obj.getDashboardInfo();
    });
  }

  getDashboardInfo() {
    let obj = this;
    this._homeService.getDashboardInfo(function(data) {
      obj.model = data;
      obj.isDataLoaded = true;
    });
    
  }

  navigateToCustomerSearch() {
    this._commonService.window.location.href = 'Customer/';
  }

  navigateToPricingChanges() {
    this._commonService.window.location.href = '/Pricing/Changes';
  }

  navigateToPricingApprovals() {
    this._commonService.window.location.href = '/Pricing/Approvals';
  }

  navigateTo(url:string) {
    this._commonService.window.location.href = url;
  }

}