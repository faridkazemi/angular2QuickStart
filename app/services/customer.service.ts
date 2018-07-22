import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable()

export class CustomerService {

  abc : Config;
  constructor(private _http: Http) {}
 
  getCustomerList(successFunc: (data: any) => any): void {

    this._http.get("Customer/GetCustomerList").map((response: Response) => <Config>response.json())
       .subscribe((data: Config) => successFunc(data),
       error => this.handleError(error));
    
  }

  private handleError(error: any) {
    console.error(error);
    alert('Operation Failed !');
  }
}