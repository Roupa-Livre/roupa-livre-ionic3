import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';


@IonicPage()
@Component({
	selector: 'page-public',
	templateUrl: 'public.html',
})
export class PublicPage {

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

	manualLogin() {
		this.navCtrl.setRoot('LoginPage', {}, {
			direction: 'forward'
		});
	}

	register() {
		this.navCtrl.setRoot('RegisterPage', {}, {
			direction: 'forward'
		});
	}

	// CLICK EVENTS
	loginWithFacebook() {
		Promise.all([
			this.loginProvider.loginWithFacebook(),
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
