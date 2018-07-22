"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_service_1 = require("./services/common.service");
const security_service_1 = require("./services/security.service");
const home_service_1 = require("./services/home.service");
let AppComponent = class AppComponent {
    constructor(_commonService, _securityService, _homeService) {
        this._commonService = _commonService;
        this._securityService = _securityService;
        this._homeService = _homeService;
        this.currentUser = 0;
        this.isDataLoaded = false;
        this.getCurentUser();
    }
    getCurentUser() {
        let obj = this;
        this._securityService.getCurrentUser(function (data) {
            obj.currentUser = data;
            obj.getDashboardInfo();
        });
    }
    getDashboardInfo() {
        let obj = this;
        this._homeService.getDashboardInfo(function (data) {
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
    navigateTo(url) {
        this._commonService.window.location.href = url;
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'home-app',
        templateUrl: './app/templates/home.html',
        providers: [security_service_1.SecurityService, home_service_1.HomeService]
    }),
    __metadata("design:paramtypes", [common_service_1.CommonService, security_service_1.SecurityService,
        home_service_1.HomeService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map