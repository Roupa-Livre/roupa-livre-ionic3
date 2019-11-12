import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { AnalyticsService } from '../../services/analytics-service';
import { ChatServiceProvider } from '../../services/chat-service';
import { ItemServiceProvider } from '../../services/item-service';
import { NavigationServiceProvider } from '../../services/navigation-service';

@IonicPage()
@Component({
  selector: 'page-user-item-list',
  templateUrl: 'user-item-list.html',
})
export class UserItemListPage {

  // VARS
  public tempImage: string = "assets/img/dummy/blusa.jpg";
  private item;
  private items;
  private count;

	isLoading: boolean = true;


  // CONSTRUCTOR
  constructor(
    private navigationService: NavigationServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
		public viewCtrl: ViewController,
		public statusBar: StatusBar,
    public itemsService: ItemServiceProvider,
    private chatService: ChatServiceProvider,
		public modalCtrl: ModalController,
    private analyticsService: AnalyticsService
  ) {
    this.item = this.navParams.data.item;
    this.loadApparels();

  }

  async loadApparels() {
    this.items = await this.itemsService.findApparelsByUser(this.item.user_id)
    this.count = this.items.length;
  }

  ionViewDidLoad() {
    console.log('ITEMLISTPAGE - IONVIEWDIDLOAD');
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('user-item-list');
  }

  async open(item) {
    let modal = this.modalCtrl.create('ItemDetailsPage', {
      item,
      disableOwnerPage: true,
      likeCallback: async item => {
        await this.navigationService.like(item, this.navCtrl)
      },
      dislikeCallback: async item => {
        const dislikeResult = await this.navigationService.dislike(item);
      }
    });
		modal.present();
  }
}
