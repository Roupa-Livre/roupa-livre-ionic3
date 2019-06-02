import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-search-loading',
  templateUrl: 'item-search-loading.html',
})
export class ItemSearchLoadingPage {

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemSearchLoadingPage');

    // TODO : IMPLEMENTAR O METODO
    const TIME_IN_MS = 5000;
    setTimeout(() => {
      console.log('ITEMSEARCHLOADINGPAGE - IONVIEWDIDLOAD - GO TO ITEMEXPLOREPAGE');

      this.navCtrl.setRoot("ItemExplorePage", {}, {
        direction: 'forward'
      });
    }, TIME_IN_MS);
  }

}
