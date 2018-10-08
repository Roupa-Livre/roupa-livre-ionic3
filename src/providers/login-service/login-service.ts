import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginServiceProvider {

	// CONSTRUCTOR
	constructor(
		public http: Http,
		private storage: Storage,
		private fb: Facebook,
	) {
	}

	login() {
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

	isFirstTime() {

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
