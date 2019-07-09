import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Platform } from 'ionic-angular';

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';


import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';
import { RegisteringUser } from '../models/user';

@Injectable()
export class LoginServiceProvider {

	// CONSTRUCTOR
	constructor(
		private platform: Platform,
		private inAppBrowser: InAppBrowser,
		public http: Http,
		private storage: Storage,
		// private fb: Facebook,
		private _tokenService: AngularTokenService) {
  }

  public validate() : Promise<any> {
    return this._tokenService.validateToken().toPromise();
  }

	isLogged() : boolean {
		return this._tokenService.userSignedIn();
  }

  user() : any {
		return this._tokenService.currentUserData;
	}

	hasAgreed() : boolean {
		return this.isLogged() && (this._tokenService.currentUserData as any).agreed;
	}

	getInitialPage() {
		const userData: any = this._tokenService.currentUserData;
		if (userData) {
			if (userData.agreed) {
				return 'ItemExplorePage';
			} else {
				return 'TermsPage';
			}
		} else {
			return 'PublicPage';
		}
	}

	loginWithFacebook() {
		return new Promise((resolve, reject) => {
      return this._tokenService.signInOAuth('facebook', this.inAppBrowser, this.platform)
        .subscribe((response: any) => {
          // console.log('USER LOGGED INTO FACEBOOK - RESPONSE : ', response);
          // throw 'err';
          return resolve(true);
        }, e => {
          console.log('ERROR LOGGING USER INTO FACEBOOK : ', e);
          reject(e);
        });
		});
  }

	login(email, password) {
		return new Promise((resolve, reject) => {
			return this._tokenService.signIn({ login: email, password }).subscribe(res => {
				resolve(res);
			}, reject);
		});
  }

  register(registeringUser: RegisteringUser) {
		return new Promise((resolve, reject) => {
			return this._tokenService.registerAccount(registeringUser).subscribe(res => {
				resolve(res);
			}, reject);
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
