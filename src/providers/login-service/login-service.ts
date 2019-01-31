import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';

@Injectable()
export class LoginServiceProvider {

	// CONSTRUCTOR
	constructor(
		public http: Http,
		private storage: Storage,
		private fb: Facebook,
		private _tokenService: AngularTokenService) {
	}

	isLogged() : boolean {
		return this._tokenService.userSignedIn();
	}

	loginWithFacebook() {
    // TODO : IMPLEMENTS FACEBOOK LOGIN

		// return this.fb.login(['public_profile', 'email'])
		// .then((response: FacebookLoginResponse) => {
		// 	console.log('USER LOGGED INTO FACEBOOK - RESPONSE : ', response);
		// })
		// .catch(e => {
		// 	console.log('ERROR LOGGING USER INTO FACEBOOK : ', e);
		// });

		return new Promise(resolve => {
			resolve(true);
		});
	}
	login(email, password) {
		return this._tokenService.signIn({ login: email, password }).toPromise().then(res => {
			console.log('login', res);
			return res;
		});
	}

	isFirstTime() : Promise<boolean> {

		return new Promise(resolve => {

			this.storage.get('firstLogin')
			.then((value) => {

				if (value == false) {
					resolve(false);
				} else {
					this.storage.set('firstLogin', false);
					resolve(true);
				}
			});

		});
	}

}
