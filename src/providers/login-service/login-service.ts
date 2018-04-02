import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginServiceProvider {

	constructor(
		public http: Http
	) {
		console.log('LOGINSERVICEPROVIDER - CONSTRUCTOR');
	}

	login() {
		return new Promise(resolve => {
			console.log('LOGINSERVICEPROVIDER - LOGIN');

			// TODO : IMPLEMENTS FACEBOOK LOGIN
			resolve(true);
		});
	}

	isFirstTime() {
		return new Promise(resolve => {
			console.log('LOGINSERVICEPROVIDER - ISFIRSTTIME');

			// TODO : IMPLEMENTS STORAGE TO VERIFY IF FIRST TIME LOGIN
			resolve(true);
		});
	}

}
