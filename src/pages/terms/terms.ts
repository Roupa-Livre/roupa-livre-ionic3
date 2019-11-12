import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../services/login-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { ToastService } from '../../services/toast-service';

@IonicPage()
@Component({
	selector: 'page-terms',
	templateUrl: 'terms.html',
})
export class TermsPage {

	// CONSTRUCTOR
	constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private navigationService: NavigationServiceProvider,
    private loginService: LoginServiceProvider,
    private toastService: ToastService,
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	ionViewCanEnter() {
    return true;
  }

	// CLICK EVENTS
	async agree() {
    const loading = await this.toastService.showSimpleLoading();
    try {
      await this.loginService.agreeToTerms();
      await this.navigationService.checkRoot();
    } finally {
      loading.dismiss();
    }
	}

	async cancel() {
    await this.loginService.logout();
    await this.navigationService.checkRoot('back');
	}

}
