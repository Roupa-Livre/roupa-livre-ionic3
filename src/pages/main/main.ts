import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnalyticsService } from '../../services/analytics-service';

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
    public navParams: NavParams,
    private analyticsService: AnalyticsService
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('MAIN-PAGE - IONVIEWDIDLOAD');
  }
  ionViewDidEnter() {
    this.analyticsService.trackPage('main');
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
