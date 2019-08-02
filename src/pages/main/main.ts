import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  // VARS
  public tempImage: string = "assets/img/dummy/blusa.jpg";

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('MAIN-PAGE - IONVIEWDIDLOAD');
  }

  // CLICK EVENTS
  search() {
    console.log('MAIN-PAGE - SEARCH');

    this.navCtrl.setRoot("ItemSearchPage", {}, {
      direction: 'forward'
    });
  }

  goToOfferItem() {
    console.log('MAIN-PAGE - GOTOOFFERITEM');

    this.navCtrl.setRoot("ItemFormPage", {}, {
      direction: 'forward'
    });
  }

}
