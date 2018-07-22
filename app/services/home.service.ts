import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()

export class HomeService {
  
constructor(private _http: Http) {
  
  }

getDashboardInfo(successFunc: (data: any) => any): void {

  this._http.get("Home/GetDashboardInfo").map((response: Response) => response.json())
    .subscribe((data: any) => successFunc(data),
      (err:any) => this.handleError(err)
    );
    
}

  private handleError(error: any) {
    console.error(error);
    alert('Operation Failed !');
  }

  
}
