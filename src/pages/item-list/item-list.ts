import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemServiceProvider } from '../../services/item-service';

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  // VARS
  public tempImage: string = "assets/img/dummy/blusa.jpg";
  private item;
  private items;


  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemsService: ItemServiceProvider
  ) {
    this.item = this.navParams.data.item;
    this.loadApparels();
    
  }

  async loadApparels() {
     this.items = await this.itemsService.findApparelsByUser(this.item.user_id);
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
