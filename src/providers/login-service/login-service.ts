import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginServiceProvider {

	constructor(
		public http: Http
	) {
	}

	login() {
		return new Promise(resolve => {
			// TODO : IMPLEMENTS FACEBOOK LOGIN
			resolve(true);
		});
	}

	isFirstTime() {
		return new Promise(resolve => {
			// TODO : IMPLEMENTS STORAGE TO VERIFY IF FIRST TIME LOGIN
			resolve(true);
		});
	}

}
