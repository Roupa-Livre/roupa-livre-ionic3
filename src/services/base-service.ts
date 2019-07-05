import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import  "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { BaseHttpService } from "./base-http-service";
import { AngularTokenService } from "angular-token";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export abstract class BaseService extends BaseHttpService {
  constructor(http: Http, private tokenService: AngularTokenService) {
    super(http);
  }

  protected options() {
    // console.log(this.tokenService.currentAuthData);
    return this.optionsCustomToken(this.tokenService.currentAuthData);
  }

  // Parse Auth data from response
  protected handleResponse(res: any): any {
    if (res && res.url) {
      if (this.tokenService.tokenOptions.apiBase === null || (res.url && res.url.match(this.tokenService.tokenOptions.apiBase))) {
        this.tokenService.getAuthHeadersFromResponse(<any>res);
      }
    }
    return res;
  }
}
