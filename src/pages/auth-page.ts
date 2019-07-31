import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NavigationServiceProvider } from '../services/navigation-service';


export abstract class AuthPage {

	// CONSTRUCTOR
  constructor(protected navCtrl: NavController,
    protected navigationService: NavigationServiceProvider) {}

  ionViewCanEnter() {
    return this.navigationService.canEnterPage(this.navCtrl, 'ItemExplorePage');
  }

}
