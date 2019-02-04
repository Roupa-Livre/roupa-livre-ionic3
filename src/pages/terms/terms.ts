import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@IonicPage()
@Component({
	selector: 'page-terms',
	templateUrl: 'terms.html',
})
export class TermsPage {

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private loginProvider: LoginServiceProvider,
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	ionViewCanEnter() {
    return this.loginProvider.isLogged();
  }

	// CLICK EVENTS
	agree() {
		this.navCtrl.setRoot('ItemExplorePage');
	}

	cancel() {
		this.navCtrl.setRoot("LoginPage");
	}

}
