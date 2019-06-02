import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { ToastService } from '../../providers/utils/toast-service';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

  // VARS
	public email: string;
	public password: string;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loginProvider: LoginServiceProvider,
		private toast: ToastService,
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	login() {
    // TODO : IMPLEMENTAR O METODO CORRETAMENTE
    this.navCtrl.setRoot('PermissionLocationPage', {}, {
			direction: 'forward'
		});

		// Promise.all([
		// 	this.loginProvider.login(this.email, this.password),
		// 	this.loginProvider.isFirstTime()
		// ])
		// .then((responses) => {
		// 	let logged = responses[0];
		// 	let isFirstTime = responses[1];

		// 	if (logged) {
		// 		if (isFirstTime) {
		// 			this.navCtrl.setRoot('TermsPage');
		// 		} else {
		// 			this.navCtrl.setRoot('ItemExplorePage');
		// 		}
		// 	}
		// }, error => {
		// 	if (error && error.status === 401) {
		// 		this.toast.showError(`Email/senha inválidos`);
		// 	} else {
		// 		this.toast.showError(`Erro inesperado ao efetuar login`);
		// 	}
		// });

  }

  register() {
    this.navCtrl.setRoot('RegisterPage', {}, {
			direction: 'forward'
		});
  }

}
