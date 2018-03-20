import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {
		console.log('LOGINPAGE - CONSTRUCTOR');
	}

	ionViewDidLoad() {
		console.log('LOGINPAGE - IONVIEWDIDLOAD');
	}

	login() {
		// TODO : IMPLEMENTS FACEBOOK LOGIN
		
		console.log('LOGINPAGE - LOGIN - GO EXPLOREPAGE');
		this.navCtrl.setRoot('ExplorePage');
	}

}
