import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { LoginServiceProvider } from '../../services/login-service';

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
    await this.loginService.agreeToTerms();
    await this.navigationService.checkRoot();
	}

	async cancel() {
    await this.loginService.logout();
    await this.navigationService.checkRoot('back');
	}

}
