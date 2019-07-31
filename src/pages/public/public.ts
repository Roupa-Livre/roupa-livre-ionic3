import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../services/login-service';


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

  // CLICK EVENTS
	manualLogin() {
		this.navCtrl.push('LoginPage', {}, {
			direction: 'forward'
		});
	}

	register() {
		this.navCtrl.push('RegisterPage', {}, {
			direction: 'forward'
		});
	}

	async loginWithFacebook() {
    const response = await this.loginProvider.loginWithFacebook();
	}

}
