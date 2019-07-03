import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../services/login-service';
import { ToastService } from '../../services/toast-service';

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
	async login() {
    // TODO : IMPLEMENTAR O METODO CORRETAMENTE
    // this.navCtrl.push('PermissionLocationPage', {}, {
		// 	direction: 'forward'
    // });

    try {
      const user = await this.loginProvider.login(this.email, this.password);
      this.navCtrl.push('PermissionLocationPage', {}, {
        direction: 'forward'
      });
    } catch(ex) {
      this.toast.showError(`Email/senha inválidos`);
    }

		// Promise.all([
		// 	this.loginProvider.login(this.email, this.password),
		// 	this.loginProvider.isFirstTime()
		// ])
		// .then((responses) => {
		// 	let logged = responses[0];
		// 	let isFirstTime = responses[1];

		// 	if (logged) {
		// 		if (isFirstTime) {
		// 			this.navCtrl.push('TermsPage', {}, {
    //        direction: 'forward'
    //      });
		// 		} else {
		// 			this.navCtrl.push('ItemExplorePage', {}, {
    //        direction: 'forward'
    //      });
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
