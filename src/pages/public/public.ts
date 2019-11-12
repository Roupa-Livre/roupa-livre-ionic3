import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginServiceProvider } from '../../services/login-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { AnalyticsService } from '../../services/analytics-service';


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
    private navigationService: NavigationServiceProvider,
    private analyticsService: AnalyticsService
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

  ionViewDidEnter() {
    this.analyticsService.trackPage('public');
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
    await this.navigationService.checkRoot();
	}

}
