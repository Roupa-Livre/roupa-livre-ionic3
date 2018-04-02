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
		console.log('LOGINPAGE - CONSTRUCTOR');
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
		console.log('LOGINPAGE - IONVIEWDIDLOAD');
	}

	// CLICK EVENTS
	login() {
		Promise.all([
			this.loginProvider.login(),
			this.loginProvider.isFirstTime()
		]).then((responses) => {
			let logged = responses[0];
			let isFirstTime = responses[1];

			if (logged) {
				console.log('LOGINPAGE - LOGIN - LOGGED : ', logged);

				if (isFirstTime) {
					console.log('LOGINPAGE - LOGIN - ISFIRSTTIME : ', isFirstTime);

					this.navCtrl.setRoot('TermsPage');
				} else {
					this.navCtrl.setRoot('ExplorePage');
				}
			}
		});

	}

}
