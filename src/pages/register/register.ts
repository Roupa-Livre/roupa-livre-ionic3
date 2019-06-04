import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // VARS
  public email: string;
	public password: string;
	public repassword: string;

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // CLICK EVENTS
  register() {
    console.log('RegisterPage register');
    // TODO : IMPLEMENTAR O METODO CORRETAMENTE
    this.navCtrl.push('PermissionLocationPage', {}, {
			direction: 'forward'
		});
  }

  login() {
    this.navCtrl.push('LoginPage', {}, {
			direction: 'forward'
		});
  }

}
