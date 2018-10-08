import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';


@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loginProvider: LoginServiceProvider,
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	login() {
		Promise.all([
			this.loginProvider.login(),
			this.loginProvider.isFirstTime()
		])
		.then((responses) => {
			let logged = responses[0];
			let isFirstTime = responses[1];

			if (logged) {
				if (isFirstTime) {
					this.navCtrl.setRoot('TermsPage');
				} else {
					this.navCtrl.setRoot('ItemExplorePage');
				}
			}
		});

	}

}
