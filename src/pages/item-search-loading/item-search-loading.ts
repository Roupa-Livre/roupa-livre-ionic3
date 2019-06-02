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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemSearchLoadingPage');

    // TODO : IMPLEMENTAR O METODO
    const TIME_IN_MS = 5000;
    setTimeout(() => {
      this.navCtrl.setRoot("ItemExplorePage");
    }, TIME_IN_MS);
  }

}
