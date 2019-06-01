import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-what-you-release',
  templateUrl: 'what-you-release.html',
})
export class WhatYouReleasePage {

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WhatYouReleasePage');
  }

  // CLICK EVENTS
  chooseReleaseOption() {
    console.log("WHATYOURELEASEPAGE - CHOOSERELEASEOPTION");
  }

  releaseApparel() {
    this.navCtrl.setRoot("WhatYouLookForPage");
  }

  skip() {
    this.navCtrl.setRoot("WhatYouLookForPage");
  }

}
