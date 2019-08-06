import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { LoginServiceProvider } from '../../services/login-service';
import User from '../../models/user';
import { SettingsServiceProvider } from '../../services/settings-service';

@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

  public user: User;
 
  	// CONSTRUCTOR
	constructor(
    navCtrl: NavController,
    navigationService: NavigationServiceProvider,    
		public viewCtrl: ViewController,
    private settingsService: SettingsServiceProvider,
    public navParams: NavParams,
    private loginService: LoginServiceProvider) {
      this.init()
  }
  
  init() {
    this.user = this.loginService.user();
  }

  // LIFECYCLE EVENTS
	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
  }

  // CLICK EVENTS
  changeProfilePhoto() {
    console.log('SETTINGSPAGE - CHANGEPROFILEPHOTO');
  }

  async changeUser() {
    await this.settingsService.updateUser(this.user);
  }

}
