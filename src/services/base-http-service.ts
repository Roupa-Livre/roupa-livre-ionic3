import { Injectable } from "@angular/core";
import { Headers, RequestOptions, Http } from "@angular/http";
import "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Environment } from "../config/environment";
import { ApiArray } from "../models/api-array";

@Injectable()
export abstract class BaseHttpService {
  constructor(protected http: Http) { }

  url(path: string, params = {}) {
    return BaseHttpService.addParamsToUrl(`${Environment.API_URL}/${path}`, params);
  }

  protected abstract options() : RequestOptions;
  protected handleResponse(res: any) : any { return res; }

  protected defaultHeaderParams() : Headers{
    return new Headers({
      'Accept': "application/json",
      'Cache-Control': "no-cache",
      'Pragma': "no-cache",
    });
  }

  protected defaultOptions() : RequestOptions{
    // tokens are auto retrieved with angular-token
    let headers = this.defaultHeaderParams();
    return new RequestOptions({ headers: headers });
  }

  protected optionsCustomToken(authData) : RequestOptions{
    let headers = this.defaultHeaderParams();

    // tokens are auto retrieved with angular-token
    if (authData) {
      headers.append("access-token", authData.accessToken);
      headers.append("client", authData.client);
      headers.append("expiry", authData.expiry);
      headers.append("token-type", authData.tokenType);
      headers.append("uid", authData.uid);
    }

    return new RequestOptions({ headers: headers });
  }

  public static addParamsToUrl(url: string, paramsMap) {
    const lowerUrl = url.toLowerCase();
    const paramsKeys = Object.keys(paramsMap);
    if (paramsKeys.length === 0)
      return url;
    const params = paramsKeys
      .filter(paramKey => lowerUrl.indexOf(paramKey) == -1)
      .map(paramKey => `${paramKey}=${Object(paramsMap[paramKey]) !== paramsMap[paramKey] ? paramsMap[paramKey] : JSON.stringify(paramsMap[paramKey])}`);
    const paramsQuery = params.join("&");
    if (url.indexOf("?") == -1)
      return url + "?" + paramsQuery;
    else
      return url + "&" + paramsQuery;
  }

  protected getOne(relativeUrl, params = {}, processor = obj => obj) : Promise<any> {
    return this.http.get(this.url(relativeUrl, params), this.options())
      .toPromise()
      .then(res => this.handleResponse(res), res => this.handleResponse(res))
      .then(res => this.fetchOne(res, processor));
  }

  protected getMany<T>(relativeUrl, params = {}, listProperty = null, processor = obj => obj) : Promise<ApiArray<T>> {
    return this.http.get(this.url(relativeUrl, params), this.options())
      .toPromise()
      .then(res => this.handleResponse(res), res => this.handleResponse(res))
      .then(res => this.fetchMany<T>(res, listProperty, processor));
  }

  protected post(relativeUrl, data, params = {}, processor = obj => obj) : Promise<any> {
    return this.http.post(this.url(relativeUrl, params), data, this.options())
      .toPromise()
      .then(res => this.handleResponse(res), res => this.handleResponse(res))
      .then(res => this.fetchOne(res, processor));
  }

  protected put(relativeUrl, data, params = {}, processor = obj => obj) : Promise<any> {
    return this.http.put(this.url(relativeUrl, params), data, this.options())
      .toPromise()
      .then(res => this.handleResponse(res), res => this.handleResponse(res))
      .then(res => this.fetchOne(res, processor))
  }

  protected delete(relativeUrl, params = {}, processor = obj => obj) : Promise<any> {
    return this.http.delete(this.url(relativeUrl, params), this.options())
      .toPromise()
      .then(res => this.handleResponse(res), res => this.handleResponse(res))
      .then(res => this.fetchOne(res, processor));
  }

  protected fetchOne(response, processor = obj => obj) {
    return processor(response.json() || {});
  }

  protected fetchMany<T>(response, listProperty = null, processor = obj => obj) : ApiArray<T> {
    let result = null;
    if (listProperty) {
      const listContainer = (response.json() || {});
      listContainer[listProperty] = new ApiArray<T>((listContainer[listProperty] || []).map(element => processor(element)));
      result = listContainer;

    } else {
      result = new ApiArray<T>((response.json() || []).map(element => processor(element)));
    }
    const totalRecordsStr = response.headers.get('Total-Records');
    if (totalRecordsStr)
      result.totalRecords = Number(totalRecordsStr);
    return result;
  }
}
