import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../services/login-service';
import { ToastService } from '../../services/toast-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { AnalyticsService } from '../../services/analytics-service';

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
    private navigationService: NavigationServiceProvider,
    private analyticsService: AnalyticsService
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

  ionViewDidEnter() {
    this.analyticsService.trackPage('login');
  }

	// CLICK EVENTS
	async login() {
    const loading = await this.toast.showSimpleLoading();
    try {
      const user = await this.loginProvider.login(this.email, this.password);
      await this.navigationService.checkRoot();
      await loading.dismiss();
    } catch(ex) {
      await loading.dismiss();
      this.toast.showError(`Email/senha inválidos`);
    }
  }

  register() {
    this.navCtrl.setRoot('RegisterPage', {}, {
			direction: 'forward'
		});
  }

  resetPassword() {
    this.navCtrl.push('ResetPasswordPage', {}, {
			direction: 'forward'
		});
  }

}
