import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';


@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loginProvider: LoginServiceProvider,
	) {
		console.log('LOGINPAGE - CONSTRUCTOR');
	}

	ionViewDidLoad() {
		console.log('LOGINPAGE - IONVIEWDIDLOAD');
	}

	login() {
		this.loginProvider.login()
		.then((logged: boolean) => {

			if (logged) {
				console.log('LOGINPAGE - LOGIN - LOGGED : ', logged);
				this.navCtrl.setRoot('ExplorePage');
			}

		})
	}

}
