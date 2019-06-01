import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-what-you-look-for',
  templateUrl: 'what-you-look-for.html',
})
export class WhatYouLookForPage {

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatYouLookForPage');
  }

  // CLICK EVENTS
  chooseLookForOption() {
    console.log("WHATYOULOOKFORPAGE - CHOOSELOOKFOROPTION");
  }

  searchApparels() {
    this.navCtrl.setRoot("MainPage");
  }

  skip() {
    this.navCtrl.setRoot("MainPage");
  }

}
