import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  // VARS
  public tempImage: string = "assets/img/dummy/blusa.jpg";

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ITEMLISTPAGE - IONVIEWDIDLOAD');
  }

  goToChat() {
    this.navCtrl.push('ChatDetailsPage', {}, {
			direction: 'forward'
		});
  }

}