import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthPage } from '../auth-page';
import { ChatServiceProvider } from '../../services/chat-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { ItemServiceProvider } from '../../services/item-service';

@IonicPage()
@Component({
	selector: 'page-chat-main',
	templateUrl: 'chat-main.html',
})
export class ChatMainPage extends AuthPage {

  chats;
  matchedApparels;

	// CONSTRUCTOR
	constructor(
    protected navCtrl: NavController,
    protected navigationService: NavigationServiceProvider,
    private chatService: ChatServiceProvider,
    private itemService: ItemServiceProvider) {
    super(navCtrl, navigationService);

  }

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    this.chatService.getChats().then(chats => {
     this.chats = chats;
    });
    this.itemService.getMatched().then(matched => {
      this.matchedApparels = matched;
    });
	}

	// CLICK EVENTS
	goToChatDetails(chat) {
		this.navCtrl.push('ChatDetailsPage', { chat, id: chat.id });
  }

  async goToApparelChat(apparel) {
    const chat = await this.chatService.getChatByUser(apparel.user_id);
		this.goToChatDetails(chat);
	}

	goToExplore() {
		this.navCtrl.popToRoot();
	}

}
