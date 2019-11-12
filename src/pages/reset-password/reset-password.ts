import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnalyticsService } from '../../services/analytics-service';
import { LoginServiceProvider } from '../../services/login-service';
import { ToastService } from '../../services/toast-service';

@IonicPage()
@Component({
	selector: 'page-reset-password',
	templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  // VARS
	public email: string;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loginProvider: LoginServiceProvider,
    private toast: ToastService,
    private analyticsService: AnalyticsService
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

  ionViewDidEnter() {
    this.analyticsService.trackPage('reset-password');
  }

	// CLICK EVENTS
	async reset() {
    try {
      await this.loginProvider.reset(this.email);
      this.toast.showMessage('Uma nova senha foi enviada por e-mail.');
      if (this.navCtrl.canGoBack()) {
        this.navCtrl.pop();
      } else {
        this.navCtrl.popToRoot();
      }
    } catch(ex) {
      this.toast.showError('Erro ao fazer reset.');
    }

  }

}
