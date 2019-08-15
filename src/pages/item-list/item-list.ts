import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ItemServiceProvider } from '../../services/item-service';
import { ChatServiceProvider } from '../../services/chat-service';

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
  private count;
  
	isLoading: boolean = true;


  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
		public viewCtrl: ViewController,
		public statusBar: StatusBar,
    public itemsService: ItemServiceProvider,
    private chatService: ChatServiceProvider,
		public modalCtrl: ModalController,
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

  goToChat() {
    this.navCtrl.push('ChatDetailsPage', {}, {
			direction: 'forward'
		});
  }
  
  async liked(item) {
    await this.doLike(item);
  }

  private async doLike(item) {
    this.isLoading = true;
    try {
      const likeResult = await this.itemsService.rate(item, true);
      const goToCustom = await this.checkMatching(item, likeResult);
      if (goToCustom)
        this.navCtrl.push(goToCustom.page, goToCustom.params);
    } finally {
      this.isLoading = false;
    }
  }

  private async checkMatching(item, likeResult) : Promise<any> {
    if (likeResult.chat) {
      return new Promise<boolean>((resolve, reject) => {
        this.chatService.getChat(likeResult.chat.id).then(chat => {
          let modalMatched = this.modalCtrl.create('ItemMatchedPage', { chat });
          modalMatched.onDidDismiss(resolve);
          modalMatched.present().catch(reject);
        }, reject);
      });
    }
    return false;
	}


}
